import { contrastRatio, passesWcagAA } from "./contrast";
import { normalizeColorRecord, normalizeHex } from "./color-utils";
import {
  getColorContrastPairs,
  pairContrastStatus,
  passesAllContrastChecks,
} from "./contrast-pairs";
import type { DesignConfig } from "./schema";

function hexToRgb(hex: string): [number, number, number] | null {
  const normalized = normalizeHex(hex)?.slice(1);
  if (!normalized) return null;
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function isLightBackground(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  return relativeLuminance(...rgb) > 0.5;
}

function passesOnAll(foreground: string, backgrounds: string[]): boolean {
  return backgrounds.every((bg) => passesWcagAA(contrastRatio(foreground, bg)));
}

function findPassingGray(backgrounds: string[], startDark: boolean): string {
  const order = startDark
    ? Array.from({ length: 256 }, (_, i) => i)
    : Array.from({ length: 256 }, (_, i) => 255 - i);

  for (const level of order) {
    const hex = rgbToHex(level, level, level);
    if (passesOnAll(hex, backgrounds)) return hex;
  }

  return startDark ? "#000000" : "#ffffff";
}

function findPassingColor(
  backgrounds: string[],
  preferred: string | undefined,
  startDark: boolean,
): string {
  const normalizedPreferred = preferred ? normalizeHex(preferred) ?? undefined : undefined;
  if (normalizedPreferred && passesOnAll(normalizedPreferred, backgrounds)) {
    return normalizedPreferred;
  }
  return findPassingGray(backgrounds, startDark);
}

function blendToward(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  if (!a || !b) return normalizeHex(from) ?? to;
  return rgbToHex(
    a[0] + (b[0] - a[0]) * amount,
    a[1] + (b[1] - a[1]) * amount,
    a[2] + (b[2] - a[2]) * amount,
  );
}

/** Pull section background toward page background so one ink color can pass on both. */
function harmonizeCanvasSoft(colors: DesignConfig["colors"]): void {
  const probe = findPassingGray(
    [colors.canvas, colors.canvasSoft],
    !isLightBackground(colors.canvas),
  );
  if (passesOnAll(probe, [colors.canvas, colors.canvasSoft])) return;

  for (let step = 1; step <= 24; step++) {
    colors.canvasSoft = blendToward(colors.canvasSoft, colors.canvas, step / 24);
    const candidate = findPassingGray(
      [colors.canvas, colors.canvasSoft],
      !isLightBackground(colors.canvas),
    );
    if (passesOnAll(candidate, [colors.canvas, colors.canvasSoft])) return;
  }

  colors.canvasSoft = colors.canvas;
}

const SEMANTIC_ON_LIGHT = {
  success: "#15803d",
  warning: "#a16207",
  error: "#b91c1c",
} as const;

const SEMANTIC_ON_DARK = {
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
} as const;

function fixSemanticColor(
  key: "success" | "warning" | "error",
  background: string,
): string {
  const preset = isLightBackground(background)
    ? SEMANTIC_ON_LIGHT[key]
    : SEMANTIC_ON_DARK[key];
  if (passesWcagAA(contrastRatio(preset, background))) return preset;
  return findPassingGray([background], !isLightBackground(background));
}

function applyContrastFixPass(colors: DesignConfig["colors"]): DesignConfig["colors"] {
  const next = normalizeColorRecord({ ...colors });
  harmonizeCanvasSoft(next);

  const textBackgrounds = [next.canvas, next.canvasSoft];
  const onLight = isLightBackground(next.canvas);

  next.ink = findPassingColor(textBackgrounds, next.ink, !onLight);

  next.inkMuted = findPassingColor([next.canvas], next.inkMuted, !onLight);
  if (next.inkMuted === next.ink) {
    next.inkMuted = findPassingGray([next.canvas], !onLight);
  }

  next.inkSubtle = findPassingColor([next.canvas], next.inkSubtle, !onLight);
  if (next.inkSubtle === next.ink || next.inkSubtle === next.inkMuted) {
    next.inkSubtle = findPassingGray([next.canvas], onLight);
  }

  next.onPrimary = findPassingColor(
    [next.primary],
    next.onPrimary,
    !isLightBackground(next.primary),
  );

  next.success = fixSemanticColor("success", next.canvasSoft);
  next.warning = fixSemanticColor("warning", next.canvasSoft);
  next.error = fixSemanticColor("error", next.canvasSoft);

  const stillFailing = getColorContrastPairs(next).filter((p) => !pairContrastStatus(p).pass);
  for (const pair of stillFailing) {
    switch (pair.id) {
      case "ink-canvas":
      case "ink-canvas-soft":
        next.ink = findPassingGray(textBackgrounds, !onLight);
        break;
      case "ink-muted-canvas":
        next.inkMuted = findPassingGray([next.canvas], !onLight);
        break;
      case "ink-subtle-canvas":
        next.inkSubtle = findPassingGray([next.canvas], onLight);
        break;
      case "on-primary-primary":
        next.onPrimary = findPassingGray([next.primary], !isLightBackground(next.primary));
        break;
      case "success-canvas-soft":
        next.success = fixSemanticColor("success", next.canvasSoft);
        break;
      case "warning-canvas-soft":
        next.warning = fixSemanticColor("warning", next.canvasSoft);
        break;
      case "error-canvas-soft":
        next.error = fixSemanticColor("error", next.canvasSoft);
        break;
      default:
        break;
    }
  }

  return next;
}

export function autoFixContrast(colors: DesignConfig["colors"]): DesignConfig["colors"] {
  let next = normalizeColorRecord({ ...colors });

  for (let pass = 0; pass < 8; pass++) {
    next = applyContrastFixPass(next);
    if (passesAllContrastChecks(next)) break;
  }

  return next;
}
