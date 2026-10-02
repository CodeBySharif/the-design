import type { DesignConfig, PageBrief } from "./schema";

const SHARED_AVOID =
  "Do not invent testimonials, fake stats, or trust badges. Keep decorative chrome quieter than content.";

function brief(
  id: string,
  name: string,
  role: string,
  intent: string,
  composition: string,
  avoid: string = SHARED_AVOID,
): PageBrief {
  return { id, name, role, intent, composition, avoid };
}

/** Default surfaces for a product system. Same tokens, different layouts. */
export function getSystemPages(): PageBrief[] {
  return [
    brief(
      "sign-in",
      "Sign in",
      "auth",
      "One clear next step. Calm contrast. No marketing chrome competing with the form.",
      "Centered or split form. Honest validation. Keyboard-friendly controls. Empty distraction.",
      `${SHARED_AVOID} No hero feature grids. No fake social proof on auth.`,
    ),
    brief(
      "list",
      "List",
      "collection",
      "Help people scan, filter, and open the right record quickly.",
      "Toolbar + table or card list. Dense but readable. Empty, loading, and error states required.",
      `${SHARED_AVOID} Do not restyle list density with landing-page hero patterns.`,
    ),
    brief(
      "detail",
      "Detail",
      "record",
      "Show one record clearly: identity, status, and primary actions.",
      "Header with title/status + body sections. Quiet secondary chrome. One primary action.",
    ),
    brief(
      "settings",
      "Settings",
      "config",
      "Group preferences so people can change one thing without noise.",
      "Sectioned form groups or side nav + panel. Clear save/cancel feedback.",
    ),
  ];
}

export function dialLabel(
  dial: "energy" | "rhythm" | "motion",
  value: 1 | 2 | 3,
): string {
  const labels = {
    energy: { 1: "Calm", 2: "Balanced", 3: "Bold" },
    rhythm: { 1: "Uniform", 2: "Mostly consistent", 3: "Varied" },
    motion: { 1: "Hover only", 2: "Scroll and transitions", 3: "Choreographed" },
  } as const;
  return labels[dial][value];
}

export function buildDesignRead(
  config: Pick<DesignConfig, "audience" | "moodTags" | "dials" | "uiStyle">,
): string {
  const audience = config.audience.trim() || "product teams";
  const mood =
    config.moodTags.length > 0
      ? config.moodTags.join("/").replace(/-/g, " ")
      : config.uiStyle;
  return `Reading this as: a product design system for ${audience}, in a ${mood} register, dial ENERGY ${config.dials.energy} / RHYTHM ${config.dials.rhythm} / MOTION ${config.dials.motion}. Apply the same tokens across every surface; change layout per page job.`;
}

/** @deprecated Use getSystemPages. Kept for older call sites. */
export function getDefaultPagesForSiteType(_siteType?: string): PageBrief[] {
  return getSystemPages();
}
