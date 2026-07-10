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

const FOCUSABLE = "a[href], button, textarea, input, select, [tabindex]";

/** Elements inside `root` that are actually reachable by Tab, in DOM order.
 *  We read the resolved `tabIndex` property (not the attribute selector) so any
 *  negative value — `-1`, `-2`, … — is excluded, and disabled/hidden controls
 *  are dropped. Our dialogs don't use positive tabindex or radio groups, so DOM
 *  order matches the browser's tab order here. */
function tabbable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) =>
      el.tabIndex >= 0 &&
      !el.hasAttribute("disabled") &&
      (el.offsetParent !== null || el === document.activeElement),
  );
}

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
    (tabbable(card)[0] ?? card).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      // Take over Tab entirely and move focus ourselves, so it can never land on
      // a background control — cheaper and more reliable than only intercepting
      // at the computed first/last boundary.
      const items = tabbable(card);
      e.preventDefault();
      if (items.length === 0) return;
      const idx = items.indexOf(document.activeElement as HTMLElement);
      const delta = e.shiftKey ? -1 : 1;
      const next = (idx + delta + items.length) % items.length;
      items[idx === -1 && e.shiftKey ? items.length - 1 : next].focus();
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
