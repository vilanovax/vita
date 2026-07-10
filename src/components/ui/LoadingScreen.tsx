"use client";

/**
 * Full-viewport loading state. Renders a <main> landmark by default (it stands
 * alone as the whole route while a page loads); pass `as="div"` when it is
 * dropped inside a page that already owns the <main> landmark, to avoid a
 * second one.
 */
export function LoadingScreen({
  message = "در حال بارگذاری…",
  as: Tag = "main",
}: {
  message?: string;
  as?: "main" | "div";
}) {
  return (
    <Tag className="lobby-loading" role="status" aria-live="polite" aria-busy>
      <div className="lobby-spinner" aria-hidden />
      <span>{message}</span>
    </Tag>
  );
}
