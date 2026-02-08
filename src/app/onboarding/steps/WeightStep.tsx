"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";

interface WeightStepProps {
  value: string;
  onChange: (value: string) => void;
  onSkip: () => void;
}

/** استپ ۳ — وزن. اختیاری با دکمه «رد کردن» */
export default function WeightStep({ value, onChange, onSkip }: WeightStepProps) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold text-ink sm:text-2xl">
        وزنت حدوداً چند کیلوگرمه؟
      </h2>
      <p className="mb-6 text-sm text-ink-muted">
        اگه دوست نداری، می‌تونی ردش کنی
      </p>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="مثلاً ۷۰"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        unit="کیلوگرم"
      />
      <Button
        variant="secondary"
        className="mt-3"
        onClick={onSkip}
      >
        رد کردن
      </Button>
    </>
  );
}
