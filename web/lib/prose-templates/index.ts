import type { DesignConfig } from "../schema";
import { deriveComponents } from "../derive-components";
import { uiStyleProse } from "../ui-styles";
import { buildDesignRead, dialLabel } from "../page-briefs";

function moodPhrase(tags: DesignConfig["moodTags"]): string {
  if (tags.length === 0) return "modern and approachable";
  return tags.join(", ").replace(/-/g, " ");
}

function voicePhrase(voices: DesignConfig["brandVoice"]): string {
  if (voices.length === 0) return "clear and direct";
  return voices.join(" and ");
}

export function renderOverview(config: DesignConfig): string {
  const opening = config.tagline
    ? `**${config.name}** - ${config.tagline}. ${config.description}`
    : `**${config.name}** - ${config.description}`;

  const audienceLine = config.audience
    ? `Built for **${config.audience}**. `
    : "";

  const designRead = buildDesignRead(config);

  return `## Overview

${opening}

${audienceLine}This file is a **product design system**, not a single page template. Tone is **${voicePhrase(config.brandVoice)}** with a ${moodPhrase(config.moodTags)} visual register. Every surface (sign-in, list, detail, settings, and more) must reuse the same color, typography, radius, spacing, and component tokens. Layout and density change per page job; brand language does not.

**Design read:** ${designRead}

**Dials:** ENERGY ${config.dials.energy} (${dialLabel("energy", config.dials.energy)}) / RHYTHM ${config.dials.rhythm} (${dialLabel("rhythm", config.dials.rhythm)}) / MOTION ${config.dials.motion} (${dialLabel("motion", config.dials.motion)}). Hold these dials across the product.

**UI style:** ${uiStyleProse(config.uiStyle)} Use this technique only when it serves hierarchy or identity; write the purpose down before shipping a flourish.

The system anchors on \`{colors.canvas}\` (\`${config.colors.canvas}\`) as the primary surface, with \`{colors.ink}\` (\`${config.colors.ink}\`) for headlines and core text. The brand accent \`{colors.primary}\` (\`${config.colors.primary}\`) is reserved for the single most important action per screen, never used decoratively as a large background fill.

Display typography uses **${config.displayFont}** for hero and headline moments. Body copy uses **${config.bodyFont}** for long-form readability. The type scale follows a **${config.typeScalePreset}** rhythm with ${config.typography.length} defined steps from display to caption.

Cards and interactive elements use \`{rounded.${config.radiusStyle === "pill" ? "pill" : config.radiusStyle === "sharp" ? "sm" : "lg"}}\` corner radii. Spacing follows a strict **${config.spacingBase}px** base unit to maintain vertical rhythm across sections.`;
}

export function renderPages(config: DesignConfig): string {
  if (config.pages.length === 0) {
    return `## Surfaces

Treat this DESIGN.md as the shared visual language for the whole product. Compose each screen from the page's job (auth, list, detail, settings), not from a single landing-page template.`;
  }

  const blocks = config.pages
    .map((page) => {
      const lines = [
        `### ${page.name}`,
        "",
        `- **Role:** ${page.role || "unspecified"}`,
        `- **Intent:** ${page.intent || "Define the job of this surface in one sentence."}`,
        `- **Composition:** ${page.composition || "One focal point per screen; reuse system tokens."}`,
      ];
      if (page.avoid.trim()) {
        lines.push(`- **Avoid:** ${page.avoid}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");

  return `## Surfaces

These are product surfaces that share one design system. Reuse the same tokens everywhere; only composition and density change.

${blocks}`;
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
- **Error (\`${c.error}\`):** Destructive actions and validation errors.

Do not invent decorative gradients or glow treatments unless the brand direction requires them and the purpose is written down.`;
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

Pair display-weight headings with regular-weight body text. Avoid mixing more than two font weights on a single screen. Choose type for brand character, not because it is a default AI stack.`;
}

export function renderLayout(config: DesignConfig): string {
  const rhythmNote =
    config.dials.rhythm === 3
      ? "RHYTHM is 3: sections must visibly vary in composition."
      : config.dials.rhythm === 1
        ? "RHYTHM is 1: uniformity is intentional; keep section structure calm and predictable."
        : "RHYTHM is 2: keep a consistent system with a few deliberate breaks.";

  return `## Layout

The layout follows a **fixed-max-width grid** capped at ${config.layout.maxWidth} with ${config.layout.gutter} gutters.

Section padding defaults to ${config.layout.sectionPadding} vertical rhythm. Components are grouped using containment principles. Related items live inside cards with generous internal padding (\`{spacing.xl}\`) only when containment helps interaction or understanding.

${rhythmNote}

A strict **${config.spacingBase}px** spacing scale drives all margins, paddings, and gaps:

${Object.entries(config.spacing)
  .map(([k, v]) => `- \`{spacing.${k}}\`: ${v}`)
  .join("\n")}`;
}

export function renderElevation(config: DesignConfig): string {
  const strategies: Record<DesignConfig["elevation"], string> = {
    flat: `Depth is achieved through **color contrast and borders** rather than shadows. Hierarchy relies on the ink ladder and hairline dividers (\`{colors.hairline}\`). Cards use 1px borders instead of drop shadows.`,
    "tonal-layers": `Depth is achieved through **tonal layers** rather than heavy shadows. The background uses \`{colors.canvas-soft}\`, while primary content sits on \`{colors.canvas}\` cards. Alternate section bands create rhythm without decorative effects.`,
    "subtle-shadow": `Depth uses **subtle elevation shadows** on interactive cards and modals. Resting cards carry a soft shadow; hover states lift slightly. Flat sections alternate with elevated panels for hierarchy. Do not soft-shadow every element.`,
  };
  return `## Elevation & Depth\n\n${strategies[config.elevation]}`;
}

export function renderShapes(config: DesignConfig): string {
  const styleDesc: Record<DesignConfig["radiusStyle"], string> = {
    sharp: "Architectural sharpness: minimal corner radii (2–8px) for an engineered, technical feel.",
    soft: "Modern softness: moderate radii (4–16px) that feel approachable without becoming playful.",
    pill: "Generous roundness: large radii (8–24px). Reserve pill shapes for primary CTAs or true status chips, not every control.",
  };
  const scale = Object.entries(config.rounded)
    .map(([k, v]) => `- \`{rounded.${k}}\`: ${v}`)
    .join("\n");

  return `## Shapes

The shape language is defined by **${config.radiusStyle}** corners. ${styleDesc[config.radiusStyle]}

Radius scale:

${scale}

Buttons use \`{rounded.${config.buttonStyle === "pill" ? "pill" : "md"}}\` corners. Do not make every element pill-shaped.`;
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
- **Display type**: largest display steps scale down proportionally on small screens.

Mobile layout is part of the design, not an afterthought. No horizontal overflow, clipped cards, or unusable navbar.`;
}

export function renderIterationGuide(config: DesignConfig): string {
  const motionNote =
    config.dials.motion === 1
      ? "MOTION 1: hover/focus only. Do not add scroll choreography."
      : config.dials.motion === 2
        ? "MOTION 2: light scroll-reveal and transitions that guide attention."
        : "MOTION 3: intentional choreography is allowed, but every motion needs a UX purpose.";

  return `## Iteration Guide

1. Read the **Design read** and **Surfaces** briefs before generating any screen.
2. Reuse the same color, type, radius, and component tokens on every surface.
3. Focus on ONE component at a time and reference it by its \`components:\` token name.
4. When introducing a section, decide first which surface and spacing tokens it uses, and write one line for why.
5. Default body text to \`{typography.body-md}\` at weight 400.
6. ${motionNote}
7. Run \`npx @google/design.md lint DESIGN.md\` after edits.
8. Add new variants as separate component entries (e.g. \`button-primary-hover\`).
9. Keep the primary accent scarce: one chromatic voice per screen.
10. Before delivery: verify keyboard focus, contrast, and empty/loading/error states.`;
}

export function renderAllProse(config: DesignConfig): string {
  return [
    renderOverview(config),
    renderPages(config),
    renderColors(config),
    renderTypography(config),
    renderLayout(config),
    renderElevation(config),
    renderShapes(config),
    renderComponents(config),
    renderDosDonts(config),
    renderResponsive(config),
    renderIterationGuide(config),
  ].join("\n\n");
}
