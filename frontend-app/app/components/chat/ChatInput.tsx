"use client";

import { KeyboardEvent } from "react";
import Button from "../ui/Button";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  }

  return (
    <div className="border-t border-border bg-surface p-4">
      <div className="mx-auto flex max-w-3xl gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about admissions, courses, timetables, fees..."
          className="min-h-[44px] flex-1 min-w-0 rounded-lg border border-primary px-4 outline-none"
        />
        <Button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="shrink-0"
        >
          Send
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-text-faint">
        CTU Campus Assistant can make mistakes. It only answers questions related to CTU campus services.
      </p>
    </div>
  );
}
