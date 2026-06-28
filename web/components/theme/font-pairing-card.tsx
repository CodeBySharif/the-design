"use client";

import type { FontPairing } from "@/lib/theme-presets";
import { useGoogleFonts } from "@/lib/use-google-fonts";

interface FontPairingCardProps {
  pairing: FontPairing;
  selected?: boolean;
  onSelect: () => void;
}

export function FontPairingCard({ pairing, selected, onSelect }: FontPairingCardProps) {
  useGoogleFonts([pairing.displayFont, pairing.bodyFont, pairing.monoFont]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`ds-template-card w-full ${selected ? "ds-template-card-selected" : ""}`}
    >
      <p
        className="text-base font-bold leading-tight"
        style={{ fontFamily: `"${pairing.displayFont}", sans-serif` }}
      >
        {pairing.displayFont}
      </p>
      <p
        className="ds-caption mt-1 line-clamp-2"
        style={{ fontFamily: `"${pairing.bodyFont}", sans-serif`, color: "var(--color-ink-muted)" }}
      >
        {pairing.bodyFont} for body
      </p>
      <p
        className="mt-2 truncate font-mono text-[10px]"
        style={{ color: "var(--color-ink-subtle)" }}
      >
        {pairing.monoFont}
      </p>
    </button>
  );
}
