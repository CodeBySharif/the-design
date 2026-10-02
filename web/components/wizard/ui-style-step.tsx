"use client";

import type { DesignConfig } from "@/lib/schema";
import { UI_STYLE_OPTIONS } from "@/lib/ui-styles";
import { StepIntro } from "@/components/wizard/step-intro";

interface UiStyleStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function UiStyleStep({ config, onChange }: UiStyleStepProps) {
  return (
    <div className="ds-step-stack">
      <StepIntro
        overline="Style"
        title="Pick a UI style"
        description="Choose the surface language: borders, shadows, and depth. This style applies across the whole product."
      />

      <div className="ds-option-grid">
        {UI_STYLE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange({ uiStyle: option.id })}
            className={`ds-option-tile ${
              config.uiStyle === option.id ? "ds-option-tile-active" : ""
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
