"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { generateCoachReply } from "@/lib/ai-coach-prompt";
import { useVitaLife, detectIntent } from "@/contexts/VitaLifeContext";
import type { ChatMessage } from "./types";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import QuickReplies from "./QuickReplies";
import BottomNav from "@/components/BottomNav";

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getMockTime() {
  return "۱۰:۳۰";
}

function getContextAwareGreeting(
  mood: string,
  energy: string,
  routineEnergy?: "low" | "normal" | "good"
): string {
  if (routineEnergy === "low") {
    return "بر اساس روتینت، امروز آروم پیش می‌ریم. هر وقت خواستی حرف بزنیم 🌱";
  }
  if (mood === "low" || energy === "low") {
    return "بر اساس حال امروزت، دوست داری آروم پیش بریم یا فقط حرف بزنیم؟";
  }
  if (mood === "good") {
    return "سلام! به‌نظر حالت خوبه. هر سوالی درباره برنامه‌ات یا حال و روزت داری بپرس.";
  }
  return "سلام! چطور می‌تونم کمکت کنم؟ هر سوالی درباره برنامت، عادت‌ها یا حال و روزت داری بپرس.";
}

const SECOND_MESSAGE: ChatMessage = {
  id: "2",
  sender: "coach",
  text: "اگه امروز حالت خوب نیست، کاملاً قابل درکه. حتی یه قدم خیلی کوچیک هم می‌تونه کافی باشه — مثلاً یه نفس عمیق یا یه لیوان آب.",
  time: "۱۰:۳۰",
};

export default function ChatPage() {
  const { today, routineContext, applyIntentImpact, setLastCoachMessage } = useVitaLife();
  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "1",
        sender: "coach",
        text: getContextAwareGreeting(today.mood, today.energy, routineContext.routineEnergy),
        time: "۱۰:۳۰",
      },
      { ...SECOND_MESSAGE, id: genId() },
    ],
    [today.mood, today.energy, routineContext.routineEnergy]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendUserMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMessage: ChatMessage = {
        id: genId(),
        sender: "user",
        text: trimmed,
        time: getMockTime(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const intent = detectIntent(trimmed);
      applyIntentImpact(intent);

      setIsSending(true);
      setTimeout(() => {
        const coachText = generateCoachReply(trimmed);
        setLastCoachMessage(coachText);
        const coachMessage: ChatMessage = {
          id: genId(),
          sender: "coach",
          text: coachText,
          time: getMockTime(),
        };
        setMessages((prev) => [...prev, coachMessage]);
        setIsSending(false);
      }, 800);
    },
    [isSending, applyIntentImpact, setLastCoachMessage]
  );

  const handleSend = useCallback(() => {
    sendUserMessage(input);
  }, [input, sendUserMessage]);

  const handleQuickReply = useCallback(
    (text: string) => {
      sendUserMessage(text);
    },
    [sendUserMessage]
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary pb-24">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-4 border-b border-border bg-surface px-6 py-4">
        <Link
          href="/today"
          className="text-ink-muted transition hover:text-ink"
          aria-label="بازگشت"
        >
          <span className="text-xl">←</span>
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-ink">چت با مربی</h1>
          <p className="text-sm text-ink-muted">لحن انسانی و همدل</p>
        </div>
      </header>

      {/* Messages — scrollable */}
      <ChatMessages messages={messages} />

      {/* Quick Replies + Input bar — fixed above bottom nav */}
      <div className="fixed bottom-20 left-0 right-0 z-10 w-full bg-surface-secondary/95 backdrop-blur safe-bottom">
        <QuickReplies onSelect={handleQuickReply} disabled={isSending} />
        <div className="border-t border-border bg-surface/95 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isSending={isSending}
          />
        </div>
      </div>

      <BottomNav active="chat" />
    </div>
  );
}
