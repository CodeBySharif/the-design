import type { CSSProperties } from "react";
import type { DesignConfig, TypographyStep } from "./schema";

export function getTypographyStep(
  config: DesignConfig,
  name: string,
): TypographyStep | undefined {
  return config.typography.find((step) => step.name === name);
}

export function typographyStyle(step: TypographyStep | undefined): CSSProperties {
  if (!step) return {};
  const isMono = step.name.startsWith("code");
  return {
    fontFamily: isMono
      ? `"${step.fontFamily}", ui-monospace, monospace`
      : `"${step.fontFamily}", sans-serif`,
    fontSize: step.fontSize,
    fontWeight: step.fontWeight,
    lineHeight: step.lineHeight,
    letterSpacing: step.letterSpacing,
  };
}
