import type { DesignConfig } from "../schema";
import { deriveComponents } from "../derive-components";
import { uiStyleProse } from "../ui-styles";

function moodPhrase(tags: DesignConfig["moodTags"]): string {
  if (tags.length === 0) return "modern and approachable";
  return tags.join(", ").replace(/-/g, " ");
}

function voicePhrase(voices: DesignConfig["brandVoice"]): string {
  if (voices.length === 0) return "clear and direct";
  return voices.join(" and ");
}

function siteTypeLabel(siteType: DesignConfig["siteType"]): string {
  return siteType.replace(/-/g, " ");
}

function siteTypeGuidance(siteType: DesignConfig["siteType"]): string {
  const guidance: Record<DesignConfig["siteType"], string> = {
    marketing: "Structure pages around a hero band, feature cards, and a single primary CTA per viewport.",
    docs: "Favor readable body columns, sidebar navigation, and code-friendly monospace accents.",
    dashboard: "Prioritize data density, surface ladders, and compact spacing in table-heavy views.",
    "e-commerce": "Use consistent product cards, pricing tiers, and category badges across catalog pages.",
    portfolio: "Lead with oversized display type and generous whitespace; let work samples dominate.",
    "landing-page": "Keep navigation minimal and funnel attention to one headline and one conversion action.",
  };
  return guidance[siteType];
}

export function renderOverview(config: DesignConfig): string {
  const opening = config.tagline
    ? `**${config.name}** — ${config.tagline}. ${config.description}`
    : `**${config.name}** — ${config.description}`;

  const audienceLine = config.audience
    ? `Built for **${config.audience}** as a **${siteTypeLabel(config.siteType)}** experience. `
    : `Designed as a **${siteTypeLabel(config.siteType)}** experience. `;

  return `## Overview

${opening}

${audienceLine}Tone is **${voicePhrase(config.brandVoice)}** with a ${moodPhrase(config.moodTags)} visual register. ${siteTypeGuidance(config.siteType)}

**UI style:** ${uiStyleProse(config.uiStyle)}

**Layout patterns:** ${[
    config.layoutPatterns.hero && "hero section",
    config.layoutPatterns.bento && "bento grid",
    config.layoutPatterns.sidebar && "sidebar shell",
    config.layoutPatterns.split && "split hero",
  ]
    .filter(Boolean)
    .join(", ") || "standard content flow"}.

The system anchors on \`{colors.canvas}\` (\`${config.colors.canvas}\`) as the primary surface, with \`{colors.ink}\` (\`${config.colors.ink}\`) for headlines and core text. The brand accent \`{colors.primary}\` (\`${config.colors.primary}\`) is reserved for the single most important action per screen — never used decoratively as a large background fill.

Display typography uses **${config.displayFont}** for hero and headline moments. Body copy uses **${config.bodyFont}** for long-form readability. The type scale follows a **${config.typeScalePreset}** rhythm with ${config.typography.length} defined steps from display to caption.

Cards and interactive elements use \`{rounded.${config.radiusStyle === "pill" ? "pill" : config.radiusStyle === "sharp" ? "sm" : "lg"}}\` corner radii. Spacing follows a strict **${config.spacingBase}px** base unit to maintain vertical rhythm across sections.`;
}

export function renderColors(config: DesignConfig): string {
  const c = config.colors;
  return `## Colors

The palette is built around high-contrast neutrals and a single chromatic accent.

- **Primary (\`${c.primary}\`):** The sole driver for primary actions, links, and critical highlights. Pair with \`{colors.on-primary}\` (\`${c.onPrimary}\`) for text on filled buttons.
- **Canvas (\`${c.canvas}\`):** The default page background and card surface.
- **Canvas Soft (\`${c.canvasSoft}\`):** A secondary surface for feature bands, alternating sections, and subtle containment.
- **Ink (\`${c.ink}\`):** Headlines, body text, and high-emphasis labels.
- **Ink Muted (\`${c.inkMuted}\`):** Secondary text, captions, and metadata.
- **Ink Subtle (\`${c.inkSubtle}\`):** Tertiary text, placeholders, and disabled states.
- **Hairline (\`${c.hairline}\`):** Borders, dividers, and structural rules.
- **Success (\`${c.success}\`):** Positive states and confirmation feedback.
- **Warning (\`${c.warning}\`):** Caution states and non-blocking alerts.
- **Error (\`${c.error}\`):** Destructive actions and validation errors.`;
}

export function renderTypography(config: DesignConfig): string {
  const steps = config.typography
    .map(
      (t) =>
        `- **\`${t.name}\`:** ${t.fontFamily} at ${t.fontSize}, weight ${t.fontWeight}, line-height ${t.lineHeight}${t.letterSpacing ? `, tracking ${t.letterSpacing}` : ""}.`,
    )
    .join("\n");

  return `## Typography

Display type is set in **${config.displayFont}**; body and UI labels use **${config.bodyFont}**. The scale preset is **${config.typeScalePreset}**.

${steps}

Pair display-weight headings with regular-weight body text. Avoid mixing more than two font weights on a single screen.`;
}

export function renderLayout(config: DesignConfig): string {
  return `## Layout

The layout follows a **fixed-max-width grid** capped at ${config.layout.maxWidth} with ${config.layout.gutter} gutters.

Section padding defaults to ${config.layout.sectionPadding} vertical rhythm. Components are grouped using containment principles — related items live inside cards with generous internal padding (\`{spacing.xl}\`).

A strict **${config.spacingBase}px** spacing scale drives all margins, paddings, and gaps:

${Object.entries(config.spacing)
  .map(([k, v]) => `- \`{spacing.${k}}\`: ${v}`)
  .join("\n")}`;
}

export function renderElevation(config: DesignConfig): string {
  const strategies: Record<DesignConfig["elevation"], string> = {
    flat: `Depth is achieved through **color contrast and borders** rather than shadows. Hierarchy relies on the ink ladder and hairline dividers (\`{colors.hairline}\`). Cards use 1px borders instead of drop shadows.`,
    "tonal-layers": `Depth is achieved through **tonal layers** rather than heavy shadows. The background uses \`{colors.canvas-soft}\`, while primary content sits on \`{colors.canvas}\` cards. Alternate section bands create rhythm without decorative effects.`,
    "subtle-shadow": `Depth uses **subtle elevation shadows** on interactive cards and modals. Resting cards carry a soft shadow; hover states lift slightly. Flat sections alternate with elevated panels for hierarchy.`,
  };
  return `## Elevation & Depth\n\n${strategies[config.elevation]}`;
}

export function renderShapes(config: DesignConfig): string {
  const styleDesc: Record<DesignConfig["radiusStyle"], string> = {
    sharp: "Architectural sharpness — minimal corner radii (2–8px) for an engineered, technical feel.",
    soft: "Modern softness — moderate radii (4–16px) that feel approachable without becoming playful.",
    pill: "Generous roundness — large radii (8–24px) with pill-shaped buttons for a friendly, consumer brand voice.",
  };
  const scale = Object.entries(config.rounded)
    .map(([k, v]) => `- \`{rounded.${k}}\`: ${v}`)
    .join("\n");

  return `## Shapes

The shape language is defined by **${config.radiusStyle}** corners. ${styleDesc[config.radiusStyle]}

Radius scale:

${scale}

Buttons use \`{rounded.${config.buttonStyle === "pill" ? "pill" : "md"}}\` corners.`;
}

export function renderComponents(config: DesignConfig): string {
  const derived = deriveComponents(config);
  const blocks = Object.entries(derived).map(([name, tokens]) => {
    const props = Object.entries(tokens)
      .map(([k, v]) => `  - ${k}: \`${v}\``)
      .join("\n");
    return `### \`${name}\`\n\n${props}`;
  });

  return `## Components

The following component tokens are defined for consistent styling. Reference them by name when building UI.

${blocks.join("\n\n")}`;
}

export function renderDosDonts(config: DesignConfig): string {
  const dos = config.dos.map((d) => `- ${d}`).join("\n");
  const donts = config.donts.map((d) => `- ${d}`).join("\n");
  return `## Do's and Don'ts

### Do

${dos}

### Don't

${donts}`;
}

export function renderResponsive(config: DesignConfig): string {
  const rows = config.breakpoints
    .map((bp) => `| ${bp.name} | ${bp.width} | ${bp.changes} |`)
    .join("\n");

  return `## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
${rows}

### Touch Targets

- CTAs hold ≥40px tap height across viewports.
- Form inputs hold ≥44px tap target on touch devices.
- Navigation items hold ≥44px tap target when collapsed to mobile menu.

### Collapsing Strategy

- **Top nav**: links collapse to hamburger below tablet breakpoint.
- **Card grids**: multi-column layouts step down to single column on mobile.
- **Display type**: largest display steps scale down proportionally on small screens.`;
}

export function renderIterationGuide(): string {
  return `## Iteration Guide

1. Focus on ONE component at a time and reference it by its \`components:\` token name.
2. When introducing a section, decide first which surface and spacing tokens it uses.
3. Default body text to \`{typography.body-md}\` at weight 400.
4. Run \`npx @google/design.md lint DESIGN.md\` after edits.
5. Add new variants as separate component entries (e.g. \`button-primary-hover\`).
6. Keep the primary accent scarce — one chromatic voice per screen.`;
}

export function renderAllProse(config: DesignConfig): string {
  return [
    renderOverview(config),
    renderColors(config),
    renderTypography(config),
    renderLayout(config),
    renderElevation(config),
    renderShapes(config),
    renderComponents(config),
    renderDosDonts(config),
    renderResponsive(config),
    renderIterationGuide(),
  ].join("\n\n");
}
