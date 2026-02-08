"use client";

import Card from "@/components/Card";

const ACTIVITY_OPTIONS = [
  { value: "none", label: "تقریباً هیچ" },
  { value: "sometimes", label: "گاهی پیاده‌روی یا حرکت‌های ساده" },
  { value: "regular", label: "هفته‌ای ۲–۳ بار" },
  { value: "active", label: "تقریباً منظم ورزش می‌کنم" },
];

interface ActivityStepProps {
  value: string;
  onChange: (value: string) => void;
}

/** استپ ۴ — سطح فعالیت. سؤال پرامپت: این روزها بدنت چقدر فرصت حرکت داره؟ */
export default function ActivityStep({ value, onChange }: ActivityStepProps) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold text-ink sm:text-2xl">
        این روزها بدنت چقدر فرصت حرکت داره؟
      </h2>
      <div className="mt-6 space-y-3">
        {ACTIVITY_OPTIONS.map((opt) => (
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
