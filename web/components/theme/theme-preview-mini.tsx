"use client";

import type { ThemePreset } from "@/lib/theme-presets";

interface ThemePreviewMiniProps {
  preset: ThemePreset;
  selected?: boolean;
  compact?: boolean;
}

export function ThemePreviewMini({ preset, selected, compact }: ThemePreviewMiniProps) {
  const { colors, displayFont } = preset;

  return (
    <div
      className={`overflow-hidden rounded-md border ${compact ? "" : "rounded-lg"}`}
      style={{
        borderColor: selected ? "var(--color-primary)" : colors.hairline,
        boxShadow: selected ? "0 0 0 2px var(--color-primary)" : undefined,
      }}
    >
      <div
        className={`flex items-center justify-between ${compact ? "px-1.5 py-1" : "px-2 py-1.5"}`}
        style={{ background: colors.canvasSoft, borderBottom: `1px solid ${colors.hairline}` }}
      >
        <span
          className={`truncate font-semibold ${compact ? "text-[9px]" : "text-[10px]"}`}
          style={{ color: colors.ink, fontFamily: `"${displayFont}", sans-serif` }}
        >
          Aa
        </span>
        <span
          className={`rounded font-semibold ${compact ? "px-1 py-px text-[7px]" : "px-1.5 py-0.5 text-[8px]"}`}
          style={{ background: colors.primary, color: colors.onPrimary }}
        >
          CTA
        </span>
      </div>
      <div className={`space-y-0.5 ${compact ? "p-1.5" : "space-y-1 p-2"}`} style={{ background: colors.canvas }}>
        <div
          className={`rounded-sm ${compact ? "h-1 w-4/5" : "h-1.5 w-3/4"}`}
          style={{ background: colors.ink, opacity: 0.85 }}
        />
        <div
          className={`rounded-sm ${compact ? "h-0.5 w-full" : "h-1 w-full"}`}
          style={{ background: colors.inkMuted, opacity: 0.6 }}
        />
        {!compact && (
          <div
            className="h-1 w-2/3 rounded-sm"
            style={{ background: colors.inkMuted, opacity: 0.4 }}
          />
        )}
      </div>
      <div className={`flex ${compact ? "h-0.5" : "h-1"}`}>
        <span className="flex-1" style={{ background: colors.primary }} />
        <span className="flex-1" style={{ background: colors.canvasSoft }} />
        <span className="flex-1" style={{ background: colors.ink }} />
      </div>
    </div>
  );
}
