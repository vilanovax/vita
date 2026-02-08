"use client";

import { useState, useCallback, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { useVitaLife } from "@/contexts/VitaLifeContext";

// ─── Design Tokens (per prompt) ───
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

type RoutineState = {
  morningCore: boolean;
  morningSecondary: boolean[];
  nightCore: boolean;
  nightSecondary: boolean[];
};

const INITIAL_STATE: RoutineState = {
  morningCore: false,
  morningSecondary: [false, false, false],
  nightCore: false,
  nightSecondary: [false, false],
};

// ─── CoreTask: one task, bigger checkbox, stronger border ───
function CoreTask({
  label,
  done,
  onToggle,
}: {
  label: string;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-[16px] border-2 bg-white py-3.5 pr-4 pl-4 text-right transition-opacity"
        style={{
          borderColor: done ? tokens.border : tokens.primary,
        }}
      >
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
          style={{
            backgroundColor: done ? tokens.primary : "transparent",
            border: done ? "none" : `2px solid ${tokens.primary}`,
          }}
        >
          {done && "✓"}
        </div>
        <span
          className="flex-1 text-sm"
          style={{
            color: done ? tokens.textMuted : tokens.textPrimary,
            textDecoration: done ? "line-through" : "none",
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

// ─── SecondaryTask: smaller checkbox, less emphasis ───
function SecondaryTask({
  label,
  done,
  onToggle,
}: {
  label: string;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-[16px] border bg-white py-2.5 pr-4 pl-4 text-right transition-opacity"
      style={{
        borderColor: tokens.border,
        opacity: done ? 0.9 : 1,
      }}
    >
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
        style={{
          backgroundColor: done ? tokens.primary : "transparent",
          border: done ? "none" : `2px solid ${tokens.border}`,
        }}
      >
        {done && "✓"}
      </div>
      <span
        className="flex-1 text-sm"
        style={{
          color: done ? tokens.textMuted : tokens.textPrimary,
          textDecoration: done ? "line-through" : "none",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── RoutineCard: section with title, subtitle, core block, secondary block ───
function RoutineCard({
  emoji,
  title,
  subtitle,
  coreLabel,
  coreTaskText,
  coreDone,
  onCoreToggle,
  coreFeedback,
  secondaryLabels,
  secondaryDone,
  onSecondaryToggle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  coreLabel: string;
  coreTaskText: string;
  coreDone: boolean;
  onCoreToggle: () => void;
  coreFeedback: boolean;
  secondaryLabels: string[];
  secondaryDone: boolean[];
  onSecondaryToggle: (index: number) => void;
}) {
  return (
    <section
      className="rounded-[20px] border p-4"
      style={{
        backgroundColor: tokens.bg,
        borderColor: tokens.border,
        gap: 12,
      }}
    >
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: tokens.textPrimary }}>
          <span className="text-2xl">{emoji}</span>
          {title}
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: tokens.textSecondary }}>
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium" style={{ color: tokens.textSecondary }}>
          ⭐ {coreLabel}
        </p>
        <CoreTask label={coreTaskText} done={coreDone} onToggle={onCoreToggle} />
        {coreFeedback && (
          <p className="text-[13px]" style={{ color: tokens.textSecondary, lineHeight: 1.7 }}>
            همین کافیه 🌱
          </p>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs font-medium" style={{ color: tokens.textSecondary }}>
          کارهای همراه
        </p>
        <div className="space-y-2">
          {secondaryLabels.map((label, i) => (
            <SecondaryTask
              key={i}
              label={label}
              done={secondaryDone[i]}
              onToggle={() => onSecondaryToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RoutinePage() {
  const { updateRoutineFromRoutinePage, leaveRoutinePage } = useVitaLife();
  const [state, setState] = useState<RoutineState>(INITIAL_STATE);

  // همگام‌سازی با مغز مشترک بعد از هر تغییر
  useEffect(() => {
    updateRoutineFromRoutinePage({
      morningCoreDone: state.morningCore,
      morningSecondaryDone: state.morningSecondary.filter(Boolean).length,
      nightCoreDone: state.nightCore,
      nightSecondaryDone: state.nightSecondary.filter(Boolean).length,
    });
  }, [state.morningCore, state.morningSecondary, state.nightCore, state.nightSecondary, updateRoutineFromRoutinePage]);

  // با ترک صفحه، «رد نشدن» بدون سرزنش ثبت می‌شود
  useEffect(() => () => leaveRoutinePage(), [leaveRoutinePage]);

  const toggleMorningCore = useCallback(() => {
    setState((s) => ({ ...s, morningCore: !s.morningCore }));
  }, []);
  const setMorningSecondary = useCallback((index: number) => {
    setState((s) => {
      const next = [...s.morningSecondary];
      next[index] = !next[index];
      return { ...s, morningSecondary: next };
    });
  }, []);
  const toggleNightCore = useCallback(() => {
    setState((s) => ({ ...s, nightCore: !s.nightCore }));
  }, []);
  const setNightSecondary = useCallback((index: number) => {
    setState((s) => {
      const next = [...s.nightSecondary];
      next[index] = !next[index];
      return { ...s, nightSecondary: next };
    });
  }, []);

  return (
    <div dir="rtl" className="flex min-h-screen flex-col pb-24" style={{ backgroundColor: tokens.bgSoft }}>
      {/* [A] Header */}
      <header className="border-b px-6 py-5" style={{ borderColor: tokens.border, backgroundColor: tokens.bg }}>
        <h1 className="text-lg font-semibold" style={{ color: tokens.textPrimary }}>
          روتین‌های تو
        </h1>
        <p className="mt-1 text-sm" style={{ color: tokens.textSecondary }}>
          کمتر از ۵ دقیقه • قابل شخصی‌سازی
        </p>
        <p className="mt-2 text-[13px]" style={{ color: tokens.textMuted }}>
          بر اساس حال و سبک زندگی‌ات
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        {/* [B] Morning Routine Card */}
        <RoutineCard
          emoji="🌅"
          title="روتین صبح"
          subtitle="برای شروع آروم روز"
          coreLabel="کار اصلی صبح"
          coreTaskText="یک لیوان آب بنوش"
          coreDone={state.morningCore}
          onCoreToggle={toggleMorningCore}
          coreFeedback={state.morningCore}
          secondaryLabels={["۳ نفس عمیق", "۵ دقیقه کشش سبک", "صبحانه بدون عجله"]}
          secondaryDone={state.morningSecondary}
          onSecondaryToggle={setMorningSecondary}
        />

        {/* [C] Evening Routine Card */}
        <RoutineCard
          emoji="🌙"
          title="روتین شب"
          subtitle="برای جمع‌کردن روز"
          coreLabel="کار اصلی شب"
          coreTaskText="گوشی رو کنار بذار (۳۰ دقیقه قبل خواب)"
          coreDone={state.nightCore}
          onCoreToggle={toggleNightCore}
          coreFeedback={state.nightCore}
          secondaryLabels={["دمنوش یا آب ولرم", "۲ دقیقه مرور روز"]}
          secondaryDone={state.nightSecondary}
          onSecondaryToggle={setNightSecondary}
        />

        {/* [D] Flexible Hint — text only, no card, muted */}
        <div
          className="text-center"
          style={{
            fontSize: 13,
            color: tokens.textMuted,
            lineHeight: 1.7,
          }}
        >
          <span className="block">🌱</span>
          <p className="mt-2">
            اگه امروز یا امشب خسته‌ای،
            <br />
            فقط کار اصلی کافیه
          </p>
        </div>
      </main>

      <BottomNav active="routines" />
    </div>
  );
}
