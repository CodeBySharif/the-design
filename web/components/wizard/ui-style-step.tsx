"use client";

import type { DesignConfig } from "@/lib/schema";
import { UI_STYLE_OPTIONS } from "@/lib/ui-styles";

interface UiStyleStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function UiStyleStep({ config, onChange }: UiStyleStepProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-xl">
        <p className="ds-overline">Step 2</p>
        <h2 className="ds-headline mt-1">Pick a UI style</h2>
        <p className="ds-body-sm ds-text-muted mt-2">
          Choose the surface language — borders, shadows, and depth. Open Preview to see it on your
          selected site type.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {UI_STYLE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange({ uiStyle: option.id })}
            className={`rounded-xl border p-4 text-left transition-colors ${
              config.uiStyle === option.id
                ? "ds-tag-active border-transparent"
                : "ds-tag-inactive"
            }`}
          >
            <p className="font-semibold">{option.label}</p>
            <p className="mt-1 text-xs opacity-80">{option.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
