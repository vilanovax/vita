"use client";

interface FieldProps {
  label: string;
  htmlFor?: string;
  counter?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, counter, children }: FieldProps) {
  return (
    <div className="ui-field">
      {/* The counter sits in the row but outside <label>, so it isn't read as
          part of the field's accessible name. */}
      <div className="ui-label-row">
        <label className="ui-label" htmlFor={htmlFor}>{label}</label>
        {counter && <span className="ui-counter" aria-hidden>{counter}</span>}
      </div>
      {children}
    </div>
  );
}
