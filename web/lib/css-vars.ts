import type { DesignConfig } from "./schema";

export function configToCssVars(config: DesignConfig): Record<string, string> {
  const vars: Record<string, string> = {
    "--color-primary": config.colors.primary,
    "--color-on-primary": config.colors.onPrimary,
    "--color-primary-hover": config.colors.primaryHover,
    "--color-canvas": config.colors.canvas,
    "--color-canvas-soft": config.colors.canvasSoft,
    "--color-ink": config.colors.ink,
    "--color-ink-muted": config.colors.inkMuted,
    "--color-ink-subtle": config.colors.inkSubtle,
    "--color-success": config.colors.success,
    "--color-warning": config.colors.warning,
    "--color-error": config.colors.error,
    "--color-hairline": config.colors.hairline,
    "--font-display": `"${config.displayFont}", system-ui, sans-serif`,
    "--font-body": `"${config.bodyFont}", system-ui, sans-serif`,
    "--layout-max-width": config.layout.maxWidth,
    "--layout-gutter": config.layout.gutter,
    "--radius-md": config.rounded.md ?? "8px",
    "--radius-lg": config.rounded.lg ?? "12px",
    "--radius-pill": config.rounded.pill ?? "9999px",
    "--spacing-md": config.spacing.md ?? "16px",
    "--spacing-xl": config.spacing.xl ?? "32px",
  };

  for (const step of config.typography) {
    const key = step.name.replace(/-/g, "-");
    vars[`--type-${key}-size`] = step.fontSize;
    vars[`--type-${key}-weight`] = String(step.fontWeight);
    vars[`--type-${key}-line`] =
      typeof step.lineHeight === "number" ? String(step.lineHeight) : step.lineHeight;
    vars[`--type-${key}-font`] = step.fontFamily.includes(config.displayFont)
      ? vars["--font-display"]
      : vars["--font-body"];
  }

  return vars;
}

export function googleFontsUrl(config: DesignConfig): string {
  const fonts = new Set([config.displayFont, config.bodyFont, config.monoFont]);
  const families = Array.from(fonts)
    .map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800;900`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
