"use client";

import { useState } from "react";
import type { DesignConfig } from "@/lib/schema";
import { SiteButton } from "@/components/site/site-button";
import { matchThemePreset } from "@/lib/theme-presets";

interface ReviewExportStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
  onExport: () => Promise<void>;
  onCopy: () => Promise<void>;
  lintErrors: string[];
  exporting: boolean;
}

export function ReviewExportStep({
  config,
  onChange,
  onExport,
  onCopy,
  lintErrors,
  exporting,
}: ReviewExportStepProps) {
  const [copied, setCopied] = useState(false);
  const theme = matchThemePreset(config);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="ds-headline">Export</h2>
        <p className="ds-body-sm ds-text-muted mt-1">
          Drop the file into your next project and tell Cursor to follow DESIGN.md.
        </p>
      </div>

      <div className="ds-surface-soft space-y-4 rounded-lg p-5">
        <h3 className="ds-headline text-lg">{config.name || "Untitled project"}</h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="ds-caption">Theme</dt>
            <dd className="capitalize">{theme ?? config.moodTags.join(", ")}</dd>
          </div>
          <div>
            <dt className="ds-caption">Primary</dt>
            <dd className="font-mono">{config.colors.primary}</dd>
          </div>
          <div>
            <dt className="ds-caption">Fonts</dt>
            <dd>
              {config.displayFont} / {config.bodyFont}
            </dd>
          </div>
          <div>
            <dt className="ds-caption">Type scale</dt>
            <dd className="capitalize">{config.typeScalePreset}</dd>
          </div>
        </dl>
        <div className="flex gap-2">
          <span
            className="h-8 flex-1 rounded-md border"
            style={{ background: config.colors.canvas }}
          />
          <span
            className="h-8 flex-1 rounded-md border"
            style={{ background: config.colors.canvasSoft }}
          />
          <span
            className="h-8 flex-1 rounded-md border"
            style={{ background: config.colors.primary }}
          />
          <span
            className="h-8 flex-1 rounded-md border"
            style={{ background: config.colors.ink }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="ds-label" htmlFor="export-filename">
          Filename
        </label>
        <input
          id="export-filename"
          type="text"
          value={config.exportFilename}
          onChange={(e) => onChange({ exportFilename: e.target.value })}
          className="ds-input max-w-sm font-mono"
        />
      </div>

      {lintErrors.length > 0 && (
        <div
          className="rounded-lg border px-4 py-3"
          style={{
            borderColor: "var(--color-error)",
            background: "color-mix(in srgb, var(--color-error) 10%, transparent)",
          }}
        >
          <p className="ds-body-sm font-semibold">Fix these before exporting</p>
          <ul className="mt-2 list-inside list-disc ds-body-sm ds-text-muted">
            {lintErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <SiteButton variant="primary" onClick={onExport} disabled={exporting}>
          {exporting ? "Validating…" : "Download DESIGN.md"}
        </SiteButton>
        <SiteButton variant="secondary" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy to clipboard"}
        </SiteButton>
      </div>
    </div>
  );
}
