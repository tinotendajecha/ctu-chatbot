"use client";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Source } from "../../lib/types";
import { cn } from "../../lib/utils";
import IconButton from "../ui/IconButton";
import Badge from "../ui/Badge";
import MobileDrawer from "../layout/MobileDrawer";

interface SourcesPanelProps {
  sources: Source[] | null;
  onClose: () => void;
}

function SourcesPanelContent({ sources, onClose }: { sources: Source[]; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Sources can change (a different message's chips clicked) while the panel stays open,
  // so clamp instead of trusting stale state from a previous message with more tabs.
  const active = sources[Math.min(activeIndex, sources.length - 1)];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-heading text-lg font-bold text-text">Sources</h2>
        <IconButton aria-label="Close sources panel" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      {sources.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2">
          {sources.map((source, index) => (
            <button
              key={source.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "min-h-[44px] shrink-0 rounded-lg px-3 text-sm font-medium",
                index === activeIndex ? "bg-primary-tint text-primary" : "text-text-muted"
              )}
            >
              {source.filename}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center gap-2">
          <Badge tone="primary">{active.fileType}</Badge>
          <p className="truncate font-semibold text-text">{active.filename}</p>
        </div>
        <p className="mt-1 text-sm text-text-muted">{active.location}</p>

        <p className="mt-4 rounded-lg border-l-4 border-primary bg-surface-alt p-3 text-sm text-text">
          {active.excerpt}
        </p>

        <p className="mt-4 text-xs text-text-faint">
          This is the excerpt the assistant used to answer. The full document is available in the
          CTU knowledge base.
        </p>
      </div>
    </div>
  );
}

export default function SourcesPanel({ sources, onClose }: SourcesPanelProps) {
  return (
    <>
      {sources && sources.length > 0 && (
        <aside className="hidden w-80 shrink-0 border-l border-border bg-surface md:block">
          <SourcesPanelContent sources={sources} onClose={onClose} />
        </aside>
      )}

      <MobileDrawer open={!!sources && sources.length > 0} onClose={onClose} side="bottom">
        {sources && sources.length > 0 && (
          <SourcesPanelContent sources={sources} onClose={onClose} />
        )}
      </MobileDrawer>
    </>
  );
}
