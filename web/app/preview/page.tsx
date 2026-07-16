"use client";

import { useEffect } from "react";
import { useDesignStore } from "@/lib/store";
import { PreviewFrame } from "@/components/preview/preview-frame";
import { SiteButton } from "@/components/site/site-button";
import { PREVIEW_CHANNEL_NAME, type PreviewMessage } from "@/lib/preview-sync";

function returnToBuilderTab() {
  const opener = window.opener as Window | null;
  if (opener && !opener.closed) {
    try {
      opener.focus();
    } catch {
      // Cross-origin or restricted — still try to close this tab.
    }
    window.close();
  }

  // Fallback when this tab wasn't opened via window.open, or close was blocked.
  window.setTimeout(() => {
    if (!window.closed) {
      window.location.href = "/builder";
    }
  }, 50);
}

export default function PreviewPage() {
  const config = useDesignStore((s) => s.config);
  const setConfig = useDesignStore((s) => s.setConfig);

  useEffect(() => {
    window.localStorage.removeItem("design-md-builder");
    if (!("BroadcastChannel" in window)) return;

    const channel = new BroadcastChannel(PREVIEW_CHANNEL_NAME);
    channel.onmessage = (event: MessageEvent<PreviewMessage>) => {
      if (event.data?.type === "config") setConfig(event.data.config);
    };
    const request: PreviewMessage = { type: "request-config" };
    channel.postMessage(request);

    return () => channel.close();
  }, [setConfig]);

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ background: "var(--color-canvas-soft, #f4f4f4)" }}
    >
      <header
        className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6 ds-divider"
        style={{ background: "var(--color-canvas)" }}
      >
        <div>
          <p className="ds-body-md font-semibold leading-none">Live preview</p>
          <p className="mt-1 text-xs ds-text-muted">
            Updates when you change the builder in another tab
          </p>
        </div>
        <SiteButton variant="secondary" onClick={returnToBuilderTab}>
          Back to builder
        </SiteButton>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6">
        <PreviewFrame config={config} showHeader />
      </main>
    </div>
  );
}
