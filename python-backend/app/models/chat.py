"""Data shapes for the chat API.

These mirror the frontend's `Message` / `Source` types in
frontend-app/app/lib/types.ts, so `ChatReply.to_dict()` can be returned to the
client as-is.
"""

import uuid
from dataclasses import dataclass, field

ROLE_ASSISTANT = "assistant"
ROLE_GUARDRAIL = "guardrail"


@dataclass
class Source:
    filename: str
    file_type: str
    location: str
    excerpt: str
    id: str = field(default_factory=lambda: str(uuid.uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "filename": self.filename,
            "fileType": self.file_type,
            "location": self.location,
            "excerpt": self.excerpt,
        }


@dataclass
class ChatReply:
    role: str
    text: str
    sources: list[Source] = field(default_factory=list)

    def to_dict(self) -> dict:
        payload = {"role": self.role, "text": self.text}
        if self.sources:
            payload["sources"] = [source.to_dict() for source in self.sources]
        return payload
