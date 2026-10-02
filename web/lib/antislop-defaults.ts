import type { DesignConfig } from "./schema";
import { dialLabel } from "./page-briefs";

/** Antislop-aligned defaults injected into exported Do's / Don'ts. */
export function getAntislopDos(config: Pick<DesignConfig, "dials">): string[] {
  return [
    `Hold dials ENERGY ${config.dials.energy} (${dialLabel("energy", config.dials.energy)}), RHYTHM ${config.dials.rhythm} (${dialLabel("rhythm", config.dials.rhythm)}), MOTION ${config.dials.motion} (${dialLabel("motion", config.dials.motion)}) across every page.`,
    "Write a one-line purpose for every major visual technique (gradient, glow, glass, cards, badges, motion).",
    "Keep one deliberate accent moment per screen. Scarcity makes the accent land.",
    "Ship empty, loading, and error states for any view that shows data.",
    "Every interactive control must do something real, or be removed / labeled Coming soon.",
    "Meet WCAG AA contrast (4.5:1 normal text, 3:1 large text).",
  ];
}

export function getAntislopDonts(): string[] {
  return [
    "Don't use em dashes in UI or marketing copy.",
    "Don't invent statistics, testimonials, compliance claims, or customer logos.",
    "Don't default to blue-purple gradients, glow-everywhere, or glass on every surface.",
    "Don't ship Lucide-style icon rows or sparkle/magic icons as empty decoration.",
    "Don't use generic CTAs (Get Started, Learn More, Try Now, Explore, Discover) when a specific action exists.",
    "Don't clone Linear, Vercel, Stripe, or Notion visuals unless the brief explicitly asks for that reference.",
    "Don't build a hero as title + subtitle + two CTAs + feature card grid by default.",
  ];
}

export function mergeUnique(base: string[], extra: string[]): string[] {
  const seen = new Set(base.map((s) => s.toLowerCase()));
  const out = [...base];
  for (const item of extra) {
    const key = item.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}
