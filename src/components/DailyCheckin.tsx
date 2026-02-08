"use client";

import { useState } from "react";
import Link from "next/link";

const MOOD_OPTIONS = [
  { value: "1", emoji: "😫", label: "خسته" },
  { value: "2", emoji: "😐", label: "معمولی" },
  { value: "3", emoji: "🙂", label: "خوب" },
  { value: "4", emoji: "😊", label: "عالی" },
];

const ENERGY_OPTIONS = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "بالا" },
];

export default function DailyCheckin() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [sleep, setSleep] = useState("");
  const [food, setFood] = useState("");
  const [movement, setMovement] = useState("");

  const steps = ["حال", "انرژی", "خواب", "غذا", "حرکت"];
  const progress = ((step + 1) / 5) * 100;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const values = [mood, energy, sleep, food, movement];
  const canProceed = !!values[step];

  const isLast = step === 4;

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary">
      <div className="fixed left-0 right-0 top-0 h-1 bg-border">
        <div
          className="h-full bg-primary transition-all duration-[var(--duration-normal)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="flex items-center gap-4 border-b border-border bg-surface px-6 py-4">
        <Link href="/today" className="text-ink-muted">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-ink">چک‌این روزانه</h1>
          <p className="text-sm text-ink-muted">زیر ۱ دقیقه</p>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-6 pt-8 pb-24">
        <h2 className="mb-6 text-xl font-semibold text-ink">
          {step === 0 && "حالت چطوره؟"}
          {step === 1 && "انرژی امروزت چقدره؟"}
          {step === 2 && "دیشب چقدر خوابیدی؟"}
          {step === 3 && "غذای امروز چطور بوده؟"}
          {step === 4 && "چقدر تحرک داشتی؟"}
        </h2>

        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {MOOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMood(opt.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  mood === opt.value
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface"
                }`}
              >
                <span className="text-3xl">{opt.emoji}</span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            {ENERGY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEnergy(opt.value)}
                className={`rounded-xl border-2 px-5 py-4 text-right font-medium transition ${
                  energy === opt.value
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            {["کم‌تر از ۵ ساعت", "۵–۶ ساعت", "۶–۷ ساعت", "۷–۸ ساعت", "بیشتر از ۸"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => setSleep(opt)}
                  className={`rounded-xl border-2 px-5 py-4 text-right transition ${
                    sleep === opt ? "border-primary bg-primary-soft" : "border-border bg-surface"
                  }`}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3">
            {["فقط یکی دو وعده", "معمولی", "خوب و منظم", "پرخوردم"].map((opt) => (
              <button
                key={opt}
                onClick={() => setFood(opt)}
                className={`rounded-xl border-2 px-5 py-4 text-right transition ${
                  food === opt ? "border-primary bg-primary-soft" : "border-border bg-surface"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-3">
            {["تقریباً هیچی", "کمی راه رفتم", "پیاده‌روی یا ورزش سبک", "ورزش منظم"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => setMovement(opt)}
                  className={`rounded-xl border-2 px-5 py-4 text-right transition ${
                    movement === opt
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-surface"
                  }`}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-8">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="rounded-lg border border-border px-6 py-3 font-medium text-ink-muted"
            >
              قبلی
            </button>
          )}
          {canProceed && (
            isLast ? (
              <Link
                href="/today"
                className="flex-1 rounded-lg bg-primary py-3 text-center font-medium text-white"
              >
                ذخیره و تمام
              </Link>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 rounded-lg bg-primary py-3 font-medium text-white"
              >
                بعدی
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
}
