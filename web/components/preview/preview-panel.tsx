"use client";

import { useEffect } from "react";
import type { DesignConfig } from "@/lib/schema";
import { SiteButton } from "@/components/site/site-button";
import { PreviewFrame } from "./preview-frame";
import { PreviewScale } from "./preview-scale";

/** Viewport-relative so the clipped inner panel stays the same size while the aside width animates. */
export const PREVIEW_PANEL_WIDTH = "min(560px, 50vw)";

const PREVIEW_TAB_NAME = "design-md-preview";

export function openPreviewInNewTab() {
  // Keep opener so the preview tab can focus the builder and close itself.
  const tab = window.open("/preview", PREVIEW_TAB_NAME);
  tab?.focus();
}

interface PreviewPanelProps {
  config: DesignConfig;
  open: boolean;
  onClose: () => void;
}

export function PreviewPanel({ config, open, onClose }: PreviewPanelProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <aside
      className="relative h-full shrink-0 overflow-hidden border-l ds-divider"
      style={{
        width: open ? PREVIEW_PANEL_WIDTH : 0,
        background: "var(--color-canvas)",
        transition: "width 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "width",
      }}
      aria-hidden={!open}
    >
      <div
        className="flex h-full flex-col"
        style={{
          width: PREVIEW_PANEL_WIDTH,
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(12px)",
          transition:
            "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: open ? "60ms" : "0ms",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 ds-divider">
          <h2 id="preview-title" className="ds-body-md font-semibold leading-none">
            Live preview
          </h2>
          <div className="flex shrink-0 items-center gap-1">
            <SiteButton variant="ghost" onClick={openPreviewInNewTab}>
              Open tab
            </SiteButton>
            <SiteButton variant="ghost" onClick={onClose}>
              Close
            </SiteButton>
          </div>
        </div>
        <div
          className="preview-panel-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4"
          role="region"
          aria-labelledby="preview-title"
        >
          <PreviewScale
            watchKey={`${config.siteType}-${config.uiStyle}-${config.displayFont}-${config.typeScalePreset}-${config.tagline}-${config.name}`}
          >
            <PreviewFrame config={config} showHeader={false} />
          </PreviewScale>
        </div>
      </div>
    </aside>
  );
}
