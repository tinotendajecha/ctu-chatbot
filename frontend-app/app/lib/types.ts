export type Role = "student" | "prospective" | "lecturer" | "admin";

export interface User {
  name: string;
  email: string;
  role: Role;
}

export type FileType = "pdf" | "docx" | "xlsx" | "csv" | "txt";

export interface Source {
  id: string;
  filename: string;
  fileType: FileType;
  location: string;
  excerpt: string;
}

export type MessageRole = "user" | "assistant" | "guardrail";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  sources?: Source[];
}

export interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  messages: Message[];
}

export type UploadStatus = "processing" | "ready" | "failed";

export interface UploadedFile {
  id: string;
  filename: string;
  fileType: FileType;
  sizeLabel: string;
  uploadedAt: string;
  status: UploadStatus;
}

export interface DashboardStats {
  totalConversations: number;
  totalUsers: number;
  documentsIndexed: number;
  avgResponseTimeSec: number;
  activeUsersOverTime: { date: string; users: number }[];
  usersByRole: { role: Role; count: number }[];
  mostAskedTopics: { topic: string; count: number }[];
}
