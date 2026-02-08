"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  error?: string;
}

/** اینپوت با ناحیه لمس بزرگ، حاشیه سبز در focus، بدون سایه شدید */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-ink-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border-2 border-border bg-surface px-5 py-4 text-lg outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-primary ${
            error ? "border-error" : ""
          } ${className}`}
          style={{ minHeight: "var(--input-height, 56px)" }}
          {...props}
        />
        {unit && <p className="text-sm text-ink-muted">{unit}</p>}
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
