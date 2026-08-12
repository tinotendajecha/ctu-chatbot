"use client";

import { useEffect, useRef } from "react";
import { Message, Source } from "../../lib/types";
import MessageBubble from "./MessageBubble";
import ThinkingIndicator from "./ThinkingIndicator";

interface MessageListProps {
  messages: Message[];
  isThinking: boolean;
  onOpenSources: (sources: Source[]) => void;
}

export default function MessageList({ messages, isThinking, onOpenSources }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onOpenSources={onOpenSources} />
      ))}
      {isThinking && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
