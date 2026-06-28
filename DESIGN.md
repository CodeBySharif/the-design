---
version: alpha
name: My Design System
description: A clean, modern design system built for product websites with clear hierarchy and accessible contrast.
siteType: marketing
colors:
  primary: '#0d9488'
  on-primary: '#000000'
  primary-hover: '#0f766e'
  canvas: '#f0fdfa'
  canvas-soft: '#ccfbf1'
  ink: '#134e4a'
  ink-muted: '#115e59'
  ink-subtle: '#737373'
  success: '#6e6e6e'
  warning: '#6e6e6e'
  error: '#b91c1c'
  hairline: '#99f6e4'
typography:
  display-mega:
    fontFamily: Libre Baskerville
    fontSize: 96px
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.04em
  display-xl:
    fontFamily: Libre Baskerville
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.03em
  display-lg:
    fontFamily: Libre Baskerville
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-md:
    fontFamily: Libre Baskerville
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
  body-lg:
    fontFamily: Raleway
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Raleway
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Raleway
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Raleway
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  label-md:
    fontFamily: Raleway
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.06em
  button-md:
    fontFamily: Raleway
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
  code-sm:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.md} {spacing.xl}'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.on-primary}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.md} {spacing.xl}'
  button-secondary:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.ink}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.md} {spacing.xl}'
  button-tertiary:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink}'
    borderColor: '{colors.hairline}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.md} {spacing.xl}'
  card-content:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink}'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
    padding: '{spacing.xl}'
  card-feature:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.ink}'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
    padding: '{spacing.xl}'
  hero-band:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.ink}'
    typography: '{typography.display-xl}'
    padding: '{spacing.3xl} {spacing.xl}'
  text-input:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink}'
    borderColor: '{colors.hairline}'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.md} {spacing.lg}'
  top-nav:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink}'
    typography: '{typography.body-sm}'
    padding: '{spacing.md} {spacing.xl}'
    height: 56px
  nav-link:
    textColor: '{colors.ink-muted}'
    typography: '{typography.body-sm}'
  footer:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.ink-subtle}'
    typography: '{typography.caption}'
    padding: '{spacing.3xl} {spacing.xl}'
  badge-success:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.success}'
    typography: '{typography.caption}'
    rounded: '{rounded.pill}'
    padding: '{spacing.xs} {spacing.md}'
  badge-warning:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.warning}'
    typography: '{typography.caption}'
    rounded: '{rounded.pill}'
    padding: '{spacing.xs} {spacing.md}'
  badge-error:
    backgroundColor: '{colors.canvas-soft}'
    textColor: '{colors.error}'
    typography: '{typography.caption}'
    rounded: '{rounded.pill}'
    padding: '{spacing.xs} {spacing.md}'
uiStyle: flat
layoutPatterns:
  hero: true
  bento: false
  sidebar: false
  split: false
---

## Overview

**My Design System** — A clean, modern design system built for product websites with clear hierarchy and accessible contrast.

Designed as a **marketing** experience. Tone is **clear and direct** with a light, minimal, product focused visual register. Structure pages around a hero band, feature cards, and a single primary CTA per viewport.

**UI style:** Flat design — clean surfaces, token-driven color, and minimal decorative depth.

**Layout patterns:** hero section.

The system anchors on `{colors.canvas}` (`#f0fdfa`) as the primary surface, with `{colors.ink}` (`#134e4a`) for headlines and core text. The brand accent `{colors.primary}` (`#0d9488`) is reserved for the single most important action per screen — never used decoratively as a large background fill.

Display typography uses **Libre Baskerville** for hero and headline moments. Body copy uses **Raleway** for long-form readability. The type scale follows a **editorial** rhythm with 11 defined steps from display to caption.

Cards and interactive elements use `{rounded.lg}` corner radii. Spacing follows a strict **8px** base unit to maintain vertical rhythm across sections.

## Colors

The palette is built around high-contrast neutrals and a single chromatic accent.

- **Primary (`#0d9488`):** The sole driver for primary actions, links, and critical highlights. Pair with `{colors.on-primary}` (`#000000`) for text on filled buttons.
- **Canvas (`#f0fdfa`):** The default page background and card surface.
- **Canvas Soft (`#ccfbf1`):** A secondary surface for feature bands, alternating sections, and subtle containment.
- **Ink (`#134e4a`):** Headlines, body text, and high-emphasis labels.
- **Ink Muted (`#115e59`):** Secondary text, captions, and metadata.
- **Ink Subtle (`#737373`):** Tertiary text, placeholders, and disabled states.
- **Hairline (`#99f6e4`):** Borders, dividers, and structural rules.
- **Success (`#6e6e6e`):** Positive states and confirmation feedback.
- **Warning (`#6e6e6e`):** Caution states and non-blocking alerts.
- **Error (`#b91c1c`):** Destructive actions and validation errors.

## Typography

Display type is set in **Libre Baskerville**; body and UI labels use **Raleway**. The scale preset is **editorial**.

- **`display-mega`:** Libre Baskerville at 96px, weight 900, line-height 1, tracking -0.04em.
- **`display-xl`:** Libre Baskerville at 64px, weight 800, line-height 1.05, tracking -0.03em.
- **`display-lg`:** Libre Baskerville at 48px, weight 700, line-height 1.1, tracking -0.02em.
- **`display-md`:** Libre Baskerville at 36px, weight 600, line-height 1.15.
- **`body-lg`:** Raleway at 20px, weight 400, line-height 1.6.
- **`body-md`:** Raleway at 16px, weight 400, line-height 1.6.
- **`body-sm`:** Raleway at 14px, weight 400, line-height 1.5.
- **`caption`:** Raleway at 12px, weight 400, line-height 1.4.
- **`label-md`:** Raleway at 13px, weight 600, line-height 1.3, tracking 0.06em.
- **`button-md`:** Raleway at 16px, weight 600, line-height 1.2.
- **`code-sm`:** IBM Plex Mono at 13px, weight 400, line-height 1.5.

Pair display-weight headings with regular-weight body text. Avoid mixing more than two font weights on a single screen.

## Layout

The layout follows a **fixed-max-width grid** capped at 1200px with 24px gutters.

Section padding defaults to 64px vertical rhythm. Components are grouped using containment principles — related items live inside cards with generous internal padding (`{spacing.xl}`).

A strict **8px** spacing scale drives all margins, paddings, and gaps:

- `{spacing.xxs}`: 2px
- `{spacing.xs}`: 4px
- `{spacing.sm}`: 8px
- `{spacing.md}`: 16px
- `{spacing.lg}`: 24px
- `{spacing.xl}`: 32px
- `{spacing.2xl}`: 48px
- `{spacing.3xl}`: 64px

## Elevation & Depth

Depth is achieved through **tonal layers** rather than heavy shadows. The background uses `{colors.canvas-soft}`, while primary content sits on `{colors.canvas}` cards. Alternate section bands create rhythm without decorative effects.

## Shapes

The shape language is defined by **soft** corners. Modern softness — moderate radii (4–16px) that feel approachable without becoming playful.

Radius scale:

- `{rounded.none}`: 0px
- `{rounded.sm}`: 4px
- `{rounded.md}`: 8px
- `{rounded.lg}`: 12px
- `{rounded.xl}`: 16px
- `{rounded.pill}`: 9999px
- `{rounded.full}`: 9999px

Buttons use `{rounded.md}` corners.

## Components

The following component tokens are defined for consistent styling. Reference them by name when building UI.

### `button-primary`

  - backgroundColor: `{colors.primary}`
  - textColor: `{colors.on-primary}`
  - typography: `{typography.button-md}`
  - rounded: `{rounded.md}`
  - padding: `{spacing.md} {spacing.xl}`

### `button-primary-hover`

  - backgroundColor: `{colors.primary-hover}`
  - textColor: `{colors.on-primary}`
  - typography: `{typography.button-md}`
  - rounded: `{rounded.md}`
  - padding: `{spacing.md} {spacing.xl}`

### `button-secondary`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.ink}`
  - typography: `{typography.button-md}`
  - rounded: `{rounded.md}`
  - padding: `{spacing.md} {spacing.xl}`

### `button-tertiary`

  - backgroundColor: `{colors.canvas}`
  - textColor: `{colors.ink}`
  - borderColor: `{colors.hairline}`
  - typography: `{typography.button-md}`
  - rounded: `{rounded.md}`
  - padding: `{spacing.md} {spacing.xl}`

### `card-content`

  - backgroundColor: `{colors.canvas}`
  - textColor: `{colors.ink}`
  - typography: `{typography.body-md}`
  - rounded: `{rounded.lg}`
  - padding: `{spacing.xl}`

### `card-feature`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.ink}`
  - typography: `{typography.body-md}`
  - rounded: `{rounded.lg}`
  - padding: `{spacing.xl}`

### `hero-band`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.ink}`
  - typography: `{typography.display-xl}`
  - padding: `{spacing.3xl} {spacing.xl}`

### `text-input`

  - backgroundColor: `{colors.canvas}`
  - textColor: `{colors.ink}`
  - borderColor: `{colors.hairline}`
  - typography: `{typography.body-md}`
  - rounded: `{rounded.md}`
  - padding: `{spacing.md} {spacing.lg}`

### `top-nav`

  - backgroundColor: `{colors.canvas}`
  - textColor: `{colors.ink}`
  - typography: `{typography.body-sm}`
  - padding: `{spacing.md} {spacing.xl}`
  - height: `56px`

### `nav-link`

  - textColor: `{colors.ink-muted}`
  - typography: `{typography.body-sm}`

### `footer`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.ink-subtle}`
  - typography: `{typography.caption}`
  - padding: `{spacing.3xl} {spacing.xl}`

### `badge-success`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.success}`
  - typography: `{typography.caption}`
  - rounded: `{rounded.pill}`
  - padding: `{spacing.xs} {spacing.md}`

### `badge-warning`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.warning}`
  - typography: `{typography.caption}`
  - rounded: `{rounded.pill}`
  - padding: `{spacing.xs} {spacing.md}`

### `badge-error`

  - backgroundColor: `{colors.canvas-soft}`
  - textColor: `{colors.error}`
  - typography: `{typography.caption}`
  - rounded: `{rounded.pill}`
  - padding: `{spacing.xs} {spacing.md}`

## Do's and Don'ts

### Do

- Use `{colors.primary}` only for the single most important action per screen.
- Maintain WCAG AA contrast ratios (4.5:1 for normal text).
- Use the spacing scale consistently — avoid arbitrary pixel values.
- Pair display weight headings with regular-weight body text.
- Limit decorative elements — let typography and spacing carry hierarchy.
- Lead with a hero band and a single primary CTA per viewport.

### Don't

- Don't use more than two font weights on a single screen.
- Don't mix rounded and sharp corners in the same view.
- Don't use the primary color as a large background fill.
- Don't introduce colors outside the defined palette.
- Don't add atmospheric gradients that compete with product screenshots.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop | 1280px | Default multi-column layout |
| Tablet | 1024px | Card grids reduce to 2 columns |
| Mobile | 768px | Single column; nav collapses to hamburger |
| Mobile-Sm | 480px | Display type scales down; touch targets grow |

### Touch Targets

- CTAs hold ≥40px tap height across viewports.
- Form inputs hold ≥44px tap target on touch devices.
- Navigation items hold ≥44px tap target when collapsed to mobile menu.

### Collapsing Strategy

- **Top nav**: links collapse to hamburger below tablet breakpoint.
- **Card grids**: multi-column layouts step down to single column on mobile.
- **Display type**: largest display steps scale down proportionally on small screens.

## Iteration Guide

1. Focus on ONE component at a time and reference it by its `components:` token name.
2. When introducing a section, decide first which surface and spacing tokens it uses.
3. Default body text to `{typography.body-md}` at weight 400.
4. Run `npx @google/design.md lint DESIGN.md` after edits.
5. Add new variants as separate component entries (e.g. `button-primary-hover`).
6. Keep the primary accent scarce — one chromatic voice per screen.
