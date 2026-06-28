"use client";

import type { DesignConfig } from "@/lib/schema";
import { SiteButton } from "@/components/site/site-button";
import { ColorInput } from "@/components/ui/color-input";
import { normalizeHex } from "@/lib/color-utils";
import { autoFixContrast } from "@/lib/contrast-fix";
import { COLOR_GROUPS, COLOR_LABELS, type ColorTokenKey } from "@/lib/color-labels";
import { getContrastFeedbackForColor, getFailingPairSummaries } from "@/lib/color-contrast-feedback";
import {
  countFailingPairs,
  getColorContrastPairs,
  pairContrastStatus,
  passesAllContrastChecks,
} from "@/lib/contrast-pairs";

interface ColorsStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

function contrastAgainstForKey(
  key: ColorTokenKey,
  colors: DesignConfig["colors"],
): string | undefined {
  switch (key) {
    case "onPrimary":
      return colors.primary;
    case "ink":
      return colors.canvas;
    case "inkMuted":
    case "inkSubtle":
      return colors.canvas;
    default:
      return undefined;
  }
}

export function ColorsStep({ config, onChange }: ColorsStepProps) {
  const updateColor = (key: ColorTokenKey, value: string) => {
    const normalized = normalizeHex(value);
    onChange({ colors: { ...config.colors, [key]: normalized ?? value } });
  };

  const handleAutoFix = () => {
    onChange({ colors: autoFixContrast(config.colors) });
  };

  const pairs = getColorContrastPairs(config.colors);
  const failing = countFailingPairs(config.colors);
  const failingSummaries = getFailingPairSummaries(config.colors);

  return (
    <div className="space-y-6">
      <div>
        <p className="ds-overline">Step 2</p>
        <h2 className="ds-headline mt-1">Colors</h2>
        <p className="ds-body-sm ds-text-muted mt-1">
          Each color shows which pairings pass or fail WCAG AA (4.5:1). Fix failures before
          continuing.
        </p>
      </div>

      {failing > 0 ? (
        <div
          className="space-y-3 rounded-lg border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--color-error)",
            background: "color-mix(in srgb, var(--color-error) 12%, transparent)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-medium">
              {failing} pairing{failing > 1 ? "s" : ""} still fail WCAG AA.
            </span>
            <SiteButton variant="secondary" onClick={handleAutoFix}>
              Auto-fix contrast
            </SiteButton>
          </div>
          <ul className="list-inside list-disc space-y-1 ds-body-sm">
            {failingSummaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--color-success)",
            background: "color-mix(in srgb, var(--color-success) 10%, transparent)",
            color: "var(--color-ink)",
          }}
        >
          All pairings pass WCAG AA (4.5:1). You can continue.
        </div>
      )}

      {COLOR_GROUPS.map((group) => (
        <section
          key={group.id}
          className="space-y-4 rounded-xl border p-4"
          style={{
            borderColor: "var(--color-hairline)",
            background: "var(--color-canvas-soft)",
          }}
        >
          <h3 className="ds-body-sm font-semibold">{group.title}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {group.keys.map((key) => {
              const meta = COLOR_LABELS[key];
              const feedback = getContrastFeedbackForColor(key, config.colors);
              return (
                <ColorInput
                  key={key}
                  label={meta.label}
                  description={meta.description}
                  value={config.colors[key]}
                  onChange={(v) => updateColor(key, v)}
                  contrastAgainst={contrastAgainstForKey(key, config.colors)}
                  feedback={feedback}
                />
              );
            })}
          </div>
        </section>
      ))}

      <section className="ds-panel space-y-3">
        <h3 className="ds-body-sm font-semibold">All pairing checks</h3>
        <div className="space-y-2">
          {pairs.map((pair) => {
            const { ratio, pass } = pairContrastStatus(pair);
            return (
              <div
                key={pair.id}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm"
                style={{
                  background: pass
                    ? pair.background
                    : "color-mix(in srgb, var(--color-error) 18%, " + pair.background + ")",
                  color: pair.foreground,
                  border: `1px solid ${pass ? "var(--color-success)" : "var(--color-error)"}`,
                }}
              >
                <span className="font-medium">{pair.label}</span>
                <span className="shrink-0 text-xs opacity-90">
                  {pass ? "Passes" : "Fails"} WCAG AA · {ratio?.toFixed(2)}:1 {pass ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function colorsStepCanContinue(config: DesignConfig): boolean {
  return passesAllContrastChecks(config.colors);
}
