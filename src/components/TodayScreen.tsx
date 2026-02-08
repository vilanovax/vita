"use client";

import Link from "next/link";
import BottomNav from "./BottomNav";

// حداکثر ۳ تسک؛ ۱ اصلی + ۲ همراه
const MOCK_MAIN_TASK = {
  id: "main",
  text: "۵ دقیقه پیاده‌روی سبک",
  done: false,
};

const MOCK_SECONDARY_TASKS = [
  { id: "s1", text: "یک لیوان آب بنوش", done: true },
  { id: "s2", text: "۳ نفس عمیق بعد از ناهار", done: false },
];

const CONTEXT_CHIPS = ["🌱 روز آروم", "⚡ روز پرانرژی", "💤 روز کم‌انرژی"] as const;
const GENTLE_PROGRESS_TEXTS = [
  "این سومین روزیه که به بدنت توجه می‌کنی",
  "این هفته بیشتر روزها با خودت مهربون بودی",
] as const;

export default function TodayScreen() {
  const contextChip = CONTEXT_CHIPS[0];
  const progressText = GENTLE_PROGRESS_TEXTS[0];

  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--today-max-width)] flex-col bg-surface-secondary pb-24">
      {/* ─── A: Header + Context ─── */}
      <header className="border-b border-border bg-surface/80 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold text-ink">امروز</h1>
        <p className="text-sm text-ink-muted">یکشنبه، ۲۰ بهمن</p>
        <span
          className="mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-medium"
          style={{
            background: "var(--context-chip-bg)",
            color: "var(--context-chip-text)",
            fontSize: "var(--context-chip-font-size)",
          }}
        >
          {contextChip}
        </span>
      </header>

      <main
        className="flex flex-1 flex-col px-6 pt-6"
        style={{ gap: "var(--today-section-gap)" }}
      >
        {/* ─── B: Coach Message (قلاب احساسی) ─── */}
        <div
          className="rounded-[20px] p-4"
          style={{
            background: "var(--coach-card-bg)",
            padding: "var(--coach-card-padding)",
          }}
        >
          <p className="text-sm leading-relaxed text-ink">
            🌱{" "}
            امروز قرار نیست بدویی.
            <br />
            سه قدم کوچیک، هم‌راستا با حالت.
          </p>
        </div>

        {/* ─── C: Primary CTA — Check-in ─── */}
        <Link
          href="/checkin"
          className="flex items-center justify-between rounded-[16px] bg-primary px-5 py-4 text-white"
          style={{
            minHeight: "var(--today-cta-height)",
            boxShadow: "var(--today-cta-shadow)",
          }}
        >
          <div className="flex flex-col gap-0.5 text-right">
            <span className="font-semibold">حالت چطوره؟</span>
            <span className="text-sm text-white/90">(زیر ۱ دقیقه)</span>
            <span className="text-[12px] text-white/85">
              برنامه‌ی فردا بر اساس همین تنظیم می‌شه
            </span>
          </div>
          <span className="text-2xl" aria-hidden>→</span>
        </Link>

        {/* ─── D: Today Focus ─── */}
        <section style={{ gap: "var(--today-inner-gap)" }} className="flex flex-col">
          {/* ⭐ کار اصلی امروز */}
          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">
              ⭐ کار اصلی امروز
            </h2>
            <div
              className={`flex items-center gap-3 rounded-[20px] border-2 bg-surface px-4 py-3 ${
                MOCK_MAIN_TASK.done ? "opacity-70" : ""
              }`}
              style={{
                borderColor: "var(--main-task-border)",
                padding: "var(--main-task-padding)",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-center rounded-full"
                style={{
                  width: "var(--main-checkbox-size)",
                  height: "var(--main-checkbox-size)",
                  ...(MOCK_MAIN_TASK.done
                    ? { background: "var(--color-brand-primary)", color: "white" }
                    : { border: "2px solid var(--color-border-default)" }),
                }}
              >
                {MOCK_MAIN_TASK.done && "✓"}
              </div>
              <span
                className={
                  MOCK_MAIN_TASK.done ? "text-ink-muted line-through" : "text-ink"
                }
              >
                {MOCK_MAIN_TASK.text}
              </span>
            </div>
          </div>

          {/* ▫️ کارهای همراه */}
          <div>
            <h2 className="mb-2 text-sm font-medium text-ink-muted">
              کارهای همراه
            </h2>
            <div className="flex flex-col gap-2">
              {MOCK_SECONDARY_TASKS.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-xl border bg-surface px-4 py-3 ${
                    task.done ? "opacity-[var(--secondary-task-opacity)]" : ""
                  }`}
                  style={{ borderColor: "var(--secondary-task-border)" }}
                >
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full"
                    style={{
                      width: "var(--secondary-checkbox-size)",
                      height: "var(--secondary-checkbox-size)",
                      ...(task.done
                        ? {
                            background: "var(--color-brand-primary)",
                            color: "white",
                          }
                        : { border: "2px solid var(--color-border-default)" }),
                    }}
                  >
                    {task.done && "✓"}
                  </div>
                  <span
                    className={
                      task.done ? "text-ink-muted line-through" : "text-ink"
                    }
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── E: Gentle Progress (بدون عدد) ─── */}
        <p
          className="text-center"
          style={{
            fontSize: "var(--progress-text-size)",
            color: "var(--progress-text-color)",
            lineHeight: "var(--progress-line-height)",
          }}
        >
          🌿
          <br />
          {progressText}
        </p>
      </main>

      <BottomNav active="today" />
    </div>
  );
}
