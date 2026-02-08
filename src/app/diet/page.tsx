"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DIET_ENTRY,
  DIET_STEPS,
  DIET_COMPLETION,
  type DietContext,
  type DietEnergy,
  type DietStress,
  type DietGoal,
  type DietChallenge,
  type DietStyle,
  type DietMeals,
} from "@/lib/diet-questions";
import { useVitaLife } from "@/contexts/VitaLifeContext";
import { generateDietCoachOutput } from "@/lib/diet-coach-prompt";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProgressIndicator from "@/components/ProgressIndicator";

const TOTAL_STEPS = DIET_STEPS.length;

export default function DietPage() {
  const { setDietContext } = useVitaLife();
  const [stage, setStage] = useState<"entry" | "steps" | "done">("entry");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const currentStep = stage === "steps" ? DIET_STEPS[stepIndex] : null;
  const progress = stage === "steps" ? ((stepIndex + 1) / TOTAL_STEPS) * 100 : 0;

  const handleSingleSelect = useCallback((value: string) => {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  }, [currentStep]);

  const handleMultiToggle = useCallback((value: string) => {
    if (!currentStep || currentStep.id !== "sensitivities") return;
    setAnswers((prev) => {
      const arr = (prev.sensitivities as string[] | undefined) ?? [];
      if (value === "none") return { ...prev, sensitivities: ["none"] };
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr.filter((v) => v !== "none"), value];
      return { ...prev, sensitivities: next };
    });
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (stage === "entry") {
      setStage("steps");
      return;
    }
    if (stage === "steps") {
      if (stepIndex < TOTAL_STEPS - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        const ctx = buildDietContextFromAnswers();
        setDietContext(ctx);
        setStage("done");
      }
    }
  }, [stage, stepIndex, setDietContext]);

  const handleSkip = useCallback(() => {
    if (currentStep?.optional) {
      setAnswers((prev) => ({ ...prev, [currentStep.id]: [] }));
      handleNext();
    }
  }, [currentStep, handleNext]);

  const handleBack = useCallback(() => {
    if (stage === "steps" && stepIndex > 0) setStepIndex(stepIndex - 1);
  }, [stage, stepIndex]);

  function buildDietContextFromAnswers(): DietContext {
    return {
      energy: (answers.energy as DietEnergy) ?? "medium",
      stress: (answers.stress as DietStress) ?? "medium",
      goal: (answers.goal as DietGoal) ?? "light",
      challenge: (answers.challenge as DietChallenge) ?? "none",
      style: (answers.style as DietStyle) ?? "flexible",
      meals: (answers.meals as DietMeals) ?? "3",
      sensitivities: Array.isArray(answers.sensitivities) ? answers.sensitivities.filter((s) => s !== "none") : [],
    };
  }

  const canProceed =
    !currentStep ||
    (currentStep.type === "single" && !!answers[currentStep.id]) ||
    (currentStep.type === "multiple" && (currentStep.optional === true || ((answers[currentStep.id] as string[])?.length ?? 0) > 0));

  // ─── Entry ───
  if (stage === "entry") {
    return (
      <div className="flex min-h-screen flex-col bg-surface-secondary" dir="rtl">
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">
            {DIET_ENTRY.title}
          </h1>
          <p className="mt-4 whitespace-pre-line text-sm text-ink-muted">
            {DIET_ENTRY.subtitle}
          </p>
          <Button className="mt-10 max-w-sm" onClick={handleNext}>
            {DIET_ENTRY.cta}
          </Button>
        </div>
      </div>
    );
  }

  // ─── Completion ───
  if (stage === "done") {
    return (
      <div className="flex min-h-screen flex-col bg-surface-secondary" dir="rtl">
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
          <p className="whitespace-pre-line text-lg leading-relaxed text-ink">
            {DIET_COMPLETION.message}
          </p>
          <Link href="/today" className="mt-10 w-full max-w-sm">
            <Button>{DIET_COMPLETION.cta}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ─── Steps ───
  if (!currentStep) return null;

  const isMulti = currentStep.type === "multiple";
  const selectedMulti = (answers[currentStep.id] as string[] | undefined) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary pb-12" dir="rtl">
      <ProgressIndicator current={stepIndex + 1} total={TOTAL_STEPS} percent={progress} />

      <div className="flex flex-1 flex-col px-6 pt-8">
        <h2 className="mb-2 text-xl font-semibold text-ink">
          {currentStep.question}
        </h2>
        {currentStep.subtext && (
          <p className="mb-6 text-sm text-ink-muted">{currentStep.subtext}</p>
        )}
        {!currentStep.subtext && <div className="mb-6" />}

        {currentStep.type === "single" &&
          currentStep.options?.map((opt) => (
            <Card
              key={opt.value}
              selected={answers[currentStep.id] === opt.value}
              className="mb-3"
              onClick={() => handleSingleSelect(opt.value)}
            >
              <span className="text-ink">{opt.label}</span>
            </Card>
          ))}

        {isMulti &&
          currentStep.options?.map((opt) => (
            <Card
              key={opt.value}
              selected={selectedMulti.includes(opt.value)}
              className="mb-3"
              onClick={() => handleMultiToggle(opt.value)}
            >
              <span className="text-ink">{opt.label}</span>
            </Card>
          ))}

        {currentStep.optional && (
          <button
            type="button"
            onClick={handleSkip}
            className="mt-4 text-sm text-ink-muted underline"
          >
            رد کردن
          </button>
        )}

        <div className="mt-10 flex gap-3">
          {stepIndex > 0 && (
            <Button variant="secondary" fullWidth onClick={handleBack}>
              قبلی
            </Button>
          )}
          <Button
            fullWidth
            disabled={!canProceed}
            onClick={handleNext}
          >
            بعدی
          </Button>
        </div>
      </div>
    </div>
  );
}
