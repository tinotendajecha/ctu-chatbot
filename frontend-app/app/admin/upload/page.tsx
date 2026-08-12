"use client";

import { useState } from "react";
import { getMockFiles } from "../../lib/admin/mock-files";
import { FileType, UploadedFile } from "../../lib/types";
import { generateId } from "../../lib/utils";
import Dropzone from "../../components/admin/Dropzone";
import FileStatusTable from "../../components/admin/FileStatusTable";

function guessFileType(filename: string): FileType {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf" || ext === "docx" || ext === "xlsx" || ext === "csv" || ext === "txt") {
    return ext;
  }
  return "txt";
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>(getMockFiles());

  function handleFilesSelected(newFiles: File[]) {
    const uploaded: UploadedFile[] = newFiles.map((file) => ({
      id: generateId(),
      filename: file.name,
      fileType: guessFileType(file.name),
      sizeLabel: formatSize(file.size),
      uploadedAt: new Date().toISOString().slice(0, 10),
      status: "processing",
    }));
    setFiles((prev) => [...uploaded, ...prev]);

    // Simulate indexing finishing after a moment, mirroring what a real backend would report.
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (uploaded.some((u) => u.id === f.id) ? { ...f, status: "ready" } : f))
      );
    }, 2000);
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <h1 className="mb-6 font-heading text-2xl font-bold text-text">Data Upload</h1>
      <Dropzone onFilesSelected={handleFilesSelected} />
      <div className="mt-6">
        <FileStatusTable files={files} />
      </div>
    </div>
  );
}
