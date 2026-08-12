# CTU Chatbot — Python backend

Flask API for the CTU Campus Assistant chat, built as an MVC-ish layout on top of the
RAG pipeline prototyped in [`prototype_colab.ipynb`](prototype_colab.ipynb) (LangChain +
OpenAI + Pinecone).

## Layout

```
app/
  controllers/   # request handling — parse input, call a service, shape the response
  routes/        # Flask blueprints — map URLs to controller functions
  services/      # business logic — the RAG chain (retrieval + generation)
  models/        # data shapes returned to the client (Source, ChatReply)
  utils/         # cross-cutting helpers (error handling)
  config.py      # env-driven settings
  __init__.py    # app factory (create_app)
scripts/
  ingest.py      # one-off: load docs from data/, chunk, embed, upsert into Pinecone
data/            # drop source PDFs/Markdown here before running ingest.py
run.py           # dev entrypoint
```

The frontend (`frontend-app/`) is the "view" layer — this API has no server-rendered
templates, it only returns JSON shaped to match `frontend-app/app/lib/types.ts`.

## Setup

```bash
cd python-backend
python -m venv venv
venv\Scripts\activate          # (or `source venv/bin/activate` on macOS/Linux)
pip install -r requirements.txt
copy .env.example .env         # (or `cp .env.example .env`)
```

Fill in `.env` with your own keys:
- `OPENAI_API_KEY` — used for embeddings (`text-embedding-3-small`) and chat (`gpt-4o-mini`)
- `PINECONE_API_KEY` — used to store/retrieve document chunks

## Index your documents

Drop PDF/Markdown source files into `data/`, then run:

```bash
python scripts/ingest.py
```

This creates the Pinecone index (if it doesn't exist) and upserts chunked, embedded
documents into it — same steps as sections 2-5 of the notebook.

## Run the API

```bash
python run.py
```

Starts on `http://localhost:5000` by default (see `PORT` in `.env`).

## Endpoints

### `GET /api/health`
Liveness check. Returns `{"status": "ok"}`.

### `POST /api/chat`
Request:
```json
{ "message": "What documents do I need to apply?" }
```

Response:
```json
{
  "role": "assistant",
  "text": "...",
  "sources": [
    { "id": "...", "filename": "ctu_training_solutions_overview.pdf", "fileType": "pdf", "location": "Page 3", "excerpt": "..." }
  ]
}
```

`role` is `"assistant"` for normal answers or `"guardrail"` when the question matches an
off-topic/academic-integrity keyword (mirrors the frontend's mock guardrail list) — in
that case `sources` is omitted. On failure the response is `{"error": "..."}` with a
4xx/5xx status (400 for a missing message, 503 if API keys / the index aren't configured
yet, 500 for anything unexpected).

## Notes

- Only the chat endpoint is wired up so far. The admin upload UI in the frontend is still
  backed by mock data — indexing new documents from that screen (rather than
  `scripts/ingest.py`) is a follow-up.
- Auth is also still mock/local-storage only on the frontend; this API doesn't check for a
  logged-in user yet.
