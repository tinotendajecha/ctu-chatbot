import { Role } from "../types";

const CHIPS_BY_ROLE: Record<Role, string[]> = {
  prospective: [
    "What documents do I need to apply?",
    "What programmes does CTU offer?",
    "How much are tuition fees?",
    "When does the next intake start?",
  ],
  student: [
    "When is my next Web Dev class?",
    "What are the library hours?",
    "How do I pay my fees?",
    "How do I reset my portal password?",
  ],
  lecturer: [
    "How do I upload a class timetable?",
    "Where can I find student attendance records?",
    "What are the exam board submission dates?",
    "How do I request a room booking?",
  ],
  admin: [
    "How many conversations happened this week?",
    "What are the most-asked student questions?",
    "How do I upload a new policy document?",
    "How many documents are indexed right now?",
  ],
};

// Logged-out visitors are treated as prospective students by default.
export function getSuggestedChips(role: Role | null): string[] {
  return CHIPS_BY_ROLE[role ?? "prospective"];
}
