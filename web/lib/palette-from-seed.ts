import { autoFixContrast, isLightBackground } from "./contrast-fix";
import type { DesignConfig } from "./schema";

export type ColorRole = "primary" | "canvas" | "ink";

export interface SeedRoleMap {
  primary: string | null;
  canvas: string | null;
  ink: string | null;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length === 3) {
    return [
      parseInt(normalized[0] + normalized[0], 16),
      parseInt(normalized[1] + normalized[1], 16),
      parseInt(normalized[2] + normalized[2], 16),
    ];
  }
  if (normalized.length === 6) {
    return [
      parseInt(normalized.slice(0, 2), 16),
      parseInt(normalized.slice(2, 4), 16),
      parseInt(normalized.slice(4, 6), 16),
    ];
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}

function mixHex(a: string, b: string, weightB: number): string {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return a;
  const w = Math.max(0, Math.min(1, weightB));
  return rgbToHex(
    rgbA[0] * (1 - w) + rgbB[0] * w,
    rgbA[1] * (1 - w) + rgbB[1] * w,
    rgbA[2] * (1 - w) + rgbB[2] * w,
  );
}

function darken(hex: string, amount = 0.12): string {
  return mixHex(hex, "#000000", amount);
}

function lighten(hex: string, amount = 0.35): string {
  return mixHex(hex, "#ffffff", amount);
}

function textOnAccent(accent: string): string {
  return isLightBackground(accent) ? "#171717" : "#ffffff";
}

function textOnBackground(background: string): string {
  return isLightBackground(background) ? "#171717" : "#fafafa";
}

function mapSignature(map: SeedRoleMap): string {
  return `${map.primary ?? "-"}|${map.canvas ?? "-"}|${map.ink ?? "-"}`;
}

function emptyMap(): SeedRoleMap {
  return { primary: null, canvas: null, ink: null };
}

function withRoles(
  primary: string | null,
  canvas: string | null,
  ink: string | null,
): SeedRoleMap {
  return { primary, canvas, ink };
}

const ROLE_PAIRS: [ColorRole, ColorRole][] = [
  ["primary", "canvas"],
  ["primary", "ink"],
  ["canvas", "ink"],
];

const NEUTRAL_LIGHT_BG = "#f4f4f5";
const NEUTRAL_DARK_BG = "#18181b";
const NEUTRAL_LIGHT_TEXT = "#171717";
const NEUTRAL_DARK_TEXT = "#fafafa";

/**
 * 3 seeds → only permutations/combos of those 3 hex values.
 * 2 seeds → combos of the 2; missing role gets a generated companion color.
 * 1 seed  → that color on one role; other roles get generated companions.
 */
export function enumerateSeedRoleMaps(seeds: string[]): SeedRoleMap[] {
  const colors = normalizeSeedColors(seeds);
  const maps: SeedRoleMap[] = [];
  const seen = new Set<string>();

  const add = (map: SeedRoleMap) => {
    const key = mapSignature(map);
    if (seen.has(key)) return;
    seen.add(key);
    maps.push(map);
  };

  if (colors.length === 0) return [];

  if (colors.length === 1) {
    const [a] = colors;
    add(withRoles(a, null, null));
    add(withRoles(null, a, null));
    add(withRoles(null, null, a));
    return maps;
  }

  if (colors.length === 2) {
    const [a, b] = colors;
    for (const [roleA, roleB] of ROLE_PAIRS) {
      const m1 = emptyMap();
      m1[roleA] = a;
      m1[roleB] = b;
      add(m1);
      const m2 = emptyMap();
      m2[roleA] = b;
      m2[roleB] = a;
      add(m2);
    }
    return maps;
  }

  const [a, b, c] = colors;
  const permutations: [string, string, string][] = [
    [a, b, c],
    [a, c, b],
    [b, a, c],
    [b, c, a],
    [c, a, b],
    [c, b, a],
  ];

  for (const [primary, canvas, ink] of permutations) {
    add(withRoles(primary, canvas, ink));
  }

  return maps;
}

function unusedSeed(
  pool: string[],
  map: SeedRoleMap,
): string | undefined {
  const used = new Set(
    [map.primary, map.canvas, map.ink].filter((v): v is string => Boolean(v)),
  );
  return pool.find((s) => !used.has(s));
}

/** Generate a companion color when fewer than 3 seeds were picked. */
function generateCompanionColor(
  role: ColorRole,
  map: SeedRoleMap,
  seeds: string[],
): string {
  const pool = normalizeSeedColors(seeds);
  const anchor =
    map.primary ?? map.canvas ?? map.ink ?? pool[0] ?? NEUTRAL_LIGHT_TEXT;

  switch (role) {
    case "primary":
      if (map.canvas) {
        return isLightBackground(map.canvas) ? darken(anchor, 0.18) : lighten(anchor, 0.25);
      }
      if (map.ink) {
        return isLightBackground(map.ink) ? darken(anchor, 0.22) : lighten(anchor, 0.3);
      }
      return anchor;

    case "canvas":
      if (map.primary) {
        return isLightBackground(map.primary)
          ? lighten(mixHex(map.primary, "#ffffff", 0.7), 0.15)
          : darken(mixHex(map.primary, "#000000", 0.55), 0.35);
      }
      if (map.ink) {
        return isLightBackground(map.ink) ? NEUTRAL_LIGHT_BG : NEUTRAL_DARK_BG;
      }
      return isLightBackground(anchor) ? NEUTRAL_LIGHT_BG : NEUTRAL_DARK_BG;

    case "ink":
      if (map.canvas) {
        return textOnBackground(map.canvas);
      }
      if (map.primary) {
        return isLightBackground(map.primary) ? NEUTRAL_LIGHT_TEXT : NEUTRAL_DARK_TEXT;
      }
      return isLightBackground(anchor) ? NEUTRAL_LIGHT_TEXT : NEUTRAL_DARK_TEXT;

    default:
      return anchor;
  }
}

function resolveRoles(
  map: SeedRoleMap,
  seeds: string[],
): { primary: string; canvas: string; ink: string; generated: ColorRole[] } {
  const pool = normalizeSeedColors(seeds);
  const strictThree = pool.length >= 3;
  const generated: ColorRole[] = [];

  let primary = map.primary;
  let canvas = map.canvas;
  let ink = map.ink;

  if (strictThree) {
    primary = primary ?? unusedSeed(pool, { ...map, primary: null })!;
    canvas = canvas ?? unusedSeed(pool, { ...map, canvas: null })!;
    ink = ink ?? unusedSeed(pool, { ...map, ink: null })!;
    return { primary, canvas, ink, generated };
  }

  if (!primary) {
    primary = generateCompanionColor("primary", map, pool);
    generated.push("primary");
  }
  if (!canvas) {
    canvas = generateCompanionColor("canvas", { ...map, primary }, pool);
    generated.push("canvas");
  }
  if (!ink) {
    ink = generateCompanionColor("ink", { primary, canvas, ink: map.ink }, pool);
    generated.push("ink");
  }

  return { primary, canvas, ink, generated };
}

export function applySeedRoleMap(
  base: DesignConfig["colors"],
  map: SeedRoleMap,
  seeds: string[],
): DesignConfig["colors"] {
  const { primary, canvas, ink } = resolveRoles(map, seeds);

  const colors = {
    ...base,
    primary,
    onPrimary: textOnAccent(primary),
    primaryHover: darken(primary),
    canvas,
    canvasSoft: isLightBackground(canvas) ? lighten(canvas, 0.18) : lighten(canvas, 0.12),
    hairline: isLightBackground(canvas)
      ? mixHex(canvas, "#000000", 0.1)
      : mixHex(canvas, "#ffffff", 0.12),
    ink,
    inkMuted: isLightBackground(canvas)
      ? mixHex(ink, "#ffffff", 0.42)
      : mixHex(ink, "#000000", 0.32),
    inkSubtle: isLightBackground(canvas)
      ? mixHex(ink, "#ffffff", 0.62)
      : mixHex(ink, "#000000", 0.48),
  };

  return autoFixContrast(colors);
}

const ROLE_LABELS: Record<ColorRole, string> = {
  primary: "accent",
  canvas: "background",
  ink: "main text",
};

export function describeSeedRoleMap(map: SeedRoleMap, seeds: string[]): string {
  const labels = ["Color 1", "Color 2", "Color 3"];
  const pool = normalizeSeedColors(seeds);

  const colorLabel = (hex: string | null) => {
    if (!hex) return null;
    const idx = pool.indexOf(hex);
    return idx >= 0 ? labels[idx] : null;
  };

  const parts: string[] = [];

  const describeRole = (role: ColorRole, hex: string | null) => {
    const fromUser = colorLabel(hex);
    if (fromUser) {
      parts.push(`${fromUser} → ${ROLE_LABELS[role]}`);
    } else if (pool.length < 3) {
      parts.push(`${ROLE_LABELS[role]} added to complement your palette`);
    }
  };

  describeRole("primary", map.primary);
  describeRole("canvas", map.canvas);
  describeRole("ink", map.ink);

  if (parts.length === 0) return "Mixed from your palette";

  if (pool.length >= 3) {
    return `${parts.join(" · ")} (only your 3 colors)`;
  }

  return parts.join(" · ");
}

export function normalizeSeedColors(seeds: string[]): string[] {
  return seeds.filter(Boolean).slice(0, 3);
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** @deprecated Use applySeedRoleMap with a role map instead. */
export function applySeedColorsToPalette(
  base: DesignConfig["colors"],
  seeds: string[],
): DesignConfig["colors"] {
  const maps = enumerateSeedRoleMaps(seeds);
  if (maps.length === 0) return { ...base };
  return applySeedRoleMap(base, maps[0], seeds);
}
