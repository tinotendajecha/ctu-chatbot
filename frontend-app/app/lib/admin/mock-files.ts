import { UploadedFile } from "../types";

export function getMockFiles(): UploadedFile[] {
  return [
    {
      id: "1",
      filename: "Admissions_Requirements_2026.pdf",
      fileType: "pdf",
      sizeLabel: "1.2 MB",
      uploadedAt: "2026-08-01",
      status: "ready",
    },
    {
      id: "2",
      filename: "2026_Term1_Timetable.xlsx",
      fileType: "xlsx",
      sizeLabel: "340 KB",
      uploadedAt: "2026-08-04",
      status: "ready",
    },
    {
      id: "3",
      filename: "Fees_And_Payment_Policy_2026.pdf",
      fileType: "pdf",
      sizeLabel: "890 KB",
      uploadedAt: "2026-08-06",
      status: "processing",
    },
    {
      id: "4",
      filename: "Student_Services_Guide.pdf",
      fileType: "pdf",
      sizeLabel: "2.1 MB",
      uploadedAt: "2026-08-09",
      status: "ready",
    },
    {
      id: "5",
      filename: "Graduation_Ceremony_Notes.docx",
      fileType: "docx",
      sizeLabel: "58 KB",
      uploadedAt: "2026-08-10",
      status: "failed",
    },
  ];
}
