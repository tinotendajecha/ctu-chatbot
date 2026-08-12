"""Retrieval-augmented generation pipeline: Pinecone + OpenAI via LangChain.

This is the Flask port of the pipeline built in python-backend/prototype_colab.ipynb
(sections 4-7): embed the question, retrieve top-k chunks from Pinecone, and generate
a grounded answer. The ingestion half of that notebook (sections 2-5: load, chunk,
embed, upsert) lives in scripts/ingest.py, run separately to populate the index.
"""

from pathlib import Path

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

from ..config import Config
from ..models.chat import ChatReply, ROLE_ASSISTANT, ROLE_GUARDRAIL, Source

# Kept in sync with the frontend's mock guardrail list in
# frontend-app/app/lib/chat/mock-responses.ts, so behavior doesn't change once the
# frontend switches from mock data to this API.
GUARDRAIL_KEYWORDS = [
    "write my assignment",
    "write my essay",
    "do my homework",
    "write my paper",
    "exam answers",
    "cheat",
    "complete my coursework",
    "do my test",
]

GUARDRAIL_TEXT = (
    "I'm the CTU Campus Assistant, built to help with admissions, courses, timetables, "
    "fees and student services — I can't help with that. I can point you to the right "
    "resource or explain a brief if you'd like."
)

# Phrases the model uses (per the "say so explicitly" instruction in PROMPT below) when the
# retrieved chunks don't actually answer the question. When it declines like this, the
# retrieved chunks weren't really "sources" for the answer -- just the closest vector matches
# -- so we don't attach them, rather than showing e.g. 5 unrelated PDF chips next to "I don't
# have that information."
NO_ANSWER_MARKERS = (
    "does not contain",
    "doesn't contain",
    "cannot answer",
    "can't answer",
    "no information about",
    "not enough information",
)

PROMPT = ChatPromptTemplate.from_template(
    """You are the CTU Campus Assistant, answering questions about CTU Training Solutions
using ONLY the context below. Every claim in your answer must be traceable to the context.

- If the context does not contain enough information to answer, say so explicitly instead
  of guessing.
- Answer in plain prose only. Do not list your sources — they are shown to the user
  separately by the application.

Context:
{context}

Question: {question}

Answer:"""
)


class RagService:
    """Wraps the RAG chain. Initialized lazily so the app can boot without API keys
    (e.g. in local dev before .env is filled in) and only fail on first real request."""

    def __init__(self, config=Config):
        self._config = config
        self._chain = None
        self._retriever = None

    def _ensure_initialized(self) -> None:
        if self._chain is not None:
            return

        if not self._config.OPENAI_API_KEY:
            raise RuntimeError("OPENAI_API_KEY is not set. Add it to python-backend/.env")
        if not self._config.PINECONE_API_KEY:
            raise RuntimeError("PINECONE_API_KEY is not set. Add it to python-backend/.env")

        pc = Pinecone(api_key=self._config.PINECONE_API_KEY)
        index = pc.Index(self._config.PINECONE_INDEX_NAME)
        embeddings = OpenAIEmbeddings(model=self._config.EMBEDDING_MODEL)
        vector_store = PineconeVectorStore(index=index, embedding=embeddings)

        self._retriever = vector_store.as_retriever(
            search_kwargs={"k": self._config.RETRIEVER_TOP_K}
        )
        llm = ChatOpenAI(model=self._config.CHAT_MODEL, temperature=0)
        self._chain = PROMPT | llm | StrOutputParser()

    @staticmethod
    def _is_guardrail(question: str) -> bool:
        lower = question.lower()
        return any(keyword in lower for keyword in GUARDRAIL_KEYWORDS)

    @staticmethod
    def _has_no_answer(text: str) -> bool:
        lower = text.lower()
        return any(marker in lower for marker in NO_ANSWER_MARKERS)

    @staticmethod
    def _format_context(docs) -> str:
        return "\n\n".join(
            f"[Source: {doc.metadata.get('source', 'unknown')} | "
            f"page {doc.metadata.get('page', 'n/a')}]\n{doc.page_content}"
            for doc in docs
        )

    @staticmethod
    def _to_source(doc) -> Source:
        source_path = doc.metadata.get("source", "unknown")
        filename = Path(source_path).name
        file_type = filename.rsplit(".", 1)[-1].lower() if "." in filename else "txt"
        page = doc.metadata.get("page")
        location = f"Page {page + 1}" if isinstance(page, (int, float)) else "N/A"

        excerpt = doc.page_content.strip()
        if len(excerpt) > 400:
            excerpt = excerpt[:400].rstrip() + "…"

        return Source(filename=filename, file_type=file_type, location=location, excerpt=excerpt)

    def answer(self, question: str) -> ChatReply:
        question = question.strip()

        if self._is_guardrail(question):
            return ChatReply(role=ROLE_GUARDRAIL, text=GUARDRAIL_TEXT)

        self._ensure_initialized()

        docs = self._retriever.invoke(question)
        context = self._format_context(docs)
        text = self._chain.invoke({"context": context, "question": question})

        sources = [] if self._has_no_answer(text) else [self._to_source(doc) for doc in docs]

        return ChatReply(role=ROLE_ASSISTANT, text=text, sources=sources)


rag_service = RagService()
