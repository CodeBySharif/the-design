"use client";

import { useMemo } from "react";
import type { DesignConfig } from "@/lib/schema";
import { FontSelect } from "@/components/ui/font-select";
import { FontPairingCard } from "@/components/theme/font-pairing-card";
import { buildTypeScale } from "@/lib/type-scales";
import { fontPairingMatchesConfig } from "@/lib/theme-generate";
import { useDesignStore } from "@/lib/store";
import { useGoogleFonts } from "@/lib/use-google-fonts";
import { FONT_PAIRINGS, applyFontPairing } from "@/lib/theme-presets";
import { getTypographyStep, typographyStyle } from "@/lib/typography-helpers";

interface TypographyStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

const PRESETS = ["compact", "balanced", "editorial", "expressive"] as const;

export function TypographyStep({ config, onChange }: TypographyStepProps) {
  const fontBatch = useDesignStore((s) => s.fontBatch);
  const pairings = fontBatch ?? FONT_PAIRINGS;
  const isMixedBatch = fontBatch !== null;

  const fontsToLoad = useMemo(() => {
    const names = new Set<string>([
      config.displayFont,
      config.bodyFont,
      config.monoFont,
    ]);
    for (const pair of pairings) {
      names.add(pair.displayFont);
      names.add(pair.bodyFont);
      names.add(pair.monoFont);
    }
    return Array.from(names);
  }, [pairings, config.displayFont, config.bodyFont, config.monoFont]);

  useGoogleFonts(fontsToLoad);

  const rebuild = (
    partial: Partial<Pick<DesignConfig, "displayFont" | "bodyFont" | "monoFont" | "typeScalePreset">>,
  ) => {
    const next = { ...config, ...partial };
    onChange({
      ...partial,
      typography: buildTypeScale(
        next.typeScalePreset,
        next.displayFont,
        next.bodyFont,
        next.monoFont,
      ),
    });
  };

  const displayXl = getTypographyStep(config, "display-xl");
  const headline = getTypographyStep(config, "headline") ?? getTypographyStep(config, "display-md");
  const bodyMd = getTypographyStep(config, "body-md");
  const codeSm = getTypographyStep(config, "code-sm") ?? getTypographyStep(config, "code-md");
  const buttonMd = getTypographyStep(config, "button-md");

  return (
    <div className="space-y-6">
      <div>
        <p className="ds-overline">Step 3</p>
        <h2 className="ds-headline mt-1">Typography</h2>
        <p className="ds-body-sm ds-text-muted mt-1">
          {isMixedBatch
            ? "12 generated combos — use Randomize in the footer for a new set."
            : "12 curated pairings — use Randomize in the footer for new combos."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {pairings.map((pair) => (
          <FontPairingCard
            key={pair.id}
            pairing={pair}
            selected={fontPairingMatchesConfig(pair, config)}
            onSelect={() => onChange(applyFontPairing(pair, config))}
          />
        ))}
      </div>

      <details className="ds-surface-soft rounded-lg p-4">
        <summary className="ds-body-sm cursor-pointer font-semibold">Custom fonts</summary>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <FontSelect
            label="Display font"
            value={config.displayFont}
            onChange={(displayFont) => rebuild({ displayFont })}
          />
          <FontSelect
            label="Body font"
            value={config.bodyFont}
            onChange={(bodyFont) => rebuild({ bodyFont })}
          />
          <FontSelect
            label="Mono font"
            value={config.monoFont}
            onChange={(monoFont) => rebuild({ monoFont })}
          />
        </div>
      </details>

      <div className="space-y-2">
        <label className="ds-label">Type scale</label>
        <p className="ds-caption">
          Controls font sizes in your export and live preview — compact is smaller, expressive is
          larger.
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => rebuild({ typeScalePreset: preset })}
              className={`rounded-full px-4 py-2 text-sm capitalize ${
                config.typeScalePreset === preset ? "ds-tag-active" : "ds-tag-inactive"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-lg border p-6"
        style={{
          background: config.colors.canvas,
          borderColor: config.colors.hairline,
          color: config.colors.ink,
        }}
      >
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: config.colors.inkMuted }}
        >
          Full preview
        </p>
        <p
          className="mt-2"
          style={typographyStyle(displayXl)}
        >
          {config.name || "Display XL"}
        </p>
        <p
          className="mt-2"
          style={typographyStyle(headline)}
        >
          Headline — {config.displayFont}
        </p>
        <p
          className="mt-3 max-w-md"
          style={{
            ...typographyStyle(bodyMd),
            color: config.colors.inkMuted,
          }}
        >
          {config.description || "Body text uses your type scale and fonts."}
        </p>
        <p
          className="mt-3"
          style={{
            ...typographyStyle(codeSm),
            color: config.colors.inkSubtle,
          }}
        >
          {`// ${config.monoFont} · ${config.typeScalePreset}`}
        </p>
        <button
          type="button"
          className="mt-4 rounded-md px-4 py-2"
          style={{
            ...typographyStyle(buttonMd),
            background: config.colors.primary,
            color: config.colors.onPrimary,
          }}
        >
          Sample button
        </button>
      </div>
    </div>
  );
}
