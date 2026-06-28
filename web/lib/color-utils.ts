/** Normalize user/preset hex to #rrggbb, or null if invalid. */
export function normalizeHex(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const raw = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) return null;

  if (raw.length === 3) {
    const expanded = raw
      .split("")
      .map((c) => c + c)
      .join("");
    return `#${expanded.toLowerCase()}`;
  }

  return `#${raw.toLowerCase()}`;
}

export function normalizeColorRecord<T extends Record<string, string>>(colors: T): T {
  const next = { ...colors };
  for (const key of Object.keys(next) as (keyof T)[]) {
    const normalized = normalizeHex(next[key]);
    if (normalized) next[key] = normalized as T[keyof T];
  }
  return next;
}
