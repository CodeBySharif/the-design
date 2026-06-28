import type { TypographyStep } from "./schema";

type ScalePreset = "compact" | "balanced" | "editorial" | "expressive";

const SCALES: Record<
  ScalePreset,
  Array<{
    name: string;
    size: number;
    weight: number;
    lineHeight: number | string;
    letterSpacing?: string;
    role: "display" | "body" | "mono" | "label";
  }>
> = {
  compact: [
    { name: "display-xl", size: 48, weight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", role: "display" },
    { name: "display-lg", size: 36, weight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", role: "display" },
    { name: "display-md", size: 28, weight: 600, lineHeight: 1.2, letterSpacing: "-0.01em", role: "display" },
    { name: "headline", size: 22, weight: 600, lineHeight: 1.3, role: "display" },
    { name: "body-lg", size: 18, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "body-md", size: 16, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "body-sm", size: 14, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "caption", size: 12, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "label-md", size: 13, weight: 600, lineHeight: 1.3, letterSpacing: "0.02em", role: "label" },
    { name: "button-md", size: 16, weight: 600, lineHeight: 1.2, role: "body" },
    { name: "code-sm", size: 13, weight: 400, lineHeight: 1.5, role: "mono" },
  ],
  balanced: [
    { name: "display-xl", size: 64, weight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", role: "display" },
    { name: "display-lg", size: 48, weight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", role: "display" },
    { name: "display-md", size: 36, weight: 600, lineHeight: 1.15, letterSpacing: "-0.01em", role: "display" },
    { name: "headline", size: 28, weight: 600, lineHeight: 1.25, role: "display" },
    { name: "body-lg", size: 18, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "body-md", size: 16, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "body-sm", size: 14, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "caption", size: 12, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "label-md", size: 13, weight: 600, lineHeight: 1.3, letterSpacing: "0.04em", role: "label" },
    { name: "overline", size: 11, weight: 600, lineHeight: 1.2, letterSpacing: "0.08em", role: "label" },
    { name: "button-md", size: 16, weight: 600, lineHeight: 1.2, role: "body" },
    { name: "code-sm", size: 13, weight: 400, lineHeight: 1.5, role: "mono" },
  ],
  editorial: [
    { name: "display-mega", size: 96, weight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", role: "display" },
    { name: "display-xl", size: 64, weight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", role: "display" },
    { name: "display-lg", size: 48, weight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", role: "display" },
    { name: "display-md", size: 36, weight: 600, lineHeight: 1.15, role: "display" },
    { name: "body-lg", size: 20, weight: 400, lineHeight: 1.6, role: "body" },
    { name: "body-md", size: 16, weight: 400, lineHeight: 1.6, role: "body" },
    { name: "body-sm", size: 14, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "caption", size: 12, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "label-md", size: 13, weight: 600, lineHeight: 1.3, letterSpacing: "0.06em", role: "label" },
    { name: "button-md", size: 16, weight: 600, lineHeight: 1.2, role: "body" },
    { name: "code-sm", size: 13, weight: 400, lineHeight: 1.5, role: "mono" },
  ],
  expressive: [
    { name: "display-mega", size: 112, weight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", role: "display" },
    { name: "display-xl", size: 72, weight: 700, lineHeight: 1.0, letterSpacing: "-0.03em", role: "display" },
    { name: "display-lg", size: 56, weight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", role: "display" },
    { name: "display-md", size: 40, weight: 600, lineHeight: 1.1, role: "display" },
    { name: "headline", size: 32, weight: 600, lineHeight: 1.2, role: "display" },
    { name: "subhead", size: 24, weight: 500, lineHeight: 1.3, role: "display" },
    { name: "body-lg", size: 20, weight: 400, lineHeight: 1.55, role: "body" },
    { name: "body-md", size: 16, weight: 400, lineHeight: 1.5, role: "body" },
    { name: "body-sm", size: 14, weight: 400, lineHeight: 1.45, role: "body" },
    { name: "caption", size: 12, weight: 400, lineHeight: 1.4, role: "body" },
    { name: "label-lg", size: 14, weight: 600, lineHeight: 1.3, letterSpacing: "0.05em", role: "label" },
    { name: "label-md", size: 12, weight: 600, lineHeight: 1.3, letterSpacing: "0.06em", role: "label" },
    { name: "overline", size: 11, weight: 700, lineHeight: 1.2, letterSpacing: "0.1em", role: "label" },
    { name: "button-md", size: 16, weight: 600, lineHeight: 1.2, role: "body" },
    { name: "code-md", size: 14, weight: 400, lineHeight: 1.5, role: "mono" },
    { name: "code-sm", size: 12, weight: 400, lineHeight: 1.45, role: "mono" },
  ],
};

function fontForRole(
  role: "display" | "body" | "mono" | "label",
  displayFont: string,
  bodyFont: string,
  monoFont: string,
): string {
  if (role === "display") return displayFont;
  if (role === "mono") return monoFont;
  return bodyFont;
}

export function buildTypeScale(
  preset: ScalePreset,
  displayFont: string,
  bodyFont: string,
  monoFont: string = "IBM Plex Mono",
): TypographyStep[] {
  return SCALES[preset].map((step) => ({
    name: step.name,
    fontFamily: fontForRole(step.role, displayFont, bodyFont, monoFont),
    fontSize: `${step.size}px`,
    fontWeight: step.weight,
    lineHeight: step.lineHeight,
    letterSpacing: step.letterSpacing,
  }));
}
