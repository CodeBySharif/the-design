"use client";

import { useEffect } from "react";
import type { DesignConfig } from "@/lib/schema";
import { SiteButton } from "@/components/site/site-button";
import { PreviewFrame } from "./preview-frame";

interface PreviewModalProps {
  config: DesignConfig;
  open: boolean;
  onClose: () => void;
}

export function PreviewModal({ config, open, onClose }: PreviewModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border ds-divider"
        style={{ background: "var(--color-canvas)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-3 ds-divider">
          <h2 id="preview-title" className="ds-body-md font-semibold">
            Live preview
          </h2>
          <SiteButton variant="ghost" onClick={onClose}>
            Close
          </SiteButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <PreviewFrame config={config} showHeader={false} />
        </div>
      </div>
    </div>
  );
}
