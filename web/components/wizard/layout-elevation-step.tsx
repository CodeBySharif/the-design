"use client";

import type { DesignConfig } from "@/lib/schema";
import { UI_STYLE_OPTIONS } from "@/lib/ui-styles";

interface LayoutElevationStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

const LAYOUT_PATTERNS = [
  { id: "hero", label: "Hero section", desc: "Full-width headline band with CTA" },
  { id: "bento", label: "Bento grid", desc: "Asymmetric card grid layout" },
  { id: "sidebar", label: "Sidebar layout", desc: "Nav + content two-column shell" },
  { id: "split", label: "Split hero", desc: "Side-by-side copy and visual" },
] as const;

export function LayoutElevationStep({ config, onChange }: LayoutElevationStepProps) {
  const updateLayout = (key: keyof DesignConfig["layout"], value: string) => {
    onChange({ layout: { ...config.layout, [key]: value } });
  };

  const togglePattern = (key: keyof DesignConfig["layoutPatterns"]) => {
    onChange({
      layoutPatterns: { ...config.layoutPatterns, [key]: !config.layoutPatterns[key] },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="ds-headline">Layout, UI style & elevation</h2>
        <p className="ds-body-sm ds-text-muted mt-1">
          Choose your visual language, page layout patterns, and depth strategy.
        </p>
      </div>

      <div className="space-y-3">
        <label className="ds-label">UI style</label>
        <p className="ds-caption">
          The overall aesthetic — flat, glass, brutalist, and more. Affects shadows, borders, and
          surface treatment in the live preview.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UI_STYLE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ uiStyle: opt.id })}
              className={`rounded-xl border p-4 text-left transition-colors ${
                config.uiStyle === opt.id
                  ? "ds-tag-active border-transparent"
                  : "ds-tag-inactive"
              }`}
            >
              <p className="font-semibold">{opt.label}</p>
              <p className="mt-1 text-xs opacity-80">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="ds-label">Layout patterns</label>
        <p className="ds-caption">Which section types to include in the design system and preview.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {LAYOUT_PATTERNS.map(({ id, label, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => togglePattern(id)}
              className={`rounded-xl border p-4 text-left ${
                config.layoutPatterns[id] ? "ds-tag-active border-transparent" : "ds-tag-inactive"
              }`}
            >
              <p className="font-semibold">{label}</p>
              <p className="mt-1 text-xs opacity-80">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="ds-label">Max content width</label>
          <input
            type="text"
            value={config.layout.maxWidth}
            onChange={(e) => updateLayout("maxWidth", e.target.value)}
            className="ds-input"
          />
        </div>
        <div className="space-y-2">
          <label className="ds-label">Gutter</label>
          <input
            type="text"
            value={config.layout.gutter}
            onChange={(e) => updateLayout("gutter", e.target.value)}
            className="ds-input"
          />
        </div>
        <div className="space-y-2">
          <label className="ds-label">Section padding</label>
          <input
            type="text"
            value={config.layout.sectionPadding}
            onChange={(e) => updateLayout("sectionPadding", e.target.value)}
            className="ds-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="ds-label">Elevation strategy</label>
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              { id: "flat", label: "Flat", desc: "Borders and contrast only" },
              { id: "tonal-layers", label: "Tonal Layers", desc: "Surface color shifts" },
              { id: "subtle-shadow", label: "Subtle Shadow", desc: "Soft elevation shadows" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ elevation: opt.id })}
              className={`rounded-xl border p-4 text-left ${
                config.elevation === opt.id ? "ds-tag-active border-transparent" : "ds-tag-inactive"
              }`}
            >
              <p className="font-semibold">{opt.label}</p>
              <p className="mt-1 text-xs opacity-80">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
