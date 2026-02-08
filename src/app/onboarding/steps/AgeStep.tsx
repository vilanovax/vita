"use client";

import Card from "@/components/Card";

const AGE_OPTIONS = [
  { value: "18-24", label: "۱۸–۲۴" },
  { value: "25-34", label: "۲۵–۳۴" },
  { value: "35-44", label: "۳۵–۴۴" },
  { value: "45-54", label: "۴۵–۵۴" },
  { value: "55+", label: "۵۵ به بالا" },
];

interface AgeStepProps {
  value: string;
  onChange: (value: string) => void;
}

/** استپ ۱ — بازه سنی. سؤال پرامپت: حدوداً توی کدوم بازه‌ی سنی هستی؟ */
export default function AgeStep({ value, onChange }: AgeStepProps) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold text-ink sm:text-2xl">
        حدوداً توی کدوم بازه‌ی سنی هستی؟
      </h2>
      <div className="mt-6 space-y-3">
        {AGE_OPTIONS.map((opt) => (
          <Card
            key={opt.value}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            className="mb-3"
          >
            <span className="font-medium text-ink">{opt.label}</span>
            {value === opt.value && <span className="text-primary">✓</span>}
          </Card>
        ))}
      </div>
    </>
  );
}
