"use client";

import Link from "next/link";

export default function WelcomeScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-surface-secondary px-6 pb-12 pt-20">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary-soft text-3xl">
          🌱
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            VitaLife
          </h1>
          <p className="max-w-xs text-base text-ink-muted sm:text-lg">
            مربی هوشمند زندگی که هر روز فقط چند قدم ساده و قابل انجام پیشنهاد می‌ده
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-sm text-ink-muted">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            بدون قضاوت، بدون فشار
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            عادت‌ها و قدم‌های کوچک
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            سازگار با روزهای واقعی
          </li>
        </ul>
      </div>
      <Link
        href="/onboarding"
        className="w-full max-w-sm rounded-lg bg-primary py-4 text-center font-medium text-white shadow-md transition hover:opacity-95 active:scale-[0.98]"
      >
        شروع کن
      </Link>
    </div>
  );
}
