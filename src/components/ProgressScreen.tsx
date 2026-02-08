"use client";

import { useState, useEffect } from "react";
import BottomNav from "./BottomNav";

export default function ProgressScreen() {
  const [showReturnMessage, setShowReturnMessage] = useState(false);

  useEffect(() => {
    const key = "vitalife_progress_last_open";
    const last = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (!last || now - Number(last) > oneDay) {
      setShowReturnMessage(true);
    }
    if (typeof window !== "undefined") localStorage.setItem(key, String(now));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary pb-24">
      <header className="border-b border-border bg-surface px-6 py-4">
        <h1 className="text-lg font-semibold text-ink">پیشرفت</h1>
        <p className="text-sm text-ink-muted">بدون استرس — تمرکز روی استمرار</p>
        <p className="mt-2 text-xs text-ink-subtle">
          این فقط روند توئه، نه معیار خوب یا بد بودن 🌱
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        {showReturnMessage && (
          <p className="text-center text-sm text-ink-muted">
            برگشتن خودش یک قدمه 🌿
          </p>
        )}
        {/* Streak */}
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-ink-muted">Streak</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-primary">۷</span>
            <span className="text-ink-muted">روز پشت سر هم</span>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            تمرکز روی استمرار، نه کمال ✨
          </p>
        </section>

        {/* Plan progress */}
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-ink-muted">
            برنامه ۴۰ روزه
          </h2>
          <div className="mb-2 flex justify-between text-sm text-ink-muted">
            <span>روز ۷ از ۴۰</span>
            <span>۱۷٪</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: "17%" }}
            />
          </div>
        </section>

        {/* Trends (mock) */}
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-ink-muted">
            روند کلی
          </h2>
          <div className="flex h-24 items-end justify-around gap-2">
            {[40, 60, 45, 70, 65, 80, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            چک‌این روزانه — بدون عدد وسواسی
          </p>
        </section>

        <p className="text-center text-sm text-ink-muted">
          انگیزش بدون فشار
        </p>
        <p className="text-center text-xs text-ink-subtle leading-relaxed">
          بعضی هفته‌ها بالا هستن، بعضی پایین.
          <br />
          هر دو طبیعی‌ان.
        </p>
      </main>

      <BottomNav active="progress" />
    </div>
  );
}
