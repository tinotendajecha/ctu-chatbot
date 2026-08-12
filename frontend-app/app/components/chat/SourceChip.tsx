import { Source } from "../../lib/types";
import Badge from "../ui/Badge";

interface SourceChipProps {
  source: Source;
  onClick: () => void;
}

export default function SourceChip({ source, onClick }: SourceChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-text transition-colors hover:border-primary"
    >
      <Badge tone="primary">{source.fileType}</Badge>
      <span className="max-w-[200px] truncate">{source.filename}</span>
    </button>
  );
}
