"use client";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  /** درصد برای نوار (۰–۱۰۰) */
  percent?: number;
  showBar?: boolean;
}

/** نوار پیشرفت (و اختیاری متن «۱ از ۱۰») — بدون حالت تهاجمی */
export default function ProgressIndicator({
  current,
  total,
  percent,
  showBar = true,
}: ProgressIndicatorProps) {
  const value = percent ?? (total > 0 ? (current / total) * 100 : 0);

  return (
    <div className="w-full">
      {showBar && (
        <div className="fixed left-0 right-0 top-0 h-1 bg-border">
          <div
            className="h-full bg-primary transition-all duration-[var(--duration-normal)]"
            style={{ width: `${Math.min(100, value)}%` }}
          />
        </div>
      )}
    </div>
  );
}
