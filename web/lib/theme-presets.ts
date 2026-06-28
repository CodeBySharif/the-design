import type { DesignConfig } from "./schema";
import { autoFixContrast } from "./contrast-fix";
import { buildRoundedScale, getDefaultDontsForMood, getSuggestedDosForIdentity } from "./defaults";
import { buildTypeScale } from "./type-scales";

export type ThemeMood =
  | "light"
  | "dark"
  | "minimal"
  | "editorial"
  | "playful"
  | "professional"
  | "ocean"
  | "forest"
  | "sunset"
  | "midnight"
  | "slate"
  | "amber";

export interface ThemePreset {
  id: string;
  label: string;
  description: string;
  swatch: { primary: string; canvas: string; ink: string };
  moodTags: DesignConfig["moodTags"];
  colors: DesignConfig["colors"];
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  typeScalePreset: DesignConfig["typeScalePreset"];
  uiStyle: DesignConfig["uiStyle"];
  elevation: DesignConfig["elevation"];
  radiusStyle: DesignConfig["radiusStyle"];
}

export interface FontPairing {
  id: string;
  label: string;
  displayFont: string;
  bodyFont: string;
  monoFont: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "light",
    label: "Light",
    description: "Clean white with blue accent.",
    swatch: { primary: "#2563eb", canvas: "#ffffff", ink: "#18181b" },
    moodTags: ["light", "product-focused", "professional"],
    colors: {
      primary: "#2563eb",
      onPrimary: "#ffffff",
      primaryHover: "#1d4ed8",
      canvas: "#ffffff",
      canvasSoft: "#f4f4f5",
      ink: "#18181b",
      inkMuted: "#52525b",
      inkSubtle: "#a1a1aa",
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
      hairline: "#e4e4e7",
    },
    displayFont: "Inter",
    bodyFont: "Inter",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Tinted dark with bright blue accent.",
    swatch: { primary: "#3b82f6", canvas: "#0f0f11", ink: "#fafafa" },
    moodTags: ["dark", "product-focused", "professional"],
    colors: {
      primary: "#3b82f6",
      onPrimary: "#ffffff",
      primaryHover: "#2563eb",
      canvas: "#0f0f11",
      canvasSoft: "#18181b",
      ink: "#fafafa",
      inkMuted: "#a1a1aa",
      inkSubtle: "#71717a",
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
      hairline: "#27272a",
    },
    displayFont: "Inter",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Near-monochrome, ink accent.",
    swatch: { primary: "#171717", canvas: "#fafafa", ink: "#171717" },
    moodTags: ["light", "minimal", "professional"],
    colors: {
      primary: "#171717",
      onPrimary: "#fafafa",
      primaryHover: "#404040",
      canvas: "#fafafa",
      canvasSoft: "#f5f5f5",
      ink: "#171717",
      inkMuted: "#525252",
      inkSubtle: "#737373",
      success: "#15803d",
      warning: "#a16207",
      error: "#b91c1c",
      hairline: "#e5e5e5",
    },
    displayFont: "DM Sans",
    bodyFont: "DM Sans",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "compact",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "sharp",
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Serif headlines, warm neutrals.",
    swatch: { primary: "#1c1917", canvas: "#fafaf9", ink: "#1c1917" },
    moodTags: ["light", "editorial", "professional"],
    colors: {
      primary: "#1c1917",
      onPrimary: "#fafaf9",
      primaryHover: "#44403c",
      canvas: "#fafaf9",
      canvasSoft: "#f5f5f4",
      ink: "#1c1917",
      inkMuted: "#57534e",
      inkSubtle: "#78716c",
      success: "#166534",
      warning: "#a16207",
      error: "#991b1b",
      hairline: "#e7e5e4",
    },
    displayFont: "Playfair Display",
    bodyFont: "Source Sans 3",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "editorial",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "playful",
    label: "Playful",
    description: "Warm cream with coral accent.",
    swatch: { primary: "#f97316", canvas: "#fffbeb", ink: "#292524" },
    moodTags: ["light", "playful", "product-focused"],
    colors: {
      primary: "#f97316",
      onPrimary: "#ffffff",
      primaryHover: "#ea580c",
      canvas: "#fffbeb",
      canvasSoft: "#fef3c7",
      ink: "#292524",
      inkMuted: "#78716c",
      inkSubtle: "#a8a29e",
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
      hairline: "#fde68a",
    },
    displayFont: "Plus Jakarta Sans",
    bodyFont: "Plus Jakarta Sans",
    monoFont: "Fira Code",
    typeScalePreset: "expressive",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "pill",
  },
  {
    id: "professional",
    label: "Professional",
    description: "Navy accent on crisp white.",
    swatch: { primary: "#1e40af", canvas: "#ffffff", ink: "#0f172a" },
    moodTags: ["light", "professional", "product-focused"],
    colors: {
      primary: "#1e40af",
      onPrimary: "#ffffff",
      primaryHover: "#1e3a8a",
      canvas: "#ffffff",
      canvasSoft: "#f8fafc",
      ink: "#0f172a",
      inkMuted: "#475569",
      inkSubtle: "#64748b",
      success: "#15803d",
      warning: "#a16207",
      error: "#b91c1c",
      hairline: "#e2e8f0",
    },
    displayFont: "Inter",
    bodyFont: "Inter",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Cool teal on soft blue-gray.",
    swatch: { primary: "#0d9488", canvas: "#f0fdfa", ink: "#134e4a" },
    moodTags: ["light", "minimal", "product-focused"],
    colors: {
      primary: "#0d9488",
      onPrimary: "#ffffff",
      primaryHover: "#0f766e",
      canvas: "#f0fdfa",
      canvasSoft: "#ccfbf1",
      ink: "#134e4a",
      inkMuted: "#115e59",
      inkSubtle: "#5eead4",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
      hairline: "#99f6e4",
    },
    displayFont: "Manrope",
    bodyFont: "Work Sans",
    monoFont: "JetBrains Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "forest",
    label: "Forest",
    description: "Earthy greens on off-white.",
    swatch: { primary: "#15803d", canvas: "#f7fee7", ink: "#14532d" },
    moodTags: ["light", "editorial", "minimal"],
    colors: {
      primary: "#15803d",
      onPrimary: "#ffffff",
      primaryHover: "#166534",
      canvas: "#f7fee7",
      canvasSoft: "#ecfccb",
      ink: "#14532d",
      inkMuted: "#3f6212",
      inkSubtle: "#65a30d",
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#b91c1c",
      hairline: "#d9f99d",
    },
    displayFont: "Libre Baskerville",
    bodyFont: "Nunito",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "editorial",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Rose and violet on warm blush.",
    swatch: { primary: "#db2777", canvas: "#fff1f2", ink: "#4c0519" },
    moodTags: ["light", "playful", "editorial"],
    colors: {
      primary: "#db2777",
      onPrimary: "#ffffff",
      primaryHover: "#be185d",
      canvas: "#fff1f2",
      canvasSoft: "#fce7f3",
      ink: "#4c0519",
      inkMuted: "#9d174d",
      inkSubtle: "#be185d",
      success: "#15803d",
      warning: "#d97706",
      error: "#dc2626",
      hairline: "#fbcfe8",
    },
    displayFont: "Poppins",
    bodyFont: "Lato",
    monoFont: "Fira Code",
    typeScalePreset: "expressive",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "pill",
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep navy with violet accent.",
    swatch: { primary: "#8b5cf6", canvas: "#0c0a1d", ink: "#ede9fe" },
    moodTags: ["dark", "editorial", "product-focused"],
    colors: {
      primary: "#8b5cf6",
      onPrimary: "#ffffff",
      primaryHover: "#7c3aed",
      canvas: "#0c0a1d",
      canvasSoft: "#1e1b4b",
      ink: "#ede9fe",
      inkMuted: "#c4b5fd",
      inkSubtle: "#8b5cf6",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      hairline: "#312e81",
    },
    displayFont: "Space Grotesk",
    bodyFont: "DM Sans",
    monoFont: "JetBrains Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "slate",
    label: "Slate",
    description: "Cool gray surfaces with indigo accent.",
    swatch: { primary: "#4f46e5", canvas: "#f8fafc", ink: "#0f172a" },
    moodTags: ["light", "professional", "minimal"],
    colors: {
      primary: "#4f46e5",
      onPrimary: "#ffffff",
      primaryHover: "#4338ca",
      canvas: "#f8fafc",
      canvasSoft: "#f1f5f9",
      ink: "#0f172a",
      inkMuted: "#475569",
      inkSubtle: "#64748b",
      success: "#15803d",
      warning: "#a16207",
      error: "#b91c1c",
      hairline: "#e2e8f0",
    },
    displayFont: "Inter",
    bodyFont: "Work Sans",
    monoFont: "IBM Plex Mono",
    typeScalePreset: "balanced",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "soft",
  },
  {
    id: "amber",
    label: "Amber",
    description: "Warm sand with golden accent.",
    swatch: { primary: "#d97706", canvas: "#fffbeb", ink: "#451a03" },
    moodTags: ["light", "playful", "editorial"],
    colors: {
      primary: "#d97706",
      onPrimary: "#ffffff",
      primaryHover: "#b45309",
      canvas: "#fffbeb",
      canvasSoft: "#fef3c7",
      ink: "#451a03",
      inkMuted: "#92400e",
      inkSubtle: "#b45309",
      success: "#15803d",
      warning: "#a16207",
      error: "#dc2626",
      hairline: "#fde68a",
    },
    displayFont: "Nunito",
    bodyFont: "Lato",
    monoFont: "Fira Code",
    typeScalePreset: "expressive",
    uiStyle: "flat",
    elevation: "tonal-layers",
    radiusStyle: "pill",
  },
];

export const FONT_PAIRINGS: FontPairing[] = [
  { id: "inter", label: "Inter / Inter", displayFont: "Inter", bodyFont: "Inter", monoFont: "IBM Plex Mono" },
  {
    id: "editorial",
    label: "Playfair / Source Sans",
    displayFont: "Playfair Display",
    bodyFont: "Source Sans 3",
    monoFont: "IBM Plex Mono",
  },
  {
    id: "geometric",
    label: "Space Grotesk / DM Sans",
    displayFont: "Space Grotesk",
    bodyFont: "DM Sans",
    monoFont: "JetBrains Mono",
  },
  {
    id: "friendly",
    label: "Plus Jakarta",
    displayFont: "Plus Jakarta Sans",
    bodyFont: "Plus Jakarta Sans",
    monoFont: "Fira Code",
  },
  {
    id: "classic",
    label: "Merriweather / Open Sans",
    displayFont: "Merriweather",
    bodyFont: "Open Sans",
    monoFont: "IBM Plex Mono",
  },
  {
    id: "condensed",
    label: "Oswald / Lato",
    displayFont: "Oswald",
    bodyFont: "Lato",
    monoFont: "IBM Plex Mono",
  },
  {
    id: "rounded",
    label: "Poppins / Nunito",
    displayFont: "Poppins",
    bodyFont: "Nunito",
    monoFont: "Fira Code",
  },
  {
    id: "modern",
    label: "Montserrat / Work Sans",
    displayFont: "Montserrat",
    bodyFont: "Work Sans",
    monoFont: "JetBrains Mono",
  },
  {
    id: "literary",
    label: "Libre Baskerville / Raleway",
    displayFont: "Libre Baskerville",
    bodyFont: "Raleway",
    monoFont: "IBM Plex Mono",
  },
  {
    id: "technical",
    label: "Archivo / Manrope",
    displayFont: "Archivo",
    bodyFont: "Manrope",
    monoFont: "JetBrains Mono",
  },
  {
    id: "soft",
    label: "Sora / Outfit",
    displayFont: "Sora",
    bodyFont: "Outfit",
    monoFont: "Fira Code",
  },
  {
    id: "product",
    label: "IBM Plex Sans / Roboto",
    displayFont: "IBM Plex Sans",
    bodyFont: "Roboto",
    monoFont: "JetBrains Mono",
  },
];

export function getThemePreset(id: ThemeMood): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];
}

export function matchThemePreset(config: DesignConfig): string | null {
  const match = THEME_PRESETS.find(
    (preset) =>
      preset.colors.primary === config.colors.primary &&
      preset.colors.canvas === config.colors.canvas &&
      preset.displayFont === config.displayFont,
  );
  return match?.id ?? null;
}

export function applyThemePreset(
  preset: ThemePreset,
  config: DesignConfig,
): Partial<DesignConfig> {
  const colors = autoFixContrast(preset.colors);
  const typography = buildTypeScale(
    preset.typeScalePreset,
    preset.displayFont,
    preset.bodyFont,
    preset.monoFont,
  );

  const next: DesignConfig = {
    ...config,
    moodTags: preset.moodTags,
    colors,
    displayFont: preset.displayFont,
    bodyFont: preset.bodyFont,
    monoFont: preset.monoFont,
    typeScalePreset: preset.typeScalePreset,
    uiStyle: preset.uiStyle,
    elevation: preset.elevation,
    radiusStyle: preset.radiusStyle,
    typography,
    rounded: buildRoundedScale(preset.radiusStyle),
  };

  return {
    moodTags: preset.moodTags,
    colors,
    displayFont: preset.displayFont,
    bodyFont: preset.bodyFont,
    monoFont: preset.monoFont,
    typeScalePreset: preset.typeScalePreset,
    uiStyle: preset.uiStyle,
    elevation: preset.elevation,
    radiusStyle: preset.radiusStyle,
    typography,
    rounded: buildRoundedScale(preset.radiusStyle),
    dos: getSuggestedDosForIdentity(next),
    donts: getDefaultDontsForMood(preset.moodTags),
  };
}

export function applyFontPairing(
  pairing: FontPairing,
  config: DesignConfig,
): Partial<DesignConfig> {
  const typography = buildTypeScale(
    config.typeScalePreset,
    pairing.displayFont,
    pairing.bodyFont,
    pairing.monoFont,
  );
  return {
    displayFont: pairing.displayFont,
    bodyFont: pairing.bodyFont,
    monoFont: pairing.monoFont,
    typography,
  };
}
