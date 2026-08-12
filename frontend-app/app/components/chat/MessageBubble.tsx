import { Message, Source } from "../../lib/types";
import { cn } from "../../lib/utils";
import SourceChip from "./SourceChip";

interface MessageBubbleProps {
  message: Message;
  onOpenSources: (sources: Source[]) => void;
}

function AssistantAvatar() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary font-heading text-xs font-extrabold text-white">
      CTU
    </span>
  );
}

export default function MessageBubble({ message, onOpenSources }: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-l-2xl rounded-tr-sm rounded-br-2xl bg-primary p-3 text-[15px] text-white md:max-w-[70%]">
          {message.text}
        </p>
      </div>
    );
  }

  const isGuardrail = message.role === "guardrail";

  return (
    <div className="flex items-start gap-2">
      <AssistantAvatar />
      <div className="flex max-w-[85%] flex-col gap-2 md:max-w-[70%]">
        <p
          className={cn(
            "rounded-r-2xl rounded-bl-2xl rounded-tl-sm p-3 text-[15px]",
            isGuardrail
              ? "border-l-4 border-secondary bg-secondary/10 text-text"
              : "border border-border bg-surface text-text"
          )}
        >
          {message.text}
        </p>

        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.sources.map((source) => (
              <SourceChip
                key={source.id}
                source={source}
                onClick={() => onOpenSources(message.sources!)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
