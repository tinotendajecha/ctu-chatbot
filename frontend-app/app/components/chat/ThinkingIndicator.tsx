"use client";

import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

const STATUS_PHRASES = [
  "Searching the CTU knowledge base",
  "Reading relevant documents",
  "Checking the latest policies",
  "Putting together an answer",
];

const TIPS = [
  "Tip: Start a temporary chat if you don't want this conversation saved to history.",
  "Tip: Click a source chip to see exactly where an answer came from.",
  "Tip: You can ask about admissions, timetables, fees, or student services.",
];

// Independent intervals so the status and tip lines don't rotate in lockstep,
// which would read as too mechanical for what's meant to feel like live progress.
export default function ThinkingIndicator() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const statusTimer = setInterval(
      () => setStatusIndex((i) => (i + 1) % STATUS_PHRASES.length),
      1600
    );
    const tipTimer = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 3200);
    return () => {
      clearInterval(statusTimer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <div className="flex items-start gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary font-heading text-xs font-extrabold text-white">
        CTU
      </span>
      <div className="max-w-[85%] rounded-r-2xl rounded-bl-2xl rounded-tl-sm border border-border bg-surface p-3 md:max-w-[70%]">
        <div className="flex items-center gap-2 text-[15px] text-text">
          <Spinner />
          <span>{STATUS_PHRASES[statusIndex]}</span>
        </div>
        <p className="mt-1 text-xs text-text-muted">{TIPS[tipIndex]}</p>
      </div>
    </div>
  );
}
