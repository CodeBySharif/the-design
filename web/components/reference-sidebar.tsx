"use client";

import { useEffect, useState } from "react";

interface ReferenceSidebarProps {
  step: number;
}

export function ReferenceSidebar({ step }: ReferenceSidebarProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{
    source: string;
    section: string;
    excerpt: string;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/reference?step=${step}`)
      .then((r) => r.json())
      .then((json) => setData(json.excerpt ?? null))
      .catch(() => setData(null));
  }, [step]);

  if (!data) return null;

  return (
    <div className="ds-surface-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left ds-body-sm"
      >
        <span>See example: {data.section}</span>
        <span className="ds-text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t ds-divider px-4 py-3">
          <p className="ds-caption mb-2">From reference: {data.source}</p>
          <pre className="ds-body-sm ds-text-muted whitespace-pre-wrap">{data.excerpt}</pre>
        </div>
      )}
    </div>
  );
}
