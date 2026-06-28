import { dump as yamlDump } from "js-yaml";
import type { DesignConfig } from "./schema";
import { deriveComponents } from "./derive-components";
import { renderAllProse } from "./prose-templates";

function colorsToYaml(config: DesignConfig) {
  return {
    primary: config.colors.primary,
    "on-primary": config.colors.onPrimary,
    "primary-hover": config.colors.primaryHover,
    canvas: config.colors.canvas,
    "canvas-soft": config.colors.canvasSoft,
    ink: config.colors.ink,
    "ink-muted": config.colors.inkMuted,
    "ink-subtle": config.colors.inkSubtle,
    success: config.colors.success,
    warning: config.colors.warning,
    error: config.colors.error,
    hairline: config.colors.hairline,
  };
}

function typographyToYaml(config: DesignConfig) {
  const result: Record<string, Record<string, string | number>> = {};
  for (const step of config.typography) {
    const entry: Record<string, string | number> = {
      fontFamily: step.fontFamily,
      fontSize: step.fontSize,
      fontWeight: step.fontWeight,
      lineHeight: step.lineHeight,
    };
    if (step.letterSpacing) {
      entry.letterSpacing = step.letterSpacing;
    }
    result[step.name] = entry;
  }
  return result;
}

export function generateDesignMd(config: DesignConfig): string {
  const frontMatter: Record<string, unknown> = {
    version: "alpha",
    name: config.name,
    description: config.description,
    siteType: config.siteType,
    colors: colorsToYaml(config),
    typography: typographyToYaml(config),
    rounded: config.rounded,
    spacing: config.spacing,
    components: deriveComponents(config),
  };

  if (config.brandVoice.length > 0) {
    frontMatter.brandVoice = config.brandVoice;
  }
  frontMatter.uiStyle = config.uiStyle;
  frontMatter.layoutPatterns = config.layoutPatterns;
  if (config.tagline) {
    frontMatter.tagline = config.tagline;
  }
  if (config.audience) {
    frontMatter.audience = config.audience;
  }

  const yamlBlock = yamlDump(frontMatter, {
    lineWidth: 120,
  });

  const prose = renderAllProse(config);

  return `---\n${yamlBlock}---\n\n${prose}\n`;
}
