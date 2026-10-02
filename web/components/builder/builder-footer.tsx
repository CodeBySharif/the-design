"use client";

import type { ReactNode } from "react";

interface BuilderFooterProps {
  left?: ReactNode;
  hint?: string;
  back: ReactNode;
  forward?: ReactNode;
}

export function BuilderFooter({ left, hint, back, forward }: BuilderFooterProps) {
  return (
    <footer
      className="shrink-0 border-t ds-divider"
      style={{
        background: "var(--color-canvas)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {hint && (
        <p
          className="ds-shell pt-2 text-right text-xs"
          style={{ color: "var(--color-error)" }}
        >
          {hint}
        </p>
      )}
      <div className="ds-shell flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{left}</div>
        <div className="flex shrink-0 items-center gap-2">
          {back}
          {forward}
        </div>
      </div>
    </footer>
  );
}
