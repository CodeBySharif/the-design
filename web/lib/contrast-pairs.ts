import { contrastRatio, contrastLabel, passesWcagAA } from "./contrast";
import type { ColorTokenKey } from "./color-labels";
import type { DesignConfig } from "./schema";

export interface ContrastPair {
  id: string;
  label: string;
  foreground: string;
  background: string;
  context: string;
  colorKeys: ColorTokenKey[];
}

export function getColorContrastPairs(colors: DesignConfig["colors"]): ContrastPair[] {
  return [
    {
      id: "ink-canvas",
      label: "Main text on background",
      foreground: colors.ink,
      background: colors.canvas,
      context: "Headlines and paragraphs on the page",
      colorKeys: ["ink", "canvas"],
    },
    {
      id: "ink-canvas-soft",
      label: "Main text on section background",
      foreground: colors.ink,
      background: colors.canvasSoft,
      context: "Text on hero bands and feature sections",
      colorKeys: ["ink", "canvasSoft"],
    },
    {
      id: "ink-muted-canvas",
      label: "Secondary text on background",
      foreground: colors.inkMuted,
      background: colors.canvas,
      context: "Captions and metadata",
      colorKeys: ["inkMuted", "canvas"],
    },
    {
      id: "ink-subtle-canvas",
      label: "Tertiary text on background",
      foreground: colors.inkSubtle,
      background: colors.canvas,
      context: "Placeholders and disabled text",
      colorKeys: ["inkSubtle", "canvas"],
    },
    {
      id: "on-primary-primary",
      label: "Button label on accent",
      foreground: colors.onPrimary,
      background: colors.primary,
      context: "Text on filled primary buttons",
      colorKeys: ["onPrimary", "primary"],
    },
    {
      id: "success-canvas-soft",
      label: "Success on section background",
      foreground: colors.success,
      background: colors.canvasSoft,
      context: "Positive status badges",
      colorKeys: ["success", "canvasSoft"],
    },
    {
      id: "warning-canvas-soft",
      label: "Warning on section background",
      foreground: colors.warning,
      background: colors.canvasSoft,
      context: "Warning status badges",
      colorKeys: ["warning", "canvasSoft"],
    },
    {
      id: "error-canvas-soft",
      label: "Error on section background",
      foreground: colors.error,
      background: colors.canvasSoft,
      context: "Error status badges",
      colorKeys: ["error", "canvasSoft"],
    },
  ];
}

export function pairContrastStatus(pair: ContrastPair) {
  const ratio = contrastRatio(pair.foreground, pair.background);
  const label = contrastLabel(ratio);
  const pass = passesWcagAA(ratio);
  return { ratio, label, pass };
}

export function countFailingPairs(colors: DesignConfig["colors"]): number {
  return getColorContrastPairs(colors).filter((p) => !pairContrastStatus(p).pass).length;
}

export function passesAllContrastChecks(colors: DesignConfig["colors"]): boolean {
  return countFailingPairs(colors) === 0;
}

export function getFailingColorKeys(colors: DesignConfig["colors"]): Set<ColorTokenKey> {
  const failing = new Set<ColorTokenKey>();
  for (const pair of getColorContrastPairs(colors)) {
    if (!pairContrastStatus(pair).pass) {
      for (const key of pair.colorKeys) {
        failing.add(key);
      }
    }
  }
  return failing;
}

export function groupHasContrastFailure(
  colors: DesignConfig["colors"],
  keys: ColorTokenKey[],
): boolean {
  const failing = getFailingColorKeys(colors);
  return keys.some((key) => failing.has(key));
}
