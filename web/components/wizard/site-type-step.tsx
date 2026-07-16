"use client";

import type { DesignConfig } from "@/lib/schema";
import { SITE_TYPE_OPTIONS } from "@/lib/site-types";

interface SiteTypeStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function SiteTypeStep({ config, onChange }: SiteTypeStepProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-xl">
        <p className="ds-overline">Step 1</p>
        <h2 className="ds-headline mt-1">What are you building?</h2>
        <p className="ds-body-sm ds-text-muted mt-2">
          Choose a site type. This sets the product context in DESIGN.md and shapes the live
          preview layout.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_TYPE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange({ siteType: option.id })}
            className={`rounded-xl border p-4 text-left transition-colors ${
              config.siteType === option.id
                ? "ds-tag-active border-transparent"
                : "ds-tag-inactive"
            }`}
          >
            <p className="font-semibold">{option.label}</p>
            <p className="mt-1 text-xs opacity-80">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
