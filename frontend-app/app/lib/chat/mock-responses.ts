import { Message, Source } from "../types";
import { generateId } from "../utils";

// Keywords that should trigger a guardrail (off-topic / academic-integrity) refusal
// instead of a normal answer. Kept as a flat list so it's easy for students to extend.
const GUARDRAIL_KEYWORDS = [
  "write my assignment",
  "write my essay",
  "do my homework",
  "write my paper",
  "exam answers",
  "cheat",
  "complete my coursework",
  "do my test",
];

const GUARDRAIL_TEXT =
  "I'm the CTU Campus Assistant, built to help with admissions, courses, timetables, fees and student services — I can't help with that. I can point you to the right resource or explain a brief if you'd like.";

const FALLBACK_TEXT =
  "I can help with CTU admissions, courses, timetables, results, fees and campus services. Could you rephrase your question?";

interface CannedResponse {
  keywords: string[];
  text: string;
  sources?: Source[];
}

// Order matters: getMockResponse uses the first keyword match, so more specific
// phrases (matching a single suggested chip) are listed before the generic
// keywords they'd otherwise collide with (e.g. "upload a class timetable" before
// the generic "timetable" entry, "documents are indexed" before generic "document").
const CANNED_RESPONSES: CannedResponse[] = [
  // --- Lecturer suggested chips ---
  {
    keywords: ["upload a class timetable"],
    text: "Go to the Lecturer Portal → My Modules → Timetable, then use 'Upload timetable' to submit a CSV or XLSX for the term. Changes are reflected for students within 24 hours.",
    sources: [
      {
        id: generateId(),
        filename: "Lecturer_Portal_Guide.pdf",
        fileType: "pdf",
        location: "Page 5",
        excerpt:
          "Lecturers upload term timetables via My Modules > Timetable > Upload timetable. Accepted formats are CSV and XLSX; changes propagate to student views within 24 hours.",
      },
    ],
  },
  {
    keywords: ["attendance"],
    text: "Attendance records are available under the Lecturer Portal's 'Class Registers' tab, filterable by module and week. Registers must be finalized within 48 hours of each class.",
    sources: [
      {
        id: generateId(),
        filename: "Attendance_Policy_2026.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "Class attendance registers are recorded per session and must be finalized by the lecturer within 48 hours. Records are viewable under Class Registers in the Lecturer Portal.",
      },
    ],
  },
  {
    keywords: ["exam board"],
    text: "Exam board mark submissions are due two weeks before each board meeting. Dates for this term are published on the Lecturer Portal under 'Assessment Calendar'.",
    sources: [
      {
        id: generateId(),
        filename: "Assessment_Calendar_2026.pdf",
        fileType: "pdf",
        location: "Page 2",
        excerpt:
          "Final marks must be submitted to the exam board no later than two weeks before the scheduled board meeting. See the Assessment Calendar for this term's dates.",
      },
    ],
  },
  {
    keywords: ["room booking", "book a room"],
    text: "You can request a room booking through the Lecturer Portal's 'Facilities' tab, or by emailing facilities@ctu.ac.za for same-week requests.",
    sources: [
      {
        id: generateId(),
        filename: "Facilities_Booking_Guide.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "Room bookings are made via the Facilities tab in the Lecturer Portal. For requests within the same week, contact facilities@ctu.ac.za directly.",
      },
    ],
  },

  // --- Admin suggested chips ---
  {
    keywords: ["how many conversations", "conversations happened"],
    text: "There were 1,284 conversations logged this week. You can see the full breakdown, including trends over time, on the Dashboard tab.",
    sources: [
      {
        id: generateId(),
        filename: "Weekly_Usage_Report.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt: "Total conversations this reporting period: 1,284, up from 1,190 the prior week.",
      },
    ],
  },
  {
    keywords: ["most-asked", "most asked"],
    text: "The most-asked topics this month are Admissions, Timetables, Fees, Library and Portal access — see the 'Most-asked topics' chart on the Dashboard for the full breakdown.",
    sources: [
      {
        id: generateId(),
        filename: "Weekly_Usage_Report.pdf",
        fileType: "pdf",
        location: "Page 3",
        excerpt:
          "Top student query topics this period, by volume: Admissions (342), Timetables (268), Fees (214), Library (156), Portal access (98).",
      },
    ],
  },
  {
    keywords: ["upload a new policy", "policy document"],
    text: "Go to the Data Upload tab and drag your document into the upload zone (PDF, DOCX, XLSX, CSV or TXT). It'll show as 'Processing' while it's indexed, then flip to 'Ready' once it's searchable.",
    sources: [
      {
        id: generateId(),
        filename: "Admin_Data_Upload_Guide.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "New documents are added via Data Upload > drag and drop (or click to browse). Documents are indexed automatically; status updates from Processing to Ready once complete.",
      },
    ],
  },
  {
    keywords: ["indexed"],
    text: "There are currently 87 documents indexed in the CTU knowledge base. You can see the exact count, plus recent uploads, on the Dashboard and Data Upload tabs.",
    sources: [
      {
        id: generateId(),
        filename: "Weekly_Usage_Report.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt: "Documents currently indexed in the knowledge base: 87.",
      },
    ],
  },

  // --- Prospective-student suggested chips ---
  {
    keywords: ["programme", "program"],
    text: "CTU offers programmes across Information Technology, Business, Graphic Design, Visual Communication and Engineering, at certificate, diploma and degree level.",
    sources: [
      {
        id: generateId(),
        filename: "Programmes_Guide_2026.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "CTU's programme offering spans Information Technology, Business, Graphic Design, Visual Communication and Engineering, from certificate through to degree level.",
      },
    ],
  },
  {
    keywords: ["intake"],
    text: "The next intake starts in February, with a mid-year intake in July for select programmes. Applications typically close four weeks before each intake.",
    sources: [
      {
        id: generateId(),
        filename: "Academic_Calendar_2026.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "Main intake: February. Mid-year intake (select programmes): July. Applications close four weeks prior to each intake date.",
      },
    ],
  },

  // --- General / freeform coverage ---
  {
    keywords: ["document", "apply", "application", "admission", "portfolio"],
    text: "You'll need your ID or passport, your latest results, and — if you're applying for Graphic Design or Visual Communication — a portfolio of your work. A parent/guardian ID is also needed if you're under 18 or sponsored.",
    sources: [
      {
        id: generateId(),
        filename: "Admissions_Requirements_2026.pdf",
        fileType: "pdf",
        location: "Page 3",
        excerpt:
          "Applicants must submit a certified ID/passport copy and latest academic results. Graphic Design and Visual Communication applicants must also submit a portfolio of at least 6 pieces of work.",
      },
    ],
  },
  {
    keywords: ["timetable", "schedule", "class", "when is my"],
    text: "Your Web Development class runs Tuesdays and Thursdays from 09:00–11:00 in Lab 4. Full timetables are published on the student portal at the start of each term.",
    sources: [
      {
        id: generateId(),
        filename: "2026_Term1_Timetable.xlsx",
        fileType: "xlsx",
        location: "Web Development, Group B",
        excerpt: "Web Development (Group B): Tue & Thu 09:00–11:00, Lab 4, Lecturer: L. Ncube.",
      },
    ],
  },
  {
    keywords: ["library", "hours", "open"],
    text: "The main library is open Monday–Friday 08:00–20:00 and Saturdays 09:00–13:00. It's closed on Sundays and public holidays.",
    sources: [
      {
        id: generateId(),
        filename: "Student_Services_Guide.pdf",
        fileType: "pdf",
        location: "Page 12",
        excerpt: "Library opening hours: Mon–Fri 08:00–20:00, Sat 09:00–13:00. Closed Sundays and public holidays.",
      },
    ],
  },
  {
    keywords: ["fee", "tuition", "cost", "pay"],
    text: "Tuition fees vary by programme and are billed per semester. You can view your personalised fee statement and payment options on the student portal under Finance.",
    sources: [
      {
        id: generateId(),
        filename: "Fees_And_Payment_Policy_2026.pdf",
        fileType: "pdf",
        location: "Page 2",
        excerpt: "Fees are billed per semester and payable in full or via an approved instalment plan before the census date.",
      },
    ],
  },
  {
    keywords: ["password", "portal", "wifi", "login", "reset"],
    text: "You can reset your student portal password from the login page using 'Forgot password'. For campus Wi‑Fi, use the same portal credentials on the 'CTU-Student' network.",
    sources: [
      {
        id: generateId(),
        filename: "IT_Helpdesk_Guide.pdf",
        fileType: "pdf",
        location: "Page 1",
        excerpt:
          "Students can reset their portal password via 'Forgot password' on the login screen. Campus Wi-Fi ('CTU-Student') uses the same portal credentials.",
      },
    ],
  },
  {
    keywords: ["graduat", "results", "certificate"],
    text: "Final results are released on the student portal within four weeks of your last exam. Graduation ceremonies are held twice a year, in April and October.",
    sources: [
      {
        id: generateId(),
        filename: "Student_Services_Guide.pdf",
        fileType: "pdf",
        location: "Page 18",
        excerpt:
          "Results are published on the student portal within four weeks of the final exam. Graduation ceremonies are held in April and October each year.",
      },
    ],
  },
];

export function getMockResponse(question: string): Omit<Message, "id"> {
  const lower = question.toLowerCase();

  if (GUARDRAIL_KEYWORDS.some((kw) => lower.includes(kw))) {
    return { role: "guardrail", text: GUARDRAIL_TEXT };
  }

  const match = CANNED_RESPONSES.find((r) => r.keywords.some((kw) => lower.includes(kw)));
  if (match) {
    return { role: "assistant", text: match.text, sources: match.sources };
  }

  return { role: "assistant", text: FALLBACK_TEXT };
}
