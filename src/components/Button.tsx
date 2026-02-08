"use client";

import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white border-0 hover:opacity-95 active:scale-[0.98] transition duration-[var(--duration-normal)]",
  secondary:
    "bg-transparent text-ink-muted border border-border hover:bg-surface-soft transition",
  disabled:
    "bg-disabled text-disabled-text border-0 cursor-not-allowed",
};

export default function Button({
  variant = "primary",
  fullWidth = true,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const effectiveVariant = disabled ? "disabled" : variant;
  const base =
    "rounded-lg py-3 font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${base} ${variantStyles[effectiveVariant]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ transitionDuration: "var(--duration-normal)" }}
      {...props}
    >
      {children}
    </button>
  );
}
