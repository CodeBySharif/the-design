"use client";

import type { CSSProperties } from "react";
import type { DesignConfig } from "@/lib/schema";

type Colors = DesignConfig["colors"];
type Style = DesignConfig["uiStyle"];

/** Always set all four sides so React never removes borderBottom while borderColor remains. */
function edges(
  bottom: string,
  extras?: { top?: string; left?: string; right?: string },
): Pick<CSSProperties, "borderTop" | "borderRight" | "borderBottom" | "borderLeft"> {
  return {
    borderTop: extras?.top ?? "none",
    borderRight: extras?.right ?? "none",
    borderBottom: bottom,
    borderLeft: extras?.left ?? "none",
  };
}

/** Distinctive chrome strip so every UI style reads unique even without HeroBand. */
export function StyleSignature({
  style,
  colors,
}: {
  style: Style;
  colors: Colors;
}): CSSProperties {
  const ink = colors.ink;
  const primary = colors.primary;
  const soft = colors.canvasSoft;
  const canvas = colors.canvas;

  switch (style) {
    case "flat":
      return { background: soft, ...edges(`1px solid ${colors.hairline}`) };
    case "skeuomorphism":
      return {
        background: `linear-gradient(180deg, ${soft} 0%, ${canvas} 100%)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
        ...edges(`1px solid ${colors.hairline}`),
      };
    case "brutalism":
      return {
        background: primary,
        color: colors.onPrimary,
        ...edges(`4px solid ${ink}`),
      };
    case "glassmorphism":
      return {
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        ...edges("1px solid rgba(255,255,255,0.35)"),
      };
    case "neomorphism":
      return {
        background: soft,
        boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.08), inset -4px -4px 8px rgba(255,255,255,0.7)",
        ...edges("none"),
      };
    case "claymorphism":
      return {
        background: `color-mix(in srgb, ${primary} 18%, ${soft})`,
        boxShadow: "inset 0 -6px 12px rgba(255,255,255,0.45)",
        ...edges("none"),
      };
    case "material":
      return {
        background: canvas,
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        ...edges("none"),
      };
    case "swiss":
      return {
        background: canvas,
        ...edges(`1px solid ${ink}`, { top: `6px solid ${primary}` }),
      };
    case "outlined":
      return {
        background: "transparent",
        ...edges(`2px solid ${ink}`, { top: `2px solid ${ink}` }),
      };
    case "gradient":
      return {
        background: `linear-gradient(90deg, ${primary}, ${colors.primaryHover}, ${soft})`,
        color: colors.onPrimary,
        ...edges("none"),
      };
    case "retro":
      return {
        background: soft,
        boxShadow: `0 4px 0 ${primary}`,
        ...edges(`3px double ${ink}`),
      };
    case "maximalism":
      return {
        background: `repeating-linear-gradient(90deg, ${primary} 0 12px, ${colors.primaryHover} 12px 24px)`,
        ...edges(`4px solid ${ink}`),
      };
    case "soft-ui":
      return {
        background: soft,
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        ...edges("none"),
      };
    case "neon":
      return {
        background: ink,
        color: canvas,
        boxShadow: `0 0 18px color-mix(in srgb, ${primary} 55%, transparent)`,
        ...edges(`1px solid ${primary}`),
      };
    case "monochrome":
      return {
        background: ink,
        color: canvas,
        ...edges(`2px solid ${canvas}`),
      };
    case "paper":
      return {
        background: `color-mix(in srgb, ${colors.warning} 8%, ${canvas})`,
        ...edges(`1px dashed color-mix(in srgb, ${ink} 25%, ${colors.hairline})`),
      };
    case "bauhaus":
      return {
        background: canvas,
        backgroundImage: `linear-gradient(90deg, ${primary} 0 33%, ${colors.warning} 33% 66%, ${colors.success} 66% 100%)`,
        backgroundSize: "100% 8px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        ...edges(`8px solid ${ink}`),
      };
    case "cyberpunk":
      return {
        background: ink,
        color: primary,
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)",
        ...edges(`2px solid ${primary}`),
      };
    case "terminal":
      return {
        background: "#0b1a12",
        color: "#3dff8a",
        fontFamily: "ui-monospace, monospace",
        ...edges("1px solid #1f6b3a"),
      };
    case "comic":
      return {
        background: soft,
        boxShadow: `0 4px 0 ${ink}`,
        backgroundImage: `radial-gradient(${ink} 1px, transparent 1px)`,
        backgroundSize: "6px 6px",
        ...edges(`4px solid ${ink}`),
      };
    case "minimalism":
      return {
        background: canvas,
        paddingTop: 4,
        paddingBottom: 4,
        ...edges("none"),
      };
    case "gaming":
      return {
        background: `linear-gradient(90deg, color-mix(in srgb, ${primary} 35%, ${ink}), ${ink})`,
        color: colors.onPrimary,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        ...edges(`3px solid ${primary}`),
      };
    case "memphis":
      return {
        background: soft,
        backgroundImage: `
          linear-gradient(45deg, ${primary} 25%, transparent 25%),
          linear-gradient(-45deg, ${colors.warning} 25%, transparent 25%)
        `,
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 8px 0",
        ...edges(`6px dotted ${primary}`),
      };
    case "vaporwave":
      return {
        background: `linear-gradient(90deg, #ff71ce, #01cdfe, #b967ff)`,
        color: "#fff",
        boxShadow: "0 0 20px rgba(185,103,255,0.45)",
        ...edges("none"),
      };
    case "y2k":
      return {
        background: `linear-gradient(180deg, rgba(255,255,255,0.95), ${soft})`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,1)",
        ...edges("2px solid rgba(255,255,255,0.9)"),
      };
    case "industrial":
      return {
        background: soft,
        backgroundImage: `repeating-linear-gradient(-45deg, ${ink} 0 8px, ${colors.warning} 8px 16px)`,
        backgroundSize: "100% 10px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        ...edges(`4px solid ${ink}`),
      };
    case "organic":
      return {
        background: `color-mix(in srgb, ${colors.success} 14%, ${soft})`,
        borderRadius: "0 0 28px 18px",
        ...edges("none"),
      };
    case "luxury":
      return {
        background: canvas,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        ...edges(`1px solid color-mix(in srgb, ${colors.warning} 55%, ${colors.hairline})`, {
          top: `1px solid color-mix(in srgb, ${colors.warning} 55%, ${colors.hairline})`,
        }),
      };
    case "pastel":
      return {
        background: `color-mix(in srgb, ${primary} 16%, ${soft})`,
        ...edges("none"),
      };
    case "pixel":
      return {
        background: soft,
        boxShadow: `4px 4px 0 ${ink}`,
        imageRendering: "pixelated",
        fontFamily: "ui-monospace, monospace",
        ...edges(`4px solid ${ink}`),
      };
    default:
      return { background: soft, ...edges(`1px solid ${colors.hairline}`) };
  }
}

export function styleSignatureLabel(style: Style): string {
  return style.replace(/-/g, " ");
}
