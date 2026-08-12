"""Populate the Pinecone index from local files in python-backend/data/.

Mirrors the ingestion steps from prototype_colab.ipynb (load -> chunk -> embed -> upsert),
adapted to read from a local folder instead of a Colab upload widget/Drive mount.

Usage (from python-backend/, with .env filled in and the venv active):
    python scripts/ingest.py
"""

import sys
from pathlib import Path
from uuid import uuid4

sys.path.append(str(Path(__file__).resolve().parent.parent))

from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone, ServerlessSpec

from app.config import Config

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def load_documents():
    pdf_docs = DirectoryLoader(str(DATA_DIR), glob="**/*.pdf", loader_cls=PyPDFLoader).load()
    md_docs = DirectoryLoader(str(DATA_DIR), glob="**/*.md", loader_cls=TextLoader).load()
    return pdf_docs + md_docs


def main() -> None:
    if not Config.OPENAI_API_KEY or not Config.PINECONE_API_KEY:
        raise SystemExit("Set OPENAI_API_KEY and PINECONE_API_KEY in python-backend/.env first.")

    raw_docs = load_documents()
    if not raw_docs:
        raise SystemExit(f"No .pdf or .md files found in {DATA_DIR}")
    print(f"Loaded {len(raw_docs)} raw documents")

    splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=700, chunk_overlap=100
    )
    chunks = splitter.split_documents(raw_docs)
    print(f"Split into {len(chunks)} chunks")

    pc = Pinecone(api_key=Config.PINECONE_API_KEY)
    if not pc.has_index(Config.PINECONE_INDEX_NAME):
        pc.create_index(
            name=Config.PINECONE_INDEX_NAME,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
    index = pc.Index(Config.PINECONE_INDEX_NAME)

    embeddings = OpenAIEmbeddings(model=Config.EMBEDDING_MODEL)
    vector_store = PineconeVectorStore(index=index, embedding=embeddings)

    ids = [str(uuid4()) for _ in chunks]
    vector_store.add_documents(documents=chunks, ids=ids)
    print(f"Upserted {len(chunks)} chunks into '{Config.PINECONE_INDEX_NAME}'")


if __name__ == "__main__":
    main()
