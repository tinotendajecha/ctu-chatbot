import { Role, User } from "../types";

export const MOCK_PASSWORD = "password123";

interface MockAccount extends User {
  password: string;
}

// Fixed demo accounts, one per role, so every role can be exercised without
// a real backend. Password is shared and shown on the login screen as a hint.
export const MOCK_ACCOUNTS: MockAccount[] = [
  { name: "Sam Student", email: "student@ctu.ac.za", role: "student", password: MOCK_PASSWORD },
  { name: "Priya Prospective", email: "applicant@ctu.ac.za", role: "prospective", password: MOCK_PASSWORD },
  { name: "Lindiwe Lecturer", email: "lecturer@ctu.ac.za", role: "lecturer", password: MOCK_PASSWORD },
  { name: "Alex Admin", email: "admin@ctu.ac.za", role: "admin", password: MOCK_PASSWORD },
];

export function findAccount(email: string, password: string): User | null {
  const match = MOCK_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
  );
  if (!match) return null;
  return { name: match.name, email: match.email, role: match.role };
}

// Mock signup: any new email is accepted and simply assigned the chosen role.
export function createAccount(name: string, email: string, role: Role): User {
  return { name, email: email.trim().toLowerCase(), role };
}
