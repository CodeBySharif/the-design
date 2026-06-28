"use client";

import type { DesignConfig } from "@/lib/schema";
import { ThemePreviewMini } from "@/components/theme/theme-preview-mini";
import { themePresetMatchesConfig } from "@/lib/theme-generate";
import { useDesignStore } from "@/lib/store";
import { THEME_PRESETS, applyThemePreset, type ThemePreset } from "@/lib/theme-presets";

interface MoodStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function MoodStep({ config, onChange }: MoodStepProps) {
  const themeBatch = useDesignStore((s) => s.themeBatch);
  const seedColors = useDesignStore((s) => s.seedColors);
  const templates = themeBatch ?? THEME_PRESETS;
  const isGenerated = themeBatch !== null;

  const selectTheme = (preset: ThemePreset) => {
    onChange(applyThemePreset(preset, config));
  };

  return (
    <div className="space-y-8">
      <div className="max-w-xl">
        <p className="ds-overline">Step 1</p>
        <h2 className="ds-headline mt-1">Pick a theme</h2>
        <p className="ds-body-sm ds-text-muted mt-2">
          {seedColors.length > 0
            ? "Templates below are built from your colors. Use Generate in the footer for a fresh batch."
            : isGenerated
              ? "Generated mix-and-match templates — Randomize for another set."
              : "Choose a starting template, or add your colors in the footer and hit Generate."}
        </p>
      </div>


      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {templates.map((preset) => {
          const selected = themePresetMatchesConfig(preset, config);
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectTheme(preset)}
              className={`ds-template-card ${selected ? "ds-template-card-selected" : ""}`}
            >
              <ThemePreviewMini preset={preset} selected={selected} compact />
              <p className="ds-body-sm mt-2 font-semibold leading-tight">{preset.label}</p>
              <p className="ds-caption mt-0.5 line-clamp-2">{preset.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
