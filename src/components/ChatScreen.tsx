"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "./BottomNav";

const MOCK_MESSAGES = [
  { id: "1", role: "assistant", text: "سلام! چطور می‌تونم کمکت کنم؟ هر سوالی درباره برنامه‌ات، عادت‌ها یا حال و روزت داری بپرس.", time: "۱۰:۳۰" },
  { id: "2", role: "assistant", text: "اگه امروز حالت خوب نیست، کاملاً قابل درکه. حتی یه قدم خیلی کوچیک هم می‌تونه کافی باشه — مثلاً یه نفس عمیق یا یه لیوان آب.", time: "۱۰:۳۰" },
];

/** گزینه‌های شروع گفتگو (Top 3 حالت واقعی کاربر) */
const QUICK_REPLIES_START = [
  "پرخوردم، چیکار کنم؟",
  "حالم خیلی خسته‌ست",
  "انگیزه ندارم",
];

/** گزینه‌های پاسخ به مربی — بدون احساس شکست */
const QUICK_REPLIES_AFTER_COACH = [
  "همین کار کوچیکو انجام می‌دم",
  "الان نه، بعداً",
  "یه پیشنهاد دیگه داری؟",
];

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages] = useState(MOCK_MESSAGES);

  const lastMessage = messages[messages.length - 1];
  const showReplyToCoach = lastMessage?.role === "assistant";
  const quickReplies = showReplyToCoach ? QUICK_REPLIES_AFTER_COACH : QUICK_REPLIES_START;

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary pb-24">
      <header className="flex items-center gap-4 border-b border-border bg-surface px-6 py-4">
        <Link href="/today" className="text-ink-muted">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-ink">چت با مربی</h1>
          <p className="text-sm text-ink-muted">لحن انسانی و همدل</p>
        </div>
      </header>

      <main className="flex flex-1 flex-col overflow-y-auto px-6 py-6 pb-40">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl border px-4 py-3 ${
                  msg.role === "user"
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-ink"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`mt-1 text-xs ${msg.role === "user" ? "text-primary-accent" : "text-ink-subtle"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies — شروع گفتگو یا پاسخ به مربی (context-aware) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {quickReplies.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => setInput(text)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-muted transition hover:bg-surface-soft"
            >
              {text}
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-20 left-0 right-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur safe-bottom">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="بنویس..."
            className="flex-1 rounded-lg border border-border bg-surface-soft px-4 py-3 outline-none focus:border-primary"
          />
          <button
            disabled={!input.trim()}
            className="rounded-lg bg-primary px-5 py-3 text-white disabled:bg-disabled disabled:text-disabled-text"
          >
            ارسال
          </button>
        </div>
      </div>

      <BottomNav active="chat" />
    </div>
  );
}
