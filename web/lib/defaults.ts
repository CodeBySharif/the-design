import type { DesignConfig } from "./schema";
import { buildTypeScale } from "./type-scales";

const displayFont = "Inter";
const bodyFont = "Inter";
const monoFont = "IBM Plex Mono";

export const defaultDesignConfig: DesignConfig = {
  name: "My Design System",
  tagline: "",
  description:
    "A clean, modern design system built for product websites with clear hierarchy and accessible contrast.",
  siteType: "marketing",
  audience: "",
  brandVoice: [],
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

  displayFont,
  bodyFont,
  monoFont,
  typeScalePreset: "balanced",
  typography: buildTypeScale("balanced", displayFont, bodyFont, monoFont),

  spacingBase: 8,
  spacing: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },

  rounded: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    pill: "9999px",
    full: "9999px",
  },
  radiusStyle: "soft",

  layout: {
    maxWidth: "1200px",
    gutter: "24px",
    sectionPadding: "64px",
  },

  layoutPatterns: {
    hero: true,
    bento: false,
    sidebar: false,
    split: false,
  },
  uiStyle: "flat",

  elevation: "tonal-layers",

  components: {
    buttons: true,
    cards: true,
    inputs: true,
    nav: true,
    footer: true,
    badges: true,
    tabs: false,
    modal: false,
    table: false,
    tooltip: false,
    avatar: false,
    pricingCard: false,
    bentoGrid: false,
    heroSection: true,
  },
  buttonStyle: "rounded-rect",

  dos: [
    "Use `{colors.primary}` only for the single most important action per screen.",
    "Maintain WCAG AA contrast ratios (4.5:1 for normal text).",
    "Use the spacing scale consistently — avoid arbitrary pixel values.",
    "Pair display weight headings with regular-weight body text.",
  ],
  donts: [
    "Don't use more than two font weights on a single screen.",
    "Don't mix rounded and sharp corners in the same view.",
    "Don't use the primary color as a large background fill.",
    "Don't introduce colors outside the defined palette.",
  ],

  breakpoints: [
    { name: "Desktop", width: "1280px", changes: "Default multi-column layout" },
    { name: "Tablet", width: "1024px", changes: "Card grids reduce to 2 columns" },
    { name: "Mobile", width: "768px", changes: "Single column; nav collapses to hamburger" },
    { name: "Mobile-Sm", width: "480px", changes: "Display type scales down; touch targets grow" },
  ],

  exportFilename: "DESIGN.md",
};

export function getDefaultDosForMood(moodTags: DesignConfig["moodTags"]): string[] {
  const dos = [...defaultDesignConfig.dos];
  if (moodTags.includes("dark")) {
    dos.push("Reserve the darkest canvas token as the anchor surface.");
  }
  if (moodTags.includes("editorial")) {
    dos.push("Use generous whitespace and large display type for hero sections.");
  }
  if (moodTags.includes("minimal")) {
    dos.push("Limit decorative elements — let typography and spacing carry hierarchy.");
  }
  return dos;
}

export function getDefaultDontsForMood(moodTags: DesignConfig["moodTags"]): string[] {
  const donts = [...defaultDesignConfig.donts];
  if (moodTags.includes("dark")) {
    donts.push("Don't use pure #000000 as the canvas — prefer a tinted dark surface.");
  }
  if (moodTags.includes("product-focused")) {
    donts.push("Don't add atmospheric gradients that compete with product screenshots.");
  }
  return donts;
}

const SITE_TYPE_DOS: Record<DesignConfig["siteType"], string> = {
  marketing: "Lead with a hero band and a single primary CTA per viewport.",
  docs: "Prioritize readable body type and clear heading hierarchy for long-form content.",
  dashboard: "Default to compact spacing and a surface ladder in data-dense views.",
  "e-commerce": "Make product cards and pricing tiers visually consistent across the catalog.",
  portfolio: "Let large display type and generous whitespace carry the narrative.",
  "landing-page": "Keep the page focused — one message, one primary action, minimal nav.",
};

const BRAND_VOICE_DOS: Record<DesignConfig["brandVoice"][number], string> = {
  formal: "Use restrained language and consistent typographic hierarchy — avoid casual phrasing.",
  friendly: "Favor approachable spacing and warm secondary surfaces over stark contrast.",
  technical: "Use mono labels for metadata and keep UI chrome precise and understated.",
  bold: "Allow display type to dominate hero sections — one strong headline per screen.",
  calm: "Limit chromatic accents to one per view and favor muted ink steps for secondary text.",
  playful: "Use rounded shapes and accent color sparingly for moments of delight, not decoration.",
};

export function getSuggestedDosForIdentity(
  config: Pick<DesignConfig, "moodTags" | "siteType" | "brandVoice">,
): string[] {
  const dos = getDefaultDosForMood(config.moodTags);
  const siteDo = SITE_TYPE_DOS[config.siteType];
  if (siteDo && !dos.includes(siteDo)) {
    dos.push(siteDo);
  }
  for (const voice of config.brandVoice) {
    const voiceDo = BRAND_VOICE_DOS[voice];
    if (voiceDo && !dos.includes(voiceDo)) {
      dos.push(voiceDo);
    }
  }
  return dos;
}

export function buildSpacingScale(base: 4 | 8): Record<string, string> {
  const unit = base;
  return {
    xxs: `${unit / 4}px`,
    xs: `${unit / 2}px`,
    sm: `${unit}px`,
    md: `${unit * 2}px`,
    lg: `${unit * 3}px`,
    xl: `${unit * 4}px`,
    "2xl": `${unit * 6}px`,
    "3xl": `${unit * 8}px`,
  };
}

export function buildRoundedScale(style: "sharp" | "soft" | "pill"): Record<string, string> {
  if (style === "sharp") {
    return { none: "0px", sm: "2px", md: "4px", lg: "6px", xl: "8px", pill: "9999px", full: "9999px" };
  }
  if (style === "pill") {
    return { none: "0px", sm: "8px", md: "12px", lg: "16px", xl: "24px", pill: "9999px", full: "9999px" };
  }
  return { none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", pill: "9999px", full: "9999px" };
}
