"use client";

import { useState } from "react";
import Link from "next/link";
import { useVitaLife } from "@/contexts/VitaLifeContext";

// ─── Design Tokens ───
const tokens = {
  primary: "#0FA36B",
  primarySoft: "#E8F7F1",
  textPrimary: "#1C1C1E",
  textSecondary: "#6B6B6F",
  textMuted: "#9E9EA2",
  border: "#E6E6E9",
  bg: "#FFFFFF",
  bgSoft: "#F8F9FA",
} as const;

const CONTEXT_CHIP_LABELS: Record<string, string> = {
  low: "🌱 روز آروم",
  neutral: "🌱 امروز",
  good: "⚡ روز پرانرژی",
};

const COACH_INSIGHTS = [
  "امروز بدنت بیشتر دنبال سادگیه.\nغذا رو ساده‌تر کن، نه کمتر 🌱",
  "امروز کیفیت مهم‌تر از کمیتِ.\nآروم بخور، همین کافیه.",
];

const FLEXIBLE_OPTIONS = [
  { emoji: "🥪", text: "همونی که هست، ولی آهسته‌تر" },
  { emoji: "🍽️", text: "نصف معمول، بدون حذف" },
  { emoji: "☕", text: "یه نوشیدنی گرم + غذای سبک" },
];

const HABIT_OPTIONS = [
  { emoji: "⏸️", text: "قبل از اولین لقمه\n۳ نفس آروم بکش" },
  { emoji: "📱", text: "موقع غذا، گوشی رو کنار بذار" },
];

const REASSURANCE = [
  "اگه امروز طبق این هم نشد،\nهیچ چیزی خراب نشده",
  "فردا دوباره تنظیم می‌کنیم",
];

export default function FoodTodayPage() {
  const { today } = useVitaLife();
  const [habitChecked, setHabitChecked] = useState(false);

  const contextLabel = CONTEXT_CHIP_LABELS[today.mood] ?? "🌱 امروز";
  const coachInsight = COACH_INSIGHTS[today.mood === "low" ? 0 : 1];
  const habit = HABIT_OPTIONS[0];
  const reassurance = REASSURANCE[0];

  return (
    <div
      className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-[#F8F9FA] pb-24"
      dir="rtl"
    >
      {/* [A] Header + Context */}
      <header className="border-b px-6 py-4" style={{ borderColor: tokens.border, backgroundColor: tokens.bg }}>
        <h1 className="text-lg font-semibold" style={{ color: tokens.textPrimary }}>
          🍽️ پیشنهاد خوردن امروز
        </h1>
        <p className="mt-1 text-sm" style={{ color: tokens.textMuted }}>
          بر اساس حالت امروزت
        </p>
        <span
          className="mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-medium"
          style={{ backgroundColor: tokens.primarySoft, color: tokens.primary }}
        >
          {contextLabel}
        </span>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        {/* [B] Coach Insight Card */}
        <section
          className="rounded-[20px] p-4"
          style={{ backgroundColor: tokens.primarySoft }}
        >
          <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: tokens.textPrimary }}>
            {coachInsight}
          </p>
        </section>

        {/* [C] Today Food Focus */}
        <section>
          <h2 className="mb-2 text-sm font-semibold" style={{ color: tokens.textPrimary }}>
            ⭐ پیشنهاد اصلی امروز
          </h2>
          <div
            className="rounded-[20px] border-2 p-4"
            style={{ borderColor: tokens.primary, backgroundColor: tokens.bg }}
          >
            <p className="text-2xl">🍲</p>
            <p className="mt-2 text-sm font-medium" style={{ color: tokens.textPrimary }}>
              یه وعده ساده و سیرکننده
              <br />
              با پروتئین + سبزی
            </p>
            <p className="mt-2 text-[13px]" style={{ color: tokens.textMuted }}>
              لازم نیست خاص باشه، فقط ساده‌تر از معمول
            </p>
          </div>
        </section>

        {/* [D] Flexible Alternatives */}
        <section>
          <h2 className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
            اگه این نشد، اینا هم اوکی‌ان
          </h2>
          <div className="space-y-2">
            {FLEXIBLE_OPTIONS.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[20px] border px-4 py-3"
                style={{ borderColor: tokens.border, backgroundColor: tokens.bg }}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-sm" style={{ color: tokens.textPrimary }}>
                  {opt.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* [E] Gentle Food Habit */}
        <section>
          <h2 className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
            عادت کوچیک امروز
          </h2>
          <button
            type="button"
            onClick={() => setHabitChecked((c) => !c)}
            className="flex w-full items-start gap-3 rounded-[20px] border px-4 py-3 text-right transition-opacity"
            style={{ borderColor: tokens.border, backgroundColor: tokens.bg }}
          >
            <div
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white"
              style={{
                backgroundColor: habitChecked ? tokens.primary : "transparent",
                border: habitChecked ? "none" : `2px solid ${tokens.border}`,
              }}
            >
              {habitChecked && "✓"}
            </div>
            <div>
              <p className="text-xl">{habit.emoji}</p>
              <p className="mt-1 whitespace-pre-line text-sm" style={{ color: tokens.textPrimary }}>
                {habit.text}
              </p>
            </div>
          </button>
          {habitChecked && (
            <p className="mt-2 text-[13px]" style={{ color: tokens.textMuted }}>
              همین توجه کافیه 🌱
            </p>
          )}
        </section>

        {/* [F] Reassurance Footer */}
        <div className="text-center" style={{ fontSize: 13, color: tokens.textMuted, lineHeight: 1.7 }}>
          <span className="block">🌿</span>
          <p className="mt-2 whitespace-pre-line">{reassurance}</p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 mx-auto max-w-[420px] border-t bg-white/95 px-6 py-3 backdrop-blur" style={{ borderColor: tokens.border }}>
        <Link href="/today" className="block text-center text-sm font-medium" style={{ color: tokens.primary }}>
          ← برگشت به امروز
        </Link>
      </footer>
    </div>
  );
}
