import { HistoryItem } from "../types";
import { generateId } from "../utils";
import { getMockResponse } from "./mock-responses";

function buildHistoryItem(title: string, question: string): HistoryItem {
  const answer = getMockResponse(question);
  return {
    id: generateId(),
    title,
    preview: question,
    messages: [
      {
        id: generateId(),
        role: "assistant",
        text: "Hi! I'm the CTU Campus Assistant. Ask me anything about admissions, courses, timetables or student services.",
      },
      { id: generateId(), role: "user", text: question },
      { id: generateId(), ...answer },
    ],
  };
}

// Seed history shown for any signed-in user so the sidebar isn't empty on first login.
// Cleared/replaced as the user starts real conversations.
export function getSeedHistory(): HistoryItem[] {
  return [
    buildHistoryItem("Application requirements", "What documents do I need to apply?"),
    buildHistoryItem("Timetable & classes", "When is my next Web Dev class?"),
    buildHistoryItem("Guardrail example", "Can you write my assignment for me?"),
  ];
}
