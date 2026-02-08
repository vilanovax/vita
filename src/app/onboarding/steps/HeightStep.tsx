"use client";

import Input from "@/components/Input";

interface HeightStepProps {
  value: string;
  onChange: (value: string) => void;
}

/** استپ ۲ — قد. سؤال: قدت حدوداً چند سانتی‌متره؟ ساب‌متن: فقط برای تنظیم پیشنهادها */
export default function HeightStep({ value, onChange }: HeightStepProps) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold text-ink sm:text-2xl">
        قدت حدوداً چند سانتی‌متره؟
      </h2>
      <p className="mb-6 text-sm text-ink-muted">
        فقط برای تنظیم پیشنهادها
      </p>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="مثلاً ۱۷۰ (تقریبی)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        unit="سانتی‌متر"
      />
    </>
  );
}
