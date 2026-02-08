"use client";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  isSending?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  isSending,
}: ChatInputProps) {
  const canSend = value.trim().length > 0 && !isSending && !disabled;

  return (
    <div className="flex gap-2 border-t border-border bg-surface/95 px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] backdrop-blur safe-bottom">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (canSend) onSend();
          }
        }}
        placeholder="بنویس..."
        disabled={disabled || isSending}
        className="flex-1 rounded-lg border border-border bg-surface-soft px-4 py-3 text-ink outline-none transition-[border-color] focus:border-primary disabled:opacity-60"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:opacity-95 disabled:bg-disabled disabled:text-disabled-text"
      >
        {isSending ? "..." : "ارسال"}
      </button>
    </div>
  );
}
