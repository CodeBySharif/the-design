"use client";

import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { contrastRatio, passesWcagAA } from "@/lib/contrast";
import type { ColorContrastFeedback } from "@/lib/color-contrast-feedback";

interface ColorInputProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  contrastAgainst?: string;
  feedback?: ColorContrastFeedback;
}

export function ColorInput({
  label,
  description,
  value,
  onChange,
  contrastAgainst,
  feedback,
}: ColorInputProps) {
  const [open, setOpen] = useState(false);
  const ratio = contrastAgainst ? contrastRatio(value, contrastAgainst) : null;
  const swatchPass = contrastAgainst ? passesWcagAA(ratio) : null;
  const hasFail = feedback?.status === "fail";

  return (
    <div
      className="space-y-2 rounded-lg border p-3"
      style={{
        borderColor: hasFail ? "var(--color-error)" : "var(--color-hairline)",
        background: hasFail
          ? "color-mix(in srgb, var(--color-error) 10%, var(--color-canvas))"
          : "var(--color-canvas)",
      }}
    >
      <div>
        <label className="ds-label">{label}</label>
        {description && <p className="ds-caption mt-0.5">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="h-10 w-10 shrink-0 rounded-lg border ds-divider shadow-sm"
          style={{ backgroundColor: value }}
          aria-label={`Pick ${label}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ds-input flex-1 font-mono text-sm"
        />
        {contrastAgainst && (
          <div
            className="flex h-10 min-w-10 shrink-0 flex-col items-center justify-center rounded-lg px-1 text-center"
            style={{
              backgroundColor: contrastAgainst,
              color: value,
              border: `2px solid ${swatchPass ? "var(--color-success)" : "var(--color-error)"}`,
            }}
          >
            <span className="text-xs font-bold leading-none">Aa</span>
            <span className="text-[9px] leading-none opacity-80">
              {ratio ? ratio.toFixed(1) : "?"}
            </span>
          </div>
        )}
      </div>

      {feedback && feedback.messages.length > 0 && (
        <ul className="space-y-1">
          {feedback.messages.map((message) => {
            const isFail = message.startsWith("Fails");
            const isPass = message.startsWith("Passes");
            return (
              <li
                key={message}
                className="text-xs leading-snug"
                style={{
                  color: isFail
                    ? "var(--color-error)"
                    : isPass
                      ? "var(--color-success)"
                      : "var(--color-ink-muted)",
                }}
              >
                {message}
              </li>
            );
          })}
        </ul>
      )}

      {open && (
        <div className="pt-2">
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
