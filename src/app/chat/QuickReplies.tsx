"use client";

const PILLS = [
  "حالم خیلی خسته‌ست",
  "پرخوردم، چیکار کنم؟",
  "انگیزه ندارم",
];

interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export default function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-6 pb-3">
      {PILLS.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => onSelect(text)}
          disabled={disabled}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-muted transition hover:bg-surface-soft disabled:opacity-50"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
