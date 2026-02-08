"use client";

import { useState, useMemo, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import {
  generateTodayCoachOutput,
  type TodayContext as TodayContextType,
} from "@/lib/today-coach";
import { useVitaLife } from "@/contexts/VitaLifeContext";
import type { Mood, Energy, Stress } from "@/contexts/VitaLifeContext";

// ─── Design Tokens (هم‌راستا با پرامپت) ───
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

// ─── Helper: ContextChip ───
function ContextChip({ label }: { label: string }) {
  return (
    <span
      className="mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-medium"
      style={{
        backgroundColor: tokens.primarySoft,
        color: tokens.primary,
      }}
    >
      {label}
    </span>
  );
}

// ─── Helper: CoachCard ───
function CoachCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[20px] p-4 text-right"
      style={{
        backgroundColor: tokens.primarySoft,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}

// ─── Helper: TaskItem ───
interface TaskItemProps {
  id: string;
  text: string;
  done: boolean;
  onToggle: () => void;
  variant: "main" | "secondary";
}

function TaskItem({ text, done, onToggle, variant }: TaskItemProps) {
  const isMain = variant === "main";
  const checkboxSize = isMain ? 24 : 20;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-[20px] bg-white px-4 py-3 text-right transition-opacity ${
        done ? "opacity-90" : ""
      } ${isMain ? "border-2" : "border"}`}
      style={{
        borderColor: isMain ? tokens.primary : tokens.border,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-full text-white"
        style={{
          width: checkboxSize,
          height: checkboxSize,
          ...(done
            ? { backgroundColor: tokens.primary }
            : { border: `2px solid ${tokens.border}`, backgroundColor: "transparent" }),
        }}
      >
        {done && "✓"}
      </div>
      <span
        className={`flex-1 ${done ? "text-[var(--color-text-secondary)] line-through" : ""}`}
        style={{ color: done ? tokens.textSecondary : tokens.textPrimary }}
      >
        {text}
      </span>
    </button>
  );
}

// ─── Mock Data ───
const INITIAL_MAIN_TASK = { id: "main", text: "۵ دقیقه پیاده‌روی سبک", done: false };
const INITIAL_SECONDARY = [
  { id: "s1", text: "یک لیوان آب بنوش", done: true },
  { id: "s2", text: "۳ نفس عمیق بعد از ناهار", done: false },
];

// ─── Bottom Sheet: فرم حالت چطوره (همان چک‌این، بدون صفحه جدید) ───
const MOOD_OPTIONS: { value: Mood; emoji: string; label: string }[] = [
  { value: "low", emoji: "😴", label: "خسته" },
  { value: "neutral", emoji: "😐", label: "معمولی" },
  { value: "good", emoji: "😊", label: "خوب" },
];

const ENERGY_OPTIONS: { value: Energy; label: string }[] = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "بالا" },
];

const STRESS_OPTIONS: { value: Stress; label: string }[] = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "زیاد" },
];

interface CheckinBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialMood: Mood;
  initialEnergy: Energy;
  initialStress: Stress;
  onSubmit: (data: { mood: Mood; energy: Energy; stress: Stress }) => void;
}

function CheckinBottomSheet({
  isOpen,
  onClose,
  initialMood,
  initialEnergy,
  initialStress,
  onSubmit,
}: CheckinBottomSheetProps) {
  const [mood, setMood] = useState<Mood>(initialMood);
  const [energy, setEnergy] = useState<Energy>(initialEnergy);
  const [stress, setStress] = useState<Stress>(initialStress);

  useEffect(() => {
    if (isOpen) {
      setMood(initialMood);
      setEnergy(initialEnergy);
      setStress(initialStress);
    }
  }, [isOpen, initialMood, initialEnergy, initialStress]);

  const handleSubmit = () => {
    onSubmit({ mood, energy, stress });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="بستن"
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[420px] rounded-t-[24px] bg-white shadow-lg"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 24px)" }}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1 w-12 rounded-full bg-[#E6E6E9]" />
        </div>
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold" style={{ color: tokens.textPrimary }}>
            حالت چطوره؟
          </h2>
          <p className="text-sm" style={{ color: tokens.textMuted }}>
            زیر ۱ دقیقه — برنامه‌ی فردا بر اساس همین تنظیم می‌شه
          </p>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
                حال کلی
              </p>
              <div className="grid grid-cols-3 gap-2">
                {MOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMood(opt.value)}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-sm ${
                      mood === opt.value
                        ? "border-[#0FA36B] bg-[#E8F7F1]"
                        : "border-[#E6E6E9] bg-white"
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
                انرژی
              </p>
              <div className="flex gap-2">
                {ENERGY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setEnergy(opt.value)}
                    className={`flex-1 rounded-xl border-2 py-2.5 text-sm ${
                      energy === opt.value
                        ? "border-[#0FA36B] bg-[#E8F7F1]"
                        : "border-[#E6E6E9] bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
                استرس
              </p>
              <div className="flex gap-2">
                {STRESS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStress(opt.value)}
                    className={`flex-1 rounded-xl border-2 py-2.5 text-sm ${
                      stress === opt.value
                        ? "border-[#0FA36B] bg-[#E8F7F1]"
                        : "border-[#E6E6E9] bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-[16px] py-3 font-semibold text-white"
            style={{ backgroundColor: tokens.primary }}
          >
            ثبت
          </button>
        </div>
      </div>
    </>
  );
}

const CONTEXT_CHIP_LABELS: Record<Mood, string> = {
  low: "🌱 روز آروم",
  neutral: "🌱 امروز",
  good: "⚡ روز پرانرژی",
};

export default function TodayPage() {
  const { today, routineContext, routineCoachMessage, setMainTaskDone, setSecondaryTasksDone, setTodayFromCheckin } = useVitaLife();
  const hasRoutineSignal =
    routineContext.morningCoreDone ||
    routineContext.nightCoreDone ||
    routineContext.skippedMorning ||
    routineContext.skippedNight;
  const [mainTask, setMainTask] = useState(INITIAL_MAIN_TASK);
  const [secondaryTasks, setSecondaryTasks] = useState(INITIAL_SECONDARY);
  const [checkinSheetOpen, setCheckinSheetOpen] = useState(false);

  const completedTasks =
    (mainTask.done ? 1 : 0) + secondaryTasks.filter((t) => t.done).length;
  const skippedMainTask = !mainTask.done;

  const contextForCoach: TodayContextType = useMemo(
    () => ({
      mood: today.mood,
      energy: today.energy,
      stress: today.stress,
      completedTasks,
      skippedMainTask,
    }),
    [today.mood, today.energy, today.stress, completedTasks, skippedMainTask]
  );

  const coachOutput = useMemo(
    () => generateTodayCoachOutput(contextForCoach),
    [contextForCoach]
  );

  const coachMessage =
    today.lastCoachMessage ??
    (hasRoutineSignal ? routineCoachMessage : undefined) ??
    coachOutput.message;
  const progressMessage = today.lastCoachMessage
    ? "همین که گوش دادی کافیه 🌱"
    : hasRoutineSignal && routineCoachMessage
      ? "همین که به روتینت توجه کردی کافیه 🌱"
      : coachOutput.progressMessage;
  const mainTaskLabel = today.mood === "low" ? "کمی حرکت سبک" : "۵ دقیقه پیاده‌روی سبک";

  const handleMainToggle = () => {
    const next = !mainTask.done;
    setMainTask((p) => ({ ...p, done: next }));
    setMainTaskDone(next);
  };

  const handleSecondaryToggle = (id: string) => {
    setSecondaryTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      setSecondaryTasksDone(next.filter((t) => t.done).length);
      return next;
    });
  };

  return (
    <div
      className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-[#F8F9FA] pb-24"
      dir="rtl"
    >
      {/* [A] Header + Context */}
      <header className="border-b border-[#E6E6E9] bg-white/80 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold" style={{ color: tokens.textPrimary }}>
          امروز
        </h1>
        <p className="text-sm" style={{ color: tokens.textSecondary }}>
          یکشنبه، ۲۰ بهمن
        </p>
        <ContextChip label={CONTEXT_CHIP_LABELS[today.mood]} />
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 pt-6">
        {/* [B] Coach Message — lastCoachMessage از چت یا خروجی تطبیقی */}
        <CoachCard>
          <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: tokens.textPrimary }}>
            🌱
            <br />
            {coachMessage}
          </p>
        </CoachCard>

        {/* [C] Primary CTA — باز کردن باتم‌شیت چک‌این */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setCheckinSheetOpen(true)}
            className="flex items-center justify-between rounded-[16px] px-5 py-4 text-white transition-opacity hover:opacity-95"
            style={{
              backgroundColor: tokens.primary,
              minHeight: 56,
              boxShadow: "0 4px 12px rgba(15, 163, 107, 0.25)",
            }}
          >
            <span className="font-semibold">حالت چطوره؟</span>
            <span className="text-xl" aria-hidden>→</span>
          </button>
          <p
            className="text-[12px]"
            style={{ color: tokens.textMuted }}
          >
            برنامه‌ی فردا بر اساس همین تنظیم می‌شه
          </p>
        </div>

        <CheckinBottomSheet
          isOpen={checkinSheetOpen}
          onClose={() => setCheckinSheetOpen(false)}
          initialMood={today.mood}
          initialEnergy={today.energy}
          initialStress={today.stress}
          onSubmit={(data) => setTodayFromCheckin(data)}
        />

        {/* [D] Today Focus */}
        <section className="flex flex-col gap-4">
          {/* ⭐ Main Task */}
          <div>
            <h2 className="mb-2 text-sm font-semibold" style={{ color: tokens.textPrimary }}>
              ⭐ کار اصلی امروز
            </h2>
            <TaskItem
              id={mainTask.id}
              text={mainTaskLabel}
              done={mainTask.done}
              onToggle={handleMainToggle}
              variant="main"
            />
          </div>

          {/* Secondary Tasks */}
          <div>
            <h2 className="mb-2 text-sm font-medium" style={{ color: tokens.textSecondary }}>
              کارهای همراه
            </h2>
            <div className="flex flex-col gap-2">
              {secondaryTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  done={task.done}
                  onToggle={() => handleSecondaryToggle(task.id)}
                  variant="secondary"
                />
              ))}
            </div>
          </div>
        </section>

        {/* [E] Gentle Progress — از Coach، بدون عدد */}
        <p
          className="text-center text-[13px] leading-[1.7]"
          style={{ color: tokens.textSecondary }}
        >
          🌿
          <br />
          {progressMessage}
        </p>
      </main>

      <BottomNav active="today" />
    </div>
  );
}
