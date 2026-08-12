import os

from dotenv import load_dotenv

# Loaded as soon as this module is imported, so every other module can rely on
# os.environ already being populated regardless of import order.
load_dotenv()


class Config:
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
    PINECONE_INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME", "college-rag-chatbot")

    EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "text-embedding-3-small")
    CHAT_MODEL = os.environ.get("CHAT_MODEL", "gpt-4o-mini")
    RETRIEVER_TOP_K = int(os.environ.get("RETRIEVER_TOP_K", "3"))

    PORT = int(os.environ.get("PORT", "5000"))
    CORS_ORIGINS = [origin.strip() for origin in os.environ.get(
        "CORS_ORIGINS", "http://localhost:3000"
    ).split(",")]
