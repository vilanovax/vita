"use client";

import { useState, useCallback } from "react";
import BottomNav from "./BottomNav";

type TaskItem = { id: string; text: string; done: boolean };

const MORNING_CORE: TaskItem = {
  id: "m-core",
  text: "یک لیوان آب بنوش",
  done: false,
};

const MORNING_OPTIONAL: TaskItem[] = [
  { id: "m-1", text: "۳ نفس عمیق", done: false },
  { id: "m-2", text: "۵ دقیقه کشش سبک", done: false },
  { id: "m-3", text: "صبحانه بدون عجله", done: false },
];

const EVENING_CORE: TaskItem = {
  id: "e-core",
  text: "گوشی رو کنار بذار (۳۰ دقیقه قبل خواب)",
  done: false,
};

const EVENING_OPTIONAL: TaskItem[] = [
  { id: "e-1", text: "دمنوش یا آب ولرم", done: false },
  { id: "e-2", text: "۲ دقیقه مرور روز", done: false },
];

function RoutineTask({
  item,
  isCore,
  onToggle,
}: {
  item: TaskItem;
  isCore: boolean;
  onToggle: () => void;
}) {
  const size = isCore ? "var(--core-checkbox-size)" : "var(--secondary-checkbox-size)";
  const borderColor = isCore ? "var(--core-task-border)" : "var(--color-border-muted)";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-xl border bg-white text-right transition-opacity"
      style={{
        padding: isCore ? "var(--core-task-padding)" : "var(--secondary-task-gap) 14px",
        borderRadius: isCore ? "var(--core-task-radius)" : "var(--radius-lg)",
        borderColor: item.done ? "var(--color-border-muted)" : borderColor,
        opacity: !isCore && item.done ? 0.9 : 1,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-full font-medium text-white"
        style={{
          width: size,
          height: size,
          backgroundColor: item.done ? "var(--color-brand-primary)" : "transparent",
          border: item.done ? "none" : `2px solid ${borderColor}`,
          fontSize: "12px",
        }}
      >
        {item.done && "✓"}
      </div>
      <span
        className={`flex-1 ${item.done ? "text-[var(--color-text-secondary)] line-through" : "text-[var(--color-text-primary)]"}`}
        style={{ fontSize: "var(--font-sm)" }}
      >
        {item.text}
      </span>
    </button>
  );
}

export default function RoutinesScreen() {
  const [morningCore, setMorningCore] = useState(MORNING_CORE);
  const [morningOptional, setMorningOptional] = useState(MORNING_OPTIONAL);
  const [eveningCore, setEveningCore] = useState(EVENING_CORE);
  const [eveningOptional, setEveningOptional] = useState(EVENING_OPTIONAL);

  const toggleMorningCore = useCallback(() => {
    setMorningCore((p) => ({ ...p, done: !p.done }));
  }, []);

  const toggleMorningOptional = useCallback((id: string) => {
    setMorningOptional((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const toggleEveningCore = useCallback(() => {
    setEveningCore((p) => ({ ...p, done: !p.done }));
  }, []);

  const toggleEveningOptional = useCallback((id: string) => {
    setEveningOptional((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-secondary)] pb-24">
      <header className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-6 py-4">
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
          روتین‌های تو
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          کمتر از ۵ دقیقه • قابل شخصی‌سازی
        </p>
        <p
          className="mt-1 text-[var(--routine-subtitle-size)] text-[var(--routine-subtitle-color)]"
          style={{ lineHeight: "var(--routine-hint-line-height)" }}
        >
          بر اساس حال و سبک زندگی‌ات
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        {/* ─── روتین صبح ─── */}
        <section
          className="rounded-[var(--routine-card-radius)] border border-[var(--routine-card-border)] bg-[var(--routine-card-bg)] p-[var(--routine-card-padding)]"
          style={{ gap: "var(--routine-card-gap)" }}
        >
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)]">
              <span className="text-2xl">🌅</span>
              روتین صبح
            </h2>
            <p
              className="mt-0.5 text-[var(--routine-subtitle-size)] text-[var(--routine-subtitle-color)]"
              style={{ lineHeight: "var(--routine-hint-line-height)" }}
            >
              برای شروع آروم روز
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
              ⭐ کار اصلی صبح
            </p>
            <RoutineTask
              item={morningCore}
              isCore
              onToggle={toggleMorningCore}
            />
            {morningCore.done && (
              <p
                className="mt-2 text-[var(--routine-hint-size)] text-[var(--routine-hint-color)]"
                style={{ lineHeight: "var(--routine-hint-line-height)" }}
              >
                همین کافیه 🌱
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
              کارهای همراه
            </p>
            <div className="space-y-2">
              {morningOptional.map((item) => (
                <RoutineTask
                  key={item.id}
                  item={item}
                  isCore={false}
                  onToggle={() => toggleMorningOptional(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── روتین شب ─── */}
        <section
          className="rounded-[var(--routine-card-radius)] border border-[var(--routine-card-border)] bg-[var(--routine-card-bg)] p-[var(--routine-card-padding)]"
          style={{ gap: "var(--routine-card-gap)" }}
        >
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)]">
              <span className="text-2xl">🌙</span>
              روتین شب
            </h2>
            <p
              className="mt-0.5 text-[var(--routine-subtitle-size)] text-[var(--routine-subtitle-color)]"
              style={{ lineHeight: "var(--routine-hint-line-height)" }}
            >
              برای جمع‌کردن روز
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
              ⭐ کار اصلی شب
            </p>
            <RoutineTask
              item={eveningCore}
              isCore
              onToggle={toggleEveningCore}
            />
            {eveningCore.done && (
              <p
                className="mt-2 text-[var(--routine-hint-size)] text-[var(--routine-hint-color)]"
                style={{ lineHeight: "var(--routine-hint-line-height)" }}
              >
                همین کافیه 🌱
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
              کارهای همراه
            </p>
            <div className="space-y-2">
              {eveningOptional.map((item) => (
                <RoutineTask
                  key={item.id}
                  item={item}
                  isCore={false}
                  onToggle={() => toggleEveningOptional(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Flexible Hint ─── */}
        <div
          className="rounded-[var(--radius-lg)] bg-[var(--color-brand-primary-soft)] px-4 py-3 text-center"
          style={{
            fontSize: "var(--routine-hint-size)",
            color: "var(--routine-hint-color)",
            lineHeight: "var(--routine-hint-line-height)",
          }}
        >
          <span className="inline-block">🌱</span>
          <p className="mt-1">
            اگه امشب خسته‌ای، فقط کار اصلی کافیه
          </p>
          <p className="mt-0.5 text-[var(--color-text-secondary)]">
            امروز کامل بودن مهم نیست، حاضر بودن کافیه
          </p>
        </div>

        <p className="text-center text-xs text-[var(--color-text-tertiary)]">
          روتین‌ها قابل شخصی‌سازی هستن
        </p>
      </main>

      <BottomNav active="routines" />
    </div>
  );
}
