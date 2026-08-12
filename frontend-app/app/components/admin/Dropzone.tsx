"use client";

import { DragEvent, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { cn } from "../../lib/utils";

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export default function Dropzone({ onFilesSelected }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) onFilesSelected(Array.from(e.dataTransfer.files));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      className={cn(
        "flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
        isDragging ? "border-primary bg-primary-tint" : "border-border-strong bg-surface-alt"
      )}
    >
      <CloudUploadOutlinedIcon className="text-primary" fontSize="large" />
      <p className="font-semibold text-text">Drag and drop files here</p>
      <p className="text-sm text-text-muted">or click to browse (PDF, DOCX, XLSX, CSV, TXT)</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFilesSelected(Array.from(e.target.files));
          e.target.value = "";
        }}
      />
    </div>
  );
}
