import type { DesignConfig } from "./schema";

export type ComponentToken = Record<string, string>;

export function deriveComponents(config: DesignConfig): Record<string, ComponentToken> {
  const btnRounded =
    config.buttonStyle === "pill" ? "{rounded.pill}" : "{rounded.md}";
  const components: Record<string, ComponentToken> = {};

  if (config.components.buttons) {
    components["button-primary"] = {
      backgroundColor: "{colors.primary}",
      textColor: "{colors.on-primary}",
      typography: "{typography.button-md}",
      rounded: btnRounded,
      padding: "{spacing.md} {spacing.xl}",
    };
    components["button-primary-hover"] = {
      backgroundColor: "{colors.primary-hover}",
      textColor: "{colors.on-primary}",
      typography: "{typography.button-md}",
      rounded: btnRounded,
      padding: "{spacing.md} {spacing.xl}",
    };
    components["button-secondary"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink}",
      typography: "{typography.button-md}",
      rounded: btnRounded,
      padding: "{spacing.md} {spacing.xl}",
    };
    components["button-tertiary"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      borderColor: "{colors.hairline}",
      typography: "{typography.button-md}",
      rounded: btnRounded,
      padding: "{spacing.md} {spacing.xl}",
    };
  }

  if (config.components.cards || config.components.bentoGrid) {
    components["card-content"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-md}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
    components["card-feature"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink}",
      typography: "{typography.body-md}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
  }

  if (config.components.heroSection || config.layoutPatterns.hero) {
    components["hero-band"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink}",
      typography: "{typography.display-xl}",
      padding: "{spacing.3xl} {spacing.xl}",
    };
  }

  if (config.components.bentoGrid || config.layoutPatterns.bento) {
    components["bento-card"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-md}",
      rounded: "{rounded.lg}",
      padding: "{spacing.lg}",
    };
    components["bento-card-featured"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink}",
      typography: "{typography.headline}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
  }

  if (config.components.inputs) {
    components["text-input"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      borderColor: "{colors.hairline}",
      typography: "{typography.body-md}",
      rounded: "{rounded.md}",
      padding: "{spacing.md} {spacing.lg}",
    };
  }

  if (config.components.nav) {
    components["top-nav"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-sm}",
      padding: "{spacing.md} {spacing.xl}",
      height: "56px",
    };
    components["nav-link"] = {
      textColor: "{colors.ink-muted}",
      typography: "{typography.body-sm}",
    };
  }

  if (config.components.footer) {
    components["footer"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink-subtle}",
      typography: "{typography.caption}",
      padding: "{spacing.3xl} {spacing.xl}",
    };
  }

  if (config.components.badges) {
    components["badge-success"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.success}",
      typography: "{typography.caption}",
      rounded: "{rounded.pill}",
      padding: "{spacing.xs} {spacing.md}",
    };
    components["badge-warning"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.warning}",
      typography: "{typography.caption}",
      rounded: "{rounded.pill}",
      padding: "{spacing.xs} {spacing.md}",
    };
    components["badge-error"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.error}",
      typography: "{typography.caption}",
      rounded: "{rounded.pill}",
      padding: "{spacing.xs} {spacing.md}",
    };
  }

  if (config.components.tabs) {
    components["tab-list"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink-muted}",
      typography: "{typography.label-md}",
      rounded: "{rounded.md}",
      padding: "{spacing.xs}",
    };
    components["tab-active"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.label-md}",
      rounded: "{rounded.sm}",
      padding: "{spacing.sm} {spacing.md}",
    };
  }

  if (config.components.modal) {
    components["modal-overlay"] = {
      backgroundColor: "{colors.ink}",
      padding: "{spacing.xl}",
    };
    components["modal-card"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-md}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
  }

  if (config.components.table) {
    components["table-header"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink-muted}",
      typography: "{typography.label-md}",
      padding: "{spacing.md} {spacing.lg}",
    };
    components["table-cell"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-sm}",
      padding: "{spacing.md} {spacing.lg}",
    };
  }

  if (config.components.tooltip) {
    components["tooltip"] = {
      backgroundColor: "{colors.ink}",
      textColor: "{colors.canvas}",
      typography: "{typography.caption}",
      rounded: "{rounded.sm}",
      padding: "{spacing.xs} {spacing.sm}",
    };
  }

  if (config.components.avatar) {
    components["avatar"] = {
      backgroundColor: "{colors.canvas-soft}",
      textColor: "{colors.ink}",
      typography: "{typography.label-md}",
      rounded: "{rounded.full}",
      size: "40px",
    };
  }

  if (config.components.pricingCard) {
    components["pricing-card"] = {
      backgroundColor: "{colors.canvas}",
      textColor: "{colors.ink}",
      typography: "{typography.body-md}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
    components["pricing-card-featured"] = {
      backgroundColor: "{colors.primary}",
      textColor: "{colors.on-primary}",
      typography: "{typography.headline}",
      rounded: "{rounded.lg}",
      padding: "{spacing.xl}",
    };
  }

  return components;
}
