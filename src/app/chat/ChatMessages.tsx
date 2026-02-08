"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType } from "./types";

interface ChatMessagesProps {
  messages: ChatMessageType[];
}

/** حباب چت — مربی: کارت سفید با border ملایم؛ کاربر: primarySoft / tint */
function ChatBubble({ message }: { message: ChatMessageType }) {
  const isCoach = message.sender === "coach";

  return (
    <div
      className={`flex ${isCoach ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-[20px] border px-4 py-3 ${
          isCoach
            ? "border-border bg-surface text-ink shadow-sm"
            : "border-primary bg-primary-soft text-ink"
        }`}
      >
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {message.text}
        </p>
        {message.time && (
          <p
            className={`mt-1 text-xs ${
              isCoach ? "text-ink-subtle" : "text-ink-muted"
            }`}
          >
            {message.time}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col overflow-y-auto gap-4 px-6 py-6 pb-40"
    >
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
