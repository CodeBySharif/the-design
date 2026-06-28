import type { CSSProperties } from "react";
import type { DesignConfig } from "./schema";

export const UI_STYLE_OPTIONS = [
  {
    id: "flat",
    label: "Flat",
    desc: "Clean surfaces, minimal depth — modern product UI.",
  },
  {
    id: "skeuomorphism",
    label: "Skeuomorphism",
    desc: "Realistic depth, gradients, and tactile button affordances.",
  },
  {
    id: "brutalism",
    label: "Brutalism",
    desc: "Bold borders, hard shadows, raw high-contrast layouts.",
  },
  {
    id: "glassmorphism",
    label: "Glassmorphism",
    desc: "Frosted glass panels with blur and translucent layers.",
  },
  {
    id: "neomorphism",
    label: "Neomorphism",
    desc: "Soft extruded surfaces with dual same-tone shadows.",
  },
  {
    id: "claymorphism",
    label: "Claymorphism",
    desc: "Chunky, playful 3D shapes with soft inner highlights.",
  },
] as const;

export type UiStyleId = (typeof UI_STYLE_OPTIONS)[number]["id"];

export interface UiStylePreview {
  card: CSSProperties;
  buttonPrimary: CSSProperties;
  buttonSecondary: CSSProperties;
  hero: CSSProperties;
  nav: CSSProperties;
  input: CSSProperties;
}

export function getUiStylePreview(
  style: DesignConfig["uiStyle"],
  colors: DesignConfig["colors"],
): UiStylePreview {
  const base = {
    card: {} as CSSProperties,
    buttonPrimary: {} as CSSProperties,
    buttonSecondary: {} as CSSProperties,
    hero: {} as CSSProperties,
    nav: {} as CSSProperties,
    input: {} as CSSProperties,
  };

  switch (style) {
    case "skeuomorphism":
      return {
        ...base,
        card: {
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.15)",
          border: `1px solid ${colors.hairline}`,
        },
        buttonPrimary: {
          background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 4px rgba(0,0,0,0.2)",
        },
        buttonSecondary: {
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.1)",
        },
        input: {
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        },
      };
    case "brutalism":
      return {
        ...base,
        card: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `4px 4px 0 ${colors.ink}`,
          borderRadius: "0",
        },
        buttonPrimary: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.ink}`,
          borderRadius: "0",
        },
        buttonSecondary: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.ink}`,
          borderRadius: "0",
        },
        hero: { borderBottom: `4px solid ${colors.ink}` },
        nav: { borderBottom: `3px solid ${colors.ink}` },
        input: {
          border: `2px solid ${colors.ink}`,
          borderRadius: "0",
          boxShadow: `2px 2px 0 ${colors.ink}`,
        },
      };
    case "glassmorphism":
      return {
        ...base,
        card: {
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
        },
        buttonPrimary: {
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)",
        },
        buttonSecondary: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
        },
        hero: {
          background: `linear-gradient(135deg, ${colors.canvasSoft} 0%, ${colors.canvas} 100%)`,
        },
        input: {
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
        },
      };
    case "neomorphism":
      return {
        ...base,
        card: {
          background: colors.canvasSoft,
          boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.7)`,
          border: "none",
        },
        buttonPrimary: {
          boxShadow: `4px 4px 8px rgba(0,0,0,0.15), -2px -2px 6px rgba(255,255,255,0.5)`,
        },
        buttonSecondary: {
          background: colors.canvasSoft,
          boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.7)`,
          border: "none",
        },
        input: {
          background: colors.canvasSoft,
          boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.1), inset -2px -2px 6px rgba(255,255,255,0.6)",
          border: "none",
        },
      };
    case "claymorphism":
      return {
        ...base,
        card: {
          boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.08), inset 2px 2px 6px rgba(255,255,255,0.6), 0 8px 20px rgba(0,0,0,0.1)`,
          border: "none",
        },
        buttonPrimary: {
          boxShadow: `inset -1px -2px 4px rgba(0,0,0,0.15), inset 1px 1px 3px rgba(255,255,255,0.4), 0 6px 14px rgba(0,0,0,0.12)`,
        },
        buttonSecondary: {
          boxShadow: `inset 1px 1px 3px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.08)`,
        },
        input: {
          boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.06)",
          border: "none",
        },
      };
    default:
      return base;
  }
}

export function uiStyleProse(style: DesignConfig["uiStyle"]): string {
  const map: Record<DesignConfig["uiStyle"], string> = {
    flat: "Flat design — clean surfaces, token-driven color, and minimal decorative depth.",
    skeuomorphism:
      "Skeuomorphic cues — subtle gradients, inset highlights, and tactile button affordances.",
    brutalism:
      "Neo-brutalist — heavy borders, offset hard shadows, and unapologetic high contrast.",
    glassmorphism:
      "Glassmorphic layers — frosted translucent panels over vibrant or photographic backgrounds.",
    neomorphism:
      "Neomorphic surfaces — soft extruded cards using dual same-hue shadows on a matching canvas.",
    claymorphism:
      "Claymorphic shapes — chunky rounded elements with soft inner light and playful depth.",
  };
  return map[style];
}
