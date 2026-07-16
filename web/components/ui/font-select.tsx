"use client";

import { useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { POPULAR_GOOGLE_FONTS } from "@/lib/google-fonts";
import { useGoogleFonts } from "@/lib/use-google-fonts";

interface FontSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function FontSelect({ label, value, onChange }: FontSelectProps) {
  const [open, setOpen] = useState(false);
  const fontsToLoad = useMemo(
    () => (open ? POPULAR_GOOGLE_FONTS.slice(0, 40) : [value]).filter(Boolean),
    [open, value],
  );
  useGoogleFonts(fontsToLoad, `font-select-${label.replace(/\s+/g, "-").toLowerCase()}`);

  return (
    <div className="space-y-2">
      <label className="ds-label">{label}</label>
      <Select.Root value={value} onValueChange={onChange} open={open} onOpenChange={setOpen}>
        <Select.Trigger
          className="group inline-flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 text-left text-sm outline-none transition-[border-color,box-shadow] focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_22%,transparent)] data-[state=open]:border-[var(--color-primary)] data-[placeholder]:opacity-50"
          style={{
            fontFamily: `"${value}", var(--font-body)`,
            background: "var(--comp-text-input-bg, var(--color-canvas))",
            color: "var(--comp-text-input-color, var(--color-ink))",
            borderTop: "1px solid var(--comp-text-input-border, var(--color-hairline))",
            borderRight: "1px solid var(--comp-text-input-border, var(--color-hairline))",
            borderBottom: "1px solid var(--comp-text-input-border, var(--color-hairline))",
            borderLeft: "1px solid var(--comp-text-input-border, var(--color-hairline))",
          }}
          aria-label={label}
        >
          <Select.Value placeholder="Choose a font" className="min-w-0 truncate" />
          <Select.Icon className="shrink-0 opacity-55 transition-transform group-data-[state=open]:rotate-180" aria-hidden>
            <ChevronIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg shadow-lg"
            style={{
              background: "var(--color-canvas)",
              borderTop: "1px solid var(--color-hairline)",
              borderRight: "1px solid var(--color-hairline)",
              borderBottom: "1px solid var(--color-hairline)",
              borderLeft: "1px solid var(--color-hairline)",
              color: "var(--color-ink)",
            }}
          >
            <Select.ScrollUpButton className="flex h-7 items-center justify-center text-xs opacity-60">
              ▲
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {POPULAR_GOOGLE_FONTS.map((font) => (
                <Select.Item
                  key={font}
                  value={font}
                  className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none data-[highlighted]:bg-[var(--color-canvas-soft)] data-[state=checked]:font-semibold"
                  style={{ fontFamily: `"${font}", sans-serif` }}
                >
                  <Select.ItemText>{font}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-3 text-[var(--color-primary)]">
                    ✓
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-7 items-center justify-center text-xs opacity-60">
              ▼
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}
