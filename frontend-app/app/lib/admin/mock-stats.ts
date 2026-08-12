import { DashboardStats } from "../types";

export function getDashboardStats(): DashboardStats {
  return {
    totalConversations: 1284,
    totalUsers: 512,
    documentsIndexed: 87,
    avgResponseTimeSec: 2.4,
    activeUsersOverTime: [
      { date: "Mon", users: 120 },
      { date: "Tue", users: 145 },
      { date: "Wed", users: 132 },
      { date: "Thu", users: 168 },
      { date: "Fri", users: 190 },
      { date: "Sat", users: 84 },
      { date: "Sun", users: 61 },
    ],
    usersByRole: [
      { role: "student", count: 312 },
      { role: "prospective", count: 128 },
      { role: "lecturer", count: 54 },
      { role: "admin", count: 18 },
    ],
    mostAskedTopics: [
      { topic: "Admissions", count: 342 },
      { topic: "Timetables", count: 268 },
      { topic: "Fees", count: 214 },
      { topic: "Library", count: 156 },
      { topic: "Portal access", count: 98 },
    ],
  };
}
