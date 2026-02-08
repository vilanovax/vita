"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ONBOARDING_QUESTIONS,
  ONBOARDING_SUMMARY,
  SEGMENT_LABELS,
} from "@/lib/onboarding-questions";
import Button from "./Button";
import Card from "./Card";
import ProgressIndicator from "./ProgressIndicator";
import AgeStep from "@/app/onboarding/steps/AgeStep";
import HeightStep from "@/app/onboarding/steps/HeightStep";
import WeightStep from "@/app/onboarding/steps/WeightStep";
import ActivityStep from "@/app/onboarding/steps/ActivityStep";

const TOTAL_QUESTIONS = ONBOARDING_QUESTIONS.length;

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isSummaryStep = step === TOTAL_QUESTIONS;
  const current = isSummaryStep ? null : ONBOARDING_QUESTIONS[step];
  const progress = isSummaryStep
    ? 100
    : ((step + 1) / TOTAL_QUESTIONS) * 100;

  const handleSelect = (value: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = () => {
    if (step < TOTAL_QUESTIONS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const hasValueForInput =
    current?.type === "input" && (answers[current.id]?.trim().length ?? 0) > 0;
  const canProceed =
    !current ||
    (current.type === "single" && !!answers[current.id]) ||
    (current.type === "input" && (current.optional || hasValueForInput));

  // ——— اسلاید پایانی (بدون سؤال) ———
  if (isSummaryStep) {
    return (
      <div className="flex min-h-screen flex-col bg-surface-secondary">
        <div className="fixed left-0 right-0 top-0 h-1 bg-primary" />
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
          <p className="whitespace-pre-line text-xl leading-relaxed text-ink">
            {ONBOARDING_SUMMARY.message}
          </p>
          <Link
            href="/today"
            className="mt-10 w-full max-w-sm rounded-lg bg-primary py-4 text-center font-medium text-white shadow-md transition hover:opacity-95 active:scale-[0.98]"
          >
            {ONBOARDING_SUMMARY.cta}
          </Link>
        </div>
      </div>
    );
  }

  // ——— رندر استپ‌های ۱–۴ با کامپوننت اختصاصی ———
  const renderStepContent = () => {
    if (!current) return null;

    if (current.id === "age") {
      return (
        <AgeStep
          value={answers.age ?? ""}
          onChange={(v) => handleSelect(v)}
        />
      );
    }
    if (current.id === "height") {
      return (
        <HeightStep
          value={answers.height ?? ""}
          onChange={(v) => handleSelect(v)}
        />
      );
    }
    if (current.id === "weight") {
      return (
        <WeightStep
          value={answers.weight ?? ""}
          onChange={(v) => handleSelect(v)}
          onSkip={handleNext}
        />
      );
    }
    if (current.id === "activity_level") {
      return (
        <ActivityStep
          value={answers.activity_level ?? ""}
          onChange={(v) => handleSelect(v)}
        />
      );
    }

    // استپ‌های ۵–۱۰: سؤال عمومی (تک‌انتخابی یا اینپوت)
    return (
      <>
        <h2 className="mb-2 text-xl font-semibold text-ink sm:text-2xl">
          {current.question}
        </h2>
        {current.subtext && (
          <p className="mb-6 text-sm text-ink-muted">{current.subtext}</p>
        )}
        {!current.subtext && <div className="mb-8" />}

        {current.type === "single" &&
          current.options?.map((opt) => (
            <Card
              key={opt.value}
              selected={answers[current.id] === opt.value}
              onClick={() => handleSelect(opt.value)}
              className="mb-3"
            >
              <span className="font-medium text-ink">{opt.label}</span>
              {answers[current.id] === opt.value && (
                <span className="text-primary">✓</span>
              )}
            </Card>
          ))}

        {current.type === "input" && (
          <div className="space-y-3">
            <input
              type="number"
              inputMode="decimal"
              placeholder={current.placeholder}
              value={answers[current.id] || ""}
              onChange={(e) => handleSelect(e.target.value)}
              className="w-full rounded-lg border-2 border-border bg-surface px-5 py-4 text-lg outline-none focus:border-primary"
            />
            {current.unit && (
              <p className="text-sm text-ink-muted">{current.unit}</p>
            )}
            {current.optional && (
              <Button variant="secondary" onClick={handleNext}>
                رد کردن
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary">
      <ProgressIndicator
        current={step + 1}
        total={TOTAL_QUESTIONS}
        percent={progress}
        showBar
      />

      <div className="flex flex-1 flex-col px-6 pt-12 pb-24">
        {current && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            {SEGMENT_LABELS[current.segment]}
          </span>
        )}

        {renderStepContent()}

        <div className="mt-auto mt-8 flex gap-3">
          {step > 0 ? (
            <Button variant="secondary" fullWidth={false} onClick={handleBack}>
              قبلی
            </Button>
          ) : (
            <span />
          )}
          {canProceed ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 rounded-lg bg-primary py-3 font-medium text-white transition hover:opacity-95"
            >
              بعدی
            </button>
          ) : (
            <Button variant="disabled" disabled className="flex-1">
              بعدی
            </Button>
          )}
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-ink-subtle">
        {step + 1} از {TOTAL_QUESTIONS}
      </p>
    </div>
  );
}
