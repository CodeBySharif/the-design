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
  {
    id: "material",
    label: "Material",
    desc: "Layered elevation, soft shadows, and paper-like surfaces.",
  },
  {
    id: "swiss",
    label: "Swiss",
    desc: "Grid-driven, hairline rules, and typographic restraint.",
  },
  {
    id: "outlined",
    label: "Outlined",
    desc: "Stroke-first UI — clear borders, open fields, light fill.",
  },
  {
    id: "gradient",
    label: "Gradient",
    desc: "Color washes and soft mesh backgrounds with vivid accents.",
  },
  {
    id: "retro",
    label: "Retro",
    desc: "Vintage contrast, chunky type energy, and nostalgic depth.",
  },
  {
    id: "maximalism",
    label: "Maximalism",
    desc: "Bold color blocks, layered accents, and high visual density.",
  },
  {
    id: "soft-ui",
    label: "Soft UI",
    desc: "Airy pads, gentle radii, and low-contrast elevation.",
  },
  {
    id: "neon",
    label: "Neon",
    desc: "Glow accents, dark grounds, and high-energy highlights.",
  },
  {
    id: "monochrome",
    label: "Monochrome",
    desc: "Ink and canvas only — contrast carries the hierarchy.",
  },
  {
    id: "paper",
    label: "Paper",
    desc: "Cream sheets, soft fold shadows, and print-like edges.",
  },
  {
    id: "bauhaus",
    label: "Bauhaus",
    desc: "Geometric blocks, primary shapes, and strict alignment.",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    desc: "Hard edges, electric accents, and tech-noir contrast.",
  },
  {
    id: "terminal",
    label: "Terminal",
    desc: "Mono-forward chrome, tight borders, and utility density.",
  },
  {
    id: "comic",
    label: "Comic",
    desc: "Thick outlines, punchy shadows, and playful energy.",
  },
  {
    id: "minimalism",
    label: "Minimalism",
    desc: "Sparse layout, quiet borders, and lots of breathing room.",
  },
  {
    id: "gaming",
    label: "Gaming",
    desc: "Gamified HUD energy — XP bars, badges, and punchy panels.",
  },
  {
    id: "memphis",
    label: "Memphis",
    desc: "Playful geometry, mixed patterns, and loud accent shapes.",
  },
  {
    id: "vaporwave",
    label: "Vaporwave",
    desc: "Pastel gradients, chrome glow, and dreamy retro-futurism.",
  },
  {
    id: "y2k",
    label: "Y2K",
    desc: "Glossy bubbles, metallic sheen, and early-web optimism.",
  },
  {
    id: "industrial",
    label: "Industrial",
    desc: "Raw metal edges, utility labels, and heavy structural lines.",
  },
  {
    id: "organic",
    label: "Organic",
    desc: "Soft irregular radii, earthy depth, and natural calm.",
  },
  {
    id: "luxury",
    label: "Luxury",
    desc: "Thin gold rules, spacious type, and refined restraint.",
  },
  {
    id: "pastel",
    label: "Pastel",
    desc: "Candy tints, soft borders, and gentle playful surfaces.",
  },
  {
    id: "pixel",
    label: "Pixel",
    desc: "Chunky square corners, bitmap energy, and game-UI crispness.",
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
    case "flat":
      return {
        ...base,
        card: {
          border: `1px solid ${colors.hairline}`,
          boxShadow: "none",
          background: colors.canvas,
        },
        buttonPrimary: { boxShadow: "none" },
        buttonSecondary: {
          boxShadow: "none",
          border: `1px solid ${colors.hairline}`,
          background: colors.canvas,
        },
        hero: { background: colors.canvasSoft },
        nav: { borderBottom: `1px solid ${colors.hairline}`, boxShadow: "none" },
        input: {
          border: `1px solid ${colors.hairline}`,
          boxShadow: "none",
          background: colors.canvas,
        },
      };
    case "skeuomorphism":
      return {
        ...base,
        card: {
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.15)",
          border: `1px solid ${colors.hairline}`,
          background: `linear-gradient(180deg, ${colors.canvas} 0%, ${colors.canvasSoft} 100%)`,
        },
        buttonPrimary: {
          background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 4px rgba(0,0,0,0.2)",
        },
        buttonSecondary: {
          background: `linear-gradient(180deg, ${colors.canvas} 0%, ${colors.canvasSoft} 100%)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.1)",
        },
        hero: {
          background: `linear-gradient(180deg, ${colors.canvasSoft} 0%, ${colors.canvas} 100%)`,
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.06)",
        },
        nav: {
          background: `linear-gradient(180deg, ${colors.canvas} 0%, ${colors.canvasSoft} 100%)`,
          boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        },
        input: {
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
          background: colors.canvas,
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
          borderRadius: "18px",
        },
        buttonPrimary: {
          borderRadius: "14px",
          boxShadow: `4px 4px 8px rgba(0,0,0,0.15), -2px -2px 6px rgba(255,255,255,0.5)`,
        },
        buttonSecondary: {
          background: colors.canvasSoft,
          borderRadius: "14px",
          boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.7)`,
          border: "none",
        },
        hero: {
          background: colors.canvasSoft,
          boxShadow: "inset 6px 6px 14px rgba(0,0,0,0.06), inset -6px -6px 14px rgba(255,255,255,0.65)",
        },
        nav: {
          background: colors.canvasSoft,
          borderBottom: "none",
          boxShadow: "6px 6px 12px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.65)",
        },
        input: {
          background: colors.canvasSoft,
          borderRadius: "14px",
          boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.1), inset -2px -2px 6px rgba(255,255,255,0.6)",
          border: "none",
        },
      };
    case "claymorphism":
      return {
        ...base,
        card: {
          borderRadius: "28px",
          background: `color-mix(in srgb, ${colors.primary} 10%, ${colors.canvasSoft})`,
          boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.08), inset 2px 2px 6px rgba(255,255,255,0.6), 0 8px 20px rgba(0,0,0,0.1)`,
          border: "none",
        },
        buttonPrimary: {
          borderRadius: "22px",
          boxShadow: `inset -1px -2px 4px rgba(0,0,0,0.15), inset 1px 1px 3px rgba(255,255,255,0.4), 0 6px 14px rgba(0,0,0,0.12)`,
        },
        buttonSecondary: {
          borderRadius: "22px",
          background: `color-mix(in srgb, ${colors.primary} 8%, ${colors.canvas})`,
          boxShadow: `inset 1px 1px 3px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.08)`,
        },
        hero: {
          background: `radial-gradient(circle at 20% 20%, color-mix(in srgb, ${colors.primary} 28%, transparent), transparent 45%), ${colors.canvasSoft}`,
        },
        nav: {
          background: `color-mix(in srgb, ${colors.primary} 8%, ${colors.canvasSoft})`,
          borderBottom: "none",
        },
        input: {
          borderRadius: "18px",
          boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.06)",
          border: "none",
          background: colors.canvasSoft,
        },
      };
    case "material":
      return {
        ...base,
        card: {
          boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.1)",
          border: "none",
          borderRadius: "12px",
          background: colors.canvas,
        },
        buttonPrimary: {
          borderRadius: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: 12,
          boxShadow: "0 2px 4px rgba(0,0,0,0.22)",
        },
        buttonSecondary: {
          borderRadius: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: 12,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        },
        hero: {
          background: colors.canvasSoft,
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.06)",
        },
        nav: {
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          background: colors.primary,
          color: colors.onPrimary,
          borderBottom: "none",
        },
        input: {
          borderRadius: "4px 4px 0 0",
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderBottom: `2px solid ${colors.primary}`,
          background: colors.canvasSoft,
          boxShadow: "none",
        },
      };
    case "swiss":
      return {
        ...base,
        card: {
          border: `1px solid ${colors.hairline}`,
          boxShadow: "none",
          borderRadius: "0",
        },
        buttonPrimary: {
          borderRadius: "0",
          boxShadow: "none",
        },
        buttonSecondary: {
          border: `1px solid ${colors.ink}`,
          borderRadius: "0",
          boxShadow: "none",
        },
        hero: {
          borderBottom: `1px solid ${colors.hairline}`,
        },
        nav: {
          borderBottom: `1px solid ${colors.hairline}`,
        },
        input: {
          border: `1px solid ${colors.ink}`,
          borderRadius: "0",
          boxShadow: "none",
        },
      };
    case "outlined":
      return {
        ...base,
        card: {
          background: "transparent",
          border: `2px solid ${colors.ink}`,
          boxShadow: "none",
        },
        buttonPrimary: {
          boxShadow: "none",
          background: "transparent",
          color: colors.primary,
          border: `2px solid ${colors.primary}`,
        },
        buttonSecondary: {
          background: "transparent",
          border: `2px solid ${colors.ink}`,
          color: colors.ink,
          boxShadow: "none",
        },
        hero: {
          background: "transparent",
          borderBottom: `2px solid ${colors.ink}`,
        },
        nav: {
          background: "transparent",
          borderBottom: `2px solid ${colors.ink}`,
        },
        input: {
          background: "transparent",
          border: `2px solid ${colors.ink}`,
          boxShadow: "none",
        },
      };
    case "gradient":
      return {
        ...base,
        card: {
          background: `linear-gradient(145deg, ${colors.canvasSoft} 0%, ${colors.canvas} 100%)`,
          border: `1px solid ${colors.hairline}`,
        },
        buttonPrimary: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        },
        hero: {
          background: `linear-gradient(120deg, ${colors.canvasSoft} 0%, ${colors.canvas} 45%, color-mix(in srgb, ${colors.primary} 18%, ${colors.canvas}) 100%)`,
        },
        input: {
          border: `1px solid ${colors.hairline}`,
          background: colors.canvas,
        },
      };
    case "retro":
      return {
        ...base,
        card: {
          border: `2px solid ${colors.ink}`,
          boxShadow: `6px 6px 0 color-mix(in srgb, ${colors.primary} 55%, ${colors.ink})`,
        },
        buttonPrimary: {
          border: `2px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.ink}`,
        },
        buttonSecondary: {
          border: `2px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.hairline}`,
        },
        hero: {
          borderBottom: `3px double ${colors.ink}`,
        },
        input: {
          border: `2px solid ${colors.ink}`,
          boxShadow: `2px 2px 0 ${colors.hairline}`,
        },
      };
    case "maximalism":
      return {
        ...base,
        card: {
          border: `3px solid ${colors.primary}`,
          boxShadow: `0 0 0 4px color-mix(in srgb, ${colors.primary} 20%, transparent), 0 12px 24px rgba(0,0,0,0.12)`,
        },
        buttonPrimary: {
          boxShadow: `0 0 0 3px color-mix(in srgb, ${colors.primary} 30%, transparent)`,
        },
        buttonSecondary: {
          border: `2px solid ${colors.primary}`,
          background: `color-mix(in srgb, ${colors.primary} 12%, ${colors.canvas})`,
        },
        hero: {
          background: `linear-gradient(160deg, color-mix(in srgb, ${colors.primary} 16%, ${colors.canvasSoft}) 0%, ${colors.canvas} 55%, color-mix(in srgb, ${colors.primaryHover} 14%, ${colors.canvas}) 100%)`,
        },
        input: {
          border: `2px solid ${colors.primary}`,
        },
      };
    case "soft-ui":
      return {
        ...base,
        card: {
          background: colors.canvasSoft,
          border: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          borderRadius: "20px",
        },
        buttonPrimary: {
          borderRadius: "9999px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
        },
        buttonSecondary: {
          borderRadius: "9999px",
          border: "none",
          background: colors.canvasSoft,
        },
        input: {
          borderRadius: "14px",
          border: "none",
          background: colors.canvasSoft,
        },
      };
    case "neon":
      return {
        ...base,
        card: {
          background: colors.canvasSoft,
          color: colors.ink,
          border: `1px solid color-mix(in srgb, ${colors.primary} 70%, transparent)`,
          boxShadow: `0 0 22px color-mix(in srgb, ${colors.primary} 45%, transparent)`,
        },
        buttonPrimary: {
          boxShadow: `0 0 18px color-mix(in srgb, ${colors.primary} 65%, transparent)`,
          border: `1px solid ${colors.primary}`,
        },
        buttonSecondary: {
          background: colors.ink,
          color: colors.canvas,
          border: `1px solid color-mix(in srgb, ${colors.primary} 55%, transparent)`,
          boxShadow: `0 0 12px color-mix(in srgb, ${colors.primary} 30%, transparent)`,
        },
        hero: {
          background: colors.ink,
          color: colors.canvas,
          boxShadow: `inset 0 0 36px color-mix(in srgb, ${colors.primary} 24%, transparent)`,
        },
        nav: {
          background: colors.ink,
          color: colors.canvas,
          borderBottom: `1px solid color-mix(in srgb, ${colors.primary} 55%, transparent)`,
        },
        input: {
          background: colors.ink,
          color: colors.canvas,
          border: `1px solid color-mix(in srgb, ${colors.primary} 50%, transparent)`,
          boxShadow: `0 0 10px color-mix(in srgb, ${colors.primary} 22%, transparent)`,
        },
      };
    case "monochrome":
      return {
        ...base,
        card: {
          border: `1px solid ${colors.ink}`,
          boxShadow: "none",
          background: colors.canvas,
        },
        buttonPrimary: {
          background: colors.ink,
          color: colors.canvas,
          boxShadow: "none",
        },
        buttonSecondary: {
          border: `1px solid ${colors.ink}`,
          background: colors.canvas,
          color: colors.ink,
          boxShadow: "none",
        },
        input: {
          border: `1px solid ${colors.ink}`,
          boxShadow: "none",
        },
      };
    case "paper":
      return {
        ...base,
        card: {
          background: `color-mix(in srgb, ${colors.warning} 6%, ${colors.canvas})`,
          border: `1px solid color-mix(in srgb, ${colors.ink} 12%, ${colors.hairline})`,
          boxShadow: `
            1px 1px 0 color-mix(in srgb, ${colors.ink} 6%, transparent),
            3px 3px 0 color-mix(in srgb, ${colors.canvasSoft} 80%, ${colors.canvas}),
            6px 8px 18px rgba(0,0,0,0.08)
          `,
          borderRadius: "2px",
        },
        buttonPrimary: {
          borderRadius: "2px",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.12)",
          border: `1px solid color-mix(in srgb, ${colors.ink} 20%, ${colors.primary})`,
        },
        buttonSecondary: {
          borderRadius: "2px",
          background: `color-mix(in srgb, ${colors.warning} 8%, ${colors.canvas})`,
          border: `1px solid ${colors.hairline}`,
          boxShadow: "1px 1px 0 rgba(0,0,0,0.06)",
        },
        hero: {
          background: `color-mix(in srgb, ${colors.warning} 5%, ${colors.canvasSoft})`,
          borderBottom: `1px dashed color-mix(in srgb, ${colors.ink} 18%, ${colors.hairline})`,
        },
        nav: {
          background: `color-mix(in srgb, ${colors.warning} 4%, ${colors.canvas})`,
          borderBottom: `1px solid ${colors.hairline}`,
        },
        input: {
          borderRadius: "2px",
          border: `1px solid color-mix(in srgb, ${colors.ink} 15%, ${colors.hairline})`,
          background: `color-mix(in srgb, ${colors.warning} 4%, ${colors.canvas})`,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
        },
      };
    case "minimalism":
      return {
        ...base,
        card: {
          border: "none",
          boxShadow: "none",
          background: colors.canvas,
          padding: "32px",
        },
        buttonPrimary: {
          boxShadow: "none",
          borderRadius: "4px",
        },
        buttonSecondary: {
          boxShadow: "none",
          border: "none",
          background: "transparent",
          color: colors.ink,
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        hero: {
          background: colors.canvas,
          borderBottom: "none",
          paddingTop: "48px",
          paddingBottom: "48px",
        },
        nav: {
          borderBottom: "none",
          background: colors.canvas,
        },
        input: {
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderBottom: `1px solid ${colors.hairline}`,
          borderRadius: "0",
          background: "transparent",
          boxShadow: "none",
          paddingLeft: "0",
        },
      };
    case "gaming":
      return {
        ...base,
        card: {
          border: `2px solid color-mix(in srgb, ${colors.primary} 70%, ${colors.ink})`,
          boxShadow: `
            0 0 0 2px color-mix(in srgb, ${colors.primary} 18%, transparent),
            0 8px 0 color-mix(in srgb, ${colors.ink} 35%, transparent),
            0 0 24px color-mix(in srgb, ${colors.primary} 22%, transparent)
          `,
          borderRadius: "10px",
          background: `linear-gradient(180deg, color-mix(in srgb, ${colors.primary} 10%, ${colors.canvasSoft}) 0%, ${colors.canvas} 100%)`,
        },
        buttonPrimary: {
          borderRadius: "8px",
          border: `2px solid ${colors.ink}`,
          boxShadow: `0 4px 0 ${colors.ink}, 0 0 12px color-mix(in srgb, ${colors.primary} 40%, transparent)`,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        },
        buttonSecondary: {
          borderRadius: "8px",
          border: `2px solid ${colors.primary}`,
          background: colors.canvasSoft,
          boxShadow: `0 3px 0 color-mix(in srgb, ${colors.primary} 50%, ${colors.ink})`,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        },
        hero: {
          background: `radial-gradient(circle at 20% 20%, color-mix(in srgb, ${colors.primary} 28%, transparent), transparent 45%), linear-gradient(160deg, ${colors.canvasSoft}, ${colors.canvas})`,
          borderBottom: `3px solid ${colors.primary}`,
        },
        nav: {
          borderBottom: `2px solid ${colors.primary}`,
          background: `color-mix(in srgb, ${colors.primary} 8%, ${colors.canvas})`,
        },
        input: {
          borderRadius: "8px",
          border: `2px solid ${colors.primary}`,
          background: colors.canvasSoft,
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${colors.primary} 20%, transparent)`,
        },
      };
    case "bauhaus":
      return {
        ...base,
        card: {
          border: `3px solid ${colors.ink}`,
          borderRadius: "0",
          boxShadow: "none",
        },
        buttonPrimary: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          boxShadow: "none",
        },
        buttonSecondary: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          background: colors.canvasSoft,
        },
        hero: {
          borderBottom: `6px solid ${colors.primary}`,
        },
        input: {
          borderRadius: "0",
          border: `2px solid ${colors.ink}`,
        },
      };
    case "cyberpunk":
      return {
        ...base,
        card: {
          border: `1px solid ${colors.primary}`,
          clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          boxShadow: `4px 4px 0 ${colors.ink}`,
        },
        buttonPrimary: {
          borderRadius: "0",
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          boxShadow: `3px 3px 0 ${colors.ink}`,
        },
        buttonSecondary: {
          borderRadius: "0",
          border: `1px solid ${colors.primary}`,
        },
        nav: {
          borderBottom: `2px solid ${colors.primary}`,
        },
        input: {
          borderRadius: "0",
          border: `1px solid ${colors.primary}`,
        },
      };
    case "terminal":
      return {
        ...base,
        card: {
          background: "#0b1a12",
          color: "#3dff8a",
          border: "1px solid #1f6b3a",
          borderRadius: "2px",
          boxShadow: "none",
          fontFamily: "ui-monospace, monospace",
        },
        buttonPrimary: {
          background: "#3dff8a",
          color: "#0b1a12",
          borderRadius: "2px",
          boxShadow: "none",
          fontFamily: "ui-monospace, monospace",
          textTransform: "lowercase",
        },
        buttonSecondary: {
          background: "transparent",
          color: "#3dff8a",
          borderRadius: "2px",
          border: "1px solid #3dff8a",
          fontFamily: "ui-monospace, monospace",
        },
        hero: {
          background: "#07140e",
          color: "#3dff8a",
          fontFamily: "ui-monospace, monospace",
          borderBottom: "1px solid #1f6b3a",
        },
        nav: {
          background: "#0b1a12",
          color: "#3dff8a",
          borderBottom: "1px solid #1f6b3a",
          fontFamily: "ui-monospace, monospace",
        },
        input: {
          background: "#07140e",
          color: "#3dff8a",
          borderRadius: "2px",
          border: "1px solid #1f6b3a",
          fontFamily: "ui-monospace, monospace",
        },
      };
    case "comic":
      return {
        ...base,
        card: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `5px 5px 0 ${colors.ink}`,
          borderRadius: "12px",
          background: colors.canvas,
        },
        buttonPrimary: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.ink}`,
          borderRadius: "12px",
        },
        buttonSecondary: {
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 3px 0 ${colors.ink}`,
          borderRadius: "12px",
        },
        hero: {
          backgroundImage: `radial-gradient(${colors.ink} 1.2px, transparent 1.2px)`,
          backgroundSize: "8px 8px",
          backgroundColor: colors.canvasSoft,
          borderBottom: `4px solid ${colors.ink}`,
        },
        nav: {
          borderBottom: `4px solid ${colors.ink}`,
          boxShadow: `0 4px 0 ${colors.ink}`,
        },
        input: {
          border: `3px solid ${colors.ink}`,
          borderRadius: "10px",
        },
      };
    case "memphis":
      return {
        ...base,
        card: {
          border: `3px solid ${colors.ink}`,
          borderRadius: "0 18px 0 18px",
          boxShadow: `8px 8px 0 ${colors.primary}`,
          background: colors.canvasSoft,
        },
        buttonPrimary: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          boxShadow: `4px 4px 0 ${colors.warning}`,
        },
        buttonSecondary: {
          borderRadius: "9999px",
          border: `3px solid ${colors.ink}`,
          background: colors.canvas,
        },
        hero: {
          borderBottom: `6px dotted ${colors.primary}`,
        },
        input: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
        },
      };
    case "vaporwave":
      return {
        ...base,
        card: {
          border: `1px solid color-mix(in srgb, ${colors.primary} 40%, white)`,
          borderRadius: "16px",
          background: `linear-gradient(160deg, color-mix(in srgb, ${colors.primary} 18%, ${colors.canvas}) 0%, color-mix(in srgb, ${colors.primaryHover} 14%, ${colors.canvasSoft}) 100%)`,
          boxShadow: `0 0 24px color-mix(in srgb, ${colors.primary} 25%, transparent)`,
        },
        buttonPrimary: {
          borderRadius: "9999px",
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryHover})`,
          boxShadow: `0 0 18px color-mix(in srgb, ${colors.primary} 45%, transparent)`,
        },
        buttonSecondary: {
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.35)",
          border: `1px solid color-mix(in srgb, ${colors.primary} 40%, white)`,
          color: colors.ink,
          boxShadow: `0 0 12px color-mix(in srgb, ${colors.primaryHover} 25%, transparent)`,
        },
        hero: {
          background: `linear-gradient(180deg, color-mix(in srgb, ${colors.primary} 22%, ${colors.canvasSoft}), ${colors.canvas})`,
        },
        nav: {
          background: `linear-gradient(90deg, color-mix(in srgb, ${colors.primary} 20%, ${colors.canvas}), color-mix(in srgb, ${colors.primaryHover} 18%, ${colors.canvasSoft}))`,
          borderBottom: "none",
        },
        input: {
          borderRadius: "9999px",
          border: `1px solid color-mix(in srgb, ${colors.primary} 35%, ${colors.hairline})`,
          background: "rgba(255,255,255,0.35)",
        },
      };
    case "y2k":
      return {
        ...base,
        card: {
          borderRadius: "24px",
          border: "2px solid rgba(255,255,255,0.7)",
          background: `linear-gradient(180deg, rgba(255,255,255,0.75), ${colors.canvasSoft})`,
          boxShadow: "0 10px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
        },
        buttonPrimary: {
          borderRadius: "9999px",
          background: `linear-gradient(180deg, ${colors.primary}, ${colors.primaryHover})`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 6px 14px rgba(0,0,0,0.15)",
        },
        buttonSecondary: {
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.8)",
        },
        input: {
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(255,255,255,0.9)",
        },
      };
    case "industrial":
      return {
        ...base,
        card: {
          borderRadius: "2px",
          border: `2px solid ${colors.ink}`,
          boxShadow: "none",
          background: colors.canvasSoft,
        },
        buttonPrimary: {
          borderRadius: "2px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          border: `2px solid ${colors.ink}`,
        },
        buttonSecondary: {
          borderRadius: "2px",
          border: `2px solid ${colors.ink}`,
          background: colors.canvas,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        },
        nav: {
          borderBottom: `3px solid ${colors.ink}`,
        },
        input: {
          borderRadius: "2px",
          border: `2px solid ${colors.ink}`,
          fontFamily: "ui-monospace, monospace",
        },
      };
    case "organic":
      return {
        ...base,
        card: {
          borderRadius: "28px 18px 32px 16px",
          border: "none",
          background: `color-mix(in srgb, ${colors.success} 8%, ${colors.canvasSoft})`,
          boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
        },
        buttonPrimary: {
          borderRadius: "9999px 18px 9999px 18px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
        buttonSecondary: {
          borderRadius: "18px 9999px",
          border: "none",
          background: `color-mix(in srgb, ${colors.success} 12%, ${colors.canvas})`,
        },
        hero: {
          background: `radial-gradient(circle at 80% 20%, color-mix(in srgb, ${colors.success} 16%, transparent), transparent 40%), ${colors.canvasSoft}`,
        },
        input: {
          borderRadius: "18px",
          border: "none",
          background: `color-mix(in srgb, ${colors.success} 6%, ${colors.canvas})`,
        },
      };
    case "luxury":
      return {
        ...base,
        card: {
          borderRadius: "0",
          border: `1px solid color-mix(in srgb, ${colors.warning} 55%, ${colors.hairline})`,
          boxShadow: "none",
          background: colors.canvas,
          padding: "28px",
        },
        buttonPrimary: {
          borderRadius: "0",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontSize: "12px",
          boxShadow: "none",
          border: `1px solid color-mix(in srgb, ${colors.warning} 50%, ${colors.primary})`,
        },
        buttonSecondary: {
          borderRadius: "0",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontSize: "12px",
          background: "transparent",
          border: `1px solid color-mix(in srgb, ${colors.warning} 45%, ${colors.ink})`,
        },
        hero: {
          background: colors.canvas,
          borderBottom: `1px solid color-mix(in srgb, ${colors.warning} 45%, ${colors.hairline})`,
        },
        nav: {
          borderBottom: `1px solid color-mix(in srgb, ${colors.warning} 40%, ${colors.hairline})`,
        },
        input: {
          borderRadius: "0",
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderBottom: `1px solid color-mix(in srgb, ${colors.warning} 45%, ${colors.hairline})`,
          background: "transparent",
        },
      };
    case "pastel":
      return {
        ...base,
        card: {
          borderRadius: "20px",
          border: "none",
          background: `color-mix(in srgb, ${colors.primary} 10%, ${colors.canvasSoft})`,
          boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
        },
        buttonPrimary: {
          borderRadius: "9999px",
          background: `color-mix(in srgb, ${colors.primary} 75%, white)`,
          boxShadow: "none",
        },
        buttonSecondary: {
          borderRadius: "9999px",
          border: "none",
          background: `color-mix(in srgb, ${colors.primaryHover} 12%, ${colors.canvas})`,
        },
        hero: {
          background: `linear-gradient(135deg, color-mix(in srgb, ${colors.primary} 12%, ${colors.canvasSoft}), ${colors.canvas})`,
        },
        input: {
          borderRadius: "16px",
          border: "none",
          background: `color-mix(in srgb, ${colors.primary} 8%, ${colors.canvas})`,
        },
      };
    case "pixel":
      return {
        ...base,
        card: {
          borderRadius: "0",
          border: `4px solid ${colors.ink}`,
          boxShadow: `8px 0 0 ${colors.ink}, 0 8px 0 ${colors.ink}, 8px 8px 0 ${colors.ink}`,
          fontFamily: "ui-monospace, monospace",
          imageRendering: "pixelated",
        },
        buttonPrimary: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          boxShadow: `4px 0 0 ${colors.ink}, 0 4px 0 ${colors.ink}`,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "ui-monospace, monospace",
        },
        buttonSecondary: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 0 0 ${colors.hairline}, 0 3px 0 ${colors.hairline}`,
          fontFamily: "ui-monospace, monospace",
        },
        hero: {
          borderBottom: `4px solid ${colors.ink}`,
          fontFamily: "ui-monospace, monospace",
          background: `repeating-linear-gradient(0deg, transparent, transparent 7px, color-mix(in srgb, ${colors.ink} 8%, transparent) 7px 8px)`,
        },
        nav: {
          borderBottom: `4px solid ${colors.ink}`,
          fontFamily: "ui-monospace, monospace",
        },
        input: {
          borderRadius: "0",
          border: `3px solid ${colors.ink}`,
          boxShadow: `3px 0 0 ${colors.ink}, 0 3px 0 ${colors.ink}`,
          fontFamily: "ui-monospace, monospace",
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
    material:
      "Material elevation — layered paper surfaces, soft ambient shadows, and clear hierarchy.",
    swiss:
      "Swiss / International Style — grid discipline, hairline rules, and typographic clarity.",
    outlined:
      "Outlined UI — stroke-first components, open fields, and restrained fills.",
    gradient:
      "Gradient-led surfaces — soft color washes, vivid accents, and atmospheric backgrounds.",
    retro:
      "Retro / vintage energy — chunky borders, offset shadows, and nostalgic contrast.",
    maximalism:
      "Maximalist composition — bold color blocks, layered accents, and high visual density.",
    "soft-ui":
      "Soft UI — airy padding, pill actions, and gentle low-contrast elevation.",
    neon: "Neon accents — glow highlights, electric borders, and high-energy focus states.",
    monochrome:
      "Monochrome system — ink and canvas contrast without decorative color chrome.",
    paper:
      "Paper craft — cream sheet fills, stacked fold shadows, dashed rules, and print-like edges.",
    bauhaus:
      "Bauhaus geometry — hard edges, primary shape language, and strict alignment.",
    cyberpunk:
      "Cyberpunk UI — clipped panels, electric borders, and tech-noir contrast.",
    terminal:
      "Terminal / utility chrome — mono density, tight borders, and operational clarity.",
    comic:
      "Comic energy — thick outlines, offset shadows, and playful punch.",
    minimalism:
      "Minimalism — sparse surfaces, quiet chrome, and generous whitespace.",
    gaming:
      "Gaming / gamification — HUD panels, XP energy, badges, and punchy action chrome.",
    memphis:
      "Memphis — playful geometry, dotted rules, mixed radii, and loud offset accents.",
    vaporwave:
      "Vaporwave — pastel gradients, soft glow, and dreamy retro-futurist surfaces.",
    y2k: "Y2K gloss — bubbly radii, metallic highlights, and shiny optimistic chrome.",
    industrial:
      "Industrial utility — hard edges, uppercase labels, and structural ink borders.",
    organic:
      "Organic forms — irregular soft radii, earthy tints, and calm natural depth.",
    luxury:
      "Luxury restraint — thin metallic rules, generous whitespace, and uppercase CTAs.",
    pastel:
      "Pastel softness — candy tints, pill actions, and gentle low-contrast surfaces.",
    pixel:
      "Pixel / bitmap — square corners, chunky offset shadows, and game-UI crispness.",
  };
  return map[style];
}

export function usesSharpCorners(style: DesignConfig["uiStyle"]): boolean {
  return (
    style === "brutalism" ||
    style === "swiss" ||
    style === "bauhaus" ||
    style === "cyberpunk" ||
    style === "terminal" ||
    style === "minimalism" ||
    style === "paper" ||
    style === "industrial" ||
    style === "pixel" ||
    style === "luxury"
  );
}
