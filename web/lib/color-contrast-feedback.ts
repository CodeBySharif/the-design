import { contrastRatio, passesWcagAA } from "./contrast";
import { COLOR_LABELS, type ColorTokenKey } from "./color-labels";
import {
  getColorContrastPairs,
  pairContrastStatus,
  type ContrastPair,
} from "./contrast-pairs";
import type { DesignConfig } from "./schema";

export interface ColorContrastFeedback {
  status: "pass" | "fail" | "info";
  messages: string[];
}

export function getContrastFeedbackForColor(
  key: ColorTokenKey,
  colors: DesignConfig["colors"],
): ColorContrastFeedback {
  const pairs = getColorContrastPairs(colors).filter((p) => p.colorKeys.includes(key));

  if (pairs.length === 0) {
    return { status: "info", messages: ["No contrast pair checks for this token."] };
  }

  const messages = pairs.map((pair) => formatPairMessage(key, pair, colors));
  const hasFail = pairs.some((p) => !pairContrastStatus(p).pass);

  return {
    status: hasFail ? "fail" : "pass",
    messages,
  };
}

function formatPairMessage(
  key: ColorTokenKey,
  pair: ContrastPair,
  colors: DesignConfig["colors"],
): string {
  const { ratio, pass } = pairContrastStatus(pair);
  const ratioText = ratio !== null ? `${ratio.toFixed(2)}:1` : "?";
  const otherKey = pair.colorKeys.find((k) => k !== key) ?? pair.colorKeys[0];
  const a = COLOR_LABELS[key].label;
  const b = COLOR_LABELS[otherKey].label;
  const role =
    colors[key] === pair.foreground
      ? `${a} on ${b}`
      : `${b} with ${a}`;

  if (pass) {
    return `Passes WCAG AA (4.5:1) — ${role} · ${ratioText}`;
  }
  return `Fails WCAG AA (4.5:1) — ${role} · ${ratioText} — adjust ${a} or ${b}`;
}

export function getFailingPairSummaries(colors: DesignConfig["colors"]): string[] {
  return getColorContrastPairs(colors)
    .filter((p) => !pairContrastStatus(p).pass)
    .map((pair) => {
      const { ratio } = pairContrastStatus(pair);
      const ratioText = ratio !== null ? `${ratio.toFixed(2)}:1` : "?";
      return `${pair.label} (${ratioText}) — change ${pair.colorKeys.map((k) => COLOR_LABELS[k].label).join(" or ")}`;
    });
}
