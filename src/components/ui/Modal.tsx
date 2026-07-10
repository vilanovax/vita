"use client";
import { useEffect, useRef } from "react";
import { useModalLock } from "./useModalLock";

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  titleId?: string;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ title, subtitle, onClose, children, titleId = "modal-title", className = "" }: ModalProps) {
  useModalLock(onClose);
  const cardRef = useRef<HTMLDivElement>(null);
  const subtitleId = subtitle ? `${titleId}-subtitle` : undefined;

  // Move focus into the dialog on open and keep Tab cycling within it, so a
  // keyboard user can't tab out into the (inert) page behind the backdrop.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const first = card.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? card).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) { e.preventDefault(); return; }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && active === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    card.addEventListener("keydown", onKey);
    return () => {
      card.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={cardRef}
        className={`modal-card panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h2 id={titleId} className="modal-title">{title}</h2>
            {subtitle && <p id={subtitleId} className="modal-subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="بستن">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
