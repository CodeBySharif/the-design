"use client";

import type { DesignConfig } from "@/lib/schema";
import { buildRoundedScale, buildSpacingScale } from "@/lib/defaults";

interface SpacingShapesStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function SpacingShapesStep({ config, onChange }: SpacingShapesStepProps) {
  const setBase = (spacingBase: 4 | 8) => {
    onChange({ spacingBase, spacing: buildSpacingScale(spacingBase) });
  };

  const setRadiusStyle = (radiusStyle: DesignConfig["radiusStyle"]) => {
    onChange({ radiusStyle, rounded: buildRoundedScale(radiusStyle) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900">Spacing & Shapes</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Set your spacing base unit and corner radius style.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">Spacing base unit</label>
        <div className="flex gap-2">
          {([4, 8] as const).map((base) => (
            <button
              key={base}
              type="button"
              onClick={() => setBase(base)}
              className={`rounded-lg px-4 py-2 text-sm ${
                config.spacingBase === base
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {base}px
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4">
        <p className="mb-3 text-sm font-medium text-zinc-700">Spacing scale</p>
        <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {Object.entries(config.spacing).map(([key, value]) => (
            <div key={key} className="flex justify-between rounded bg-zinc-50 px-2 py-1">
              <span className="font-mono text-zinc-500">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">Corner radius style</label>
        <div className="flex gap-2">
          {(["sharp", "soft", "pill"] as const).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setRadiusStyle(style)}
              className={`rounded-lg px-4 py-2 text-sm capitalize ${
                config.radiusStyle === style
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(config.rounded)
          .filter(([k]) => k !== "none" && k !== "full")
          .map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="mb-1 h-16 w-16 border-2 border-zinc-300 bg-zinc-100"
                style={{ borderRadius: value }}
              />
              <span className="font-mono text-xs text-zinc-500">{key}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
