"use client";

import { POPULAR_GOOGLE_FONTS } from "@/lib/google-fonts";

interface FontSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function FontSelect({ label, value, onChange }: FontSelectProps) {
  return (
    <div className="space-y-2">
      <label className="ds-label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ds-input w-full cursor-pointer appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10 text-sm"
        style={{
          fontFamily: `"${value}", var(--font-body)`,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%2352525b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        {POPULAR_GOOGLE_FONTS.map((font) => (
          <option key={font} value={font} style={{ fontFamily: `"${font}", sans-serif` }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}
