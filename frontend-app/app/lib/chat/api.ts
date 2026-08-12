import { Message } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const UNREACHABLE_TEXT =
  "Sorry, I couldn't reach the assistant service. Please try again in a moment.";

// Calls the Flask backend's POST /api/chat (see python-backend/app/controllers/chat_controller.py).
// Falls back to a friendly assistant message instead of throwing, since a network/API
// failure here is a normal, expected case in the chat UI rather than a bug.
export async function sendChatMessage(question: string): Promise<Omit<Message, "id">> {
  try {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });

    if (!res.ok) {
      throw new Error(`Chat request failed with status ${res.status}`);
    }

    return (await res.json()) as Omit<Message, "id">;
  } catch (error) {
    console.error("Chat request failed", error);
    return { role: "assistant", text: UNREACHABLE_TEXT };
  }
}
