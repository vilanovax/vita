"use client";

import { type ButtonHTMLAttributes } from "react";

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

/** کارت انتخاب — حالت عادی: border؛ انتخاب‌شده: bg primarySoft و border primary */
export default function Card({
  selected = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-right transition-all duration-[var(--duration-normal)] ${
        selected
          ? "border-primary bg-primary-soft"
          : "border-border bg-surface hover:border-ink-subtle"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
