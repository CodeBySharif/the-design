import type { DesignConfig } from "./schema";

export type ColorTokenKey = keyof DesignConfig["colors"];

export const COLOR_LABELS: Record<
  ColorTokenKey,
  { label: string; description: string; group: "brand" | "background" | "text" | "other" }
> = {
  primary: {
    label: "Accent",
    description: "Main buttons, links, and key actions",
    group: "brand",
  },
  onPrimary: {
    label: "Text on accent",
    description: "Label color sitting on accent buttons",
    group: "brand",
  },
  primaryHover: {
    label: "Accent hover",
    description: "Hovered state for accent buttons",
    group: "brand",
  },
  canvas: {
    label: "Background",
    description: "Main page background",
    group: "background",
  },
  canvasSoft: {
    label: "Section background",
    description: "Hero bands, cards, and alternate sections",
    group: "background",
  },
  ink: {
    label: "Main text",
    description: "Headlines and body copy",
    group: "text",
  },
  inkMuted: {
    label: "Secondary text",
    description: "Captions, metadata, and nav links",
    group: "text",
  },
  inkSubtle: {
    label: "Tertiary text",
    description: "Placeholders and disabled states",
    group: "text",
  },
  hairline: {
    label: "Border",
    description: "Dividers and outlines between elements",
    group: "other",
  },
  success: {
    label: "Success",
    description: "Positive feedback and confirmations",
    group: "other",
  },
  warning: {
    label: "Warning",
    description: "Caution states and alerts",
    group: "other",
  },
  error: {
    label: "Error",
    description: "Errors and destructive actions",
    group: "other",
  },
};

export const COLOR_GROUPS = [
  {
    id: "brand" as const,
    title: "Accent & buttons",
    keys: ["primary", "onPrimary", "primaryHover"] as ColorTokenKey[],
  },
  {
    id: "background" as const,
    title: "Backgrounds",
    keys: ["canvas", "canvasSoft"] as ColorTokenKey[],
  },
  {
    id: "text" as const,
    title: "Text",
    keys: ["ink", "inkMuted", "inkSubtle"] as ColorTokenKey[],
  },
  {
    id: "other" as const,
    title: "Borders & status",
    keys: ["hairline", "success", "warning", "error"] as ColorTokenKey[],
  },
];
