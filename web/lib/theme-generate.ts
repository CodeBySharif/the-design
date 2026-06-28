import {
  applySeedRoleMap,
  enumerateSeedRoleMaps,
  normalizeSeedColors,
  shuffle,
  type SeedRoleMap,
} from "./palette-from-seed";
import { autoFixContrast } from "./contrast-fix";
import { POPULAR_GOOGLE_FONTS } from "./google-fonts";
import {
  FONT_PAIRINGS,
  THEME_PRESETS,
  type FontPairing,
  type ThemePreset,
} from "./theme-presets";
import type { DesignConfig } from "./schema";

export const THEME_BATCH_SIZE = 12;
export const FONT_PAIRING_BATCH_SIZE = 12;

const TYPE_SCALES = ["compact", "balanced", "editorial", "expressive"] as const;
const MONO_FONTS = ["IBM Plex Mono", "JetBrains Mono", "Fira Code"] as const;

const SANS_FONTS = POPULAR_GOOGLE_FONTS.filter(
  (f) => !(MONO_FONTS as readonly string[]).includes(f),
);

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function comboSignature(parts: string[]): string {
  return parts.join("|");
}

function buildMixedTheme(
  index: number,
  seeds: string[],
  roleMap: SeedRoleMap | null,
): ThemePreset | null {
  const colorPreset = pickRandom(THEME_PRESETS);
  const fontPairing = pickRandom(FONT_PAIRINGS);
  const typeScalePreset = pickRandom(TYPE_SCALES);
  const radiusPreset = pickRandom(THEME_PRESETS);

  const normalizedSeeds = normalizeSeedColors(seeds);
  const colors =
    roleMap && normalizedSeeds.length > 0
      ? applySeedRoleMap(colorPreset.colors, roleMap, normalizedSeeds)
      : autoFixContrast({ ...colorPreset.colors });

  return {
    id: `mix-${index}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: normalizedSeeds.length > 0 ? `Combo ${index}` : `Mix ${index}`,
    description: `${colorPreset.label} colors · ${fontPairing.label} · ${typeScalePreset} scale`,
    swatch: {
      primary: colors.primary,
      canvas: colors.canvas,
      ink: colors.ink,
    },
    moodTags: colorPreset.moodTags,
    colors,
    displayFont: fontPairing.displayFont,
    bodyFont: fontPairing.bodyFont,
    monoFont: fontPairing.monoFont,
    typeScalePreset,
    uiStyle: colorPreset.uiStyle,
    elevation: colorPreset.elevation,
    radiusStyle: radiusPreset.radiusStyle,
  };
}

function roleMapsForBatch(seeds: string[], count: number): (SeedRoleMap | null)[] {
  const normalized = normalizeSeedColors(seeds);
  if (normalized.length === 0) {
    return Array.from({ length: count }, () => null);
  }

  const maps = shuffle(enumerateSeedRoleMaps(normalized));
  const slots: SeedRoleMap[] = [];

  for (let i = 0; i < count; i += 1) {
    slots.push(maps[i % maps.length]);
  }

  return shuffle(slots);
}

export function generateRandomThemeBatch(
  count = THEME_BATCH_SIZE,
  seeds: string[] = [],
): ThemePreset[] {
  const normalizedSeeds = normalizeSeedColors(seeds);
  const roleSlots = roleMapsForBatch(normalizedSeeds, count);
  const batch: ThemePreset[] = [];
  const seen = new Set<string>();
  let attempts = 0;

  while (batch.length < count && attempts < 400) {
    attempts += 1;
    const roleMap = normalizedSeeds.length > 0 ? roleSlots[batch.length] ?? pickRandom(enumerateSeedRoleMaps(normalizedSeeds)) : null;

    const theme = buildMixedTheme(batch.length + 1, normalizedSeeds, roleMap);
    if (!theme) continue;

    const signature = comboSignature([
      theme.colors.primary,
      theme.colors.canvas,
      theme.colors.ink,
      roleMap ? mapSignature(roleMap) : "base",
      theme.displayFont,
      theme.bodyFont,
      theme.typeScalePreset,
    ]);

    if (seen.has(signature)) continue;
    seen.add(signature);
    batch.push(theme);
  }

  return batch;
}

function mapSignature(map: SeedRoleMap): string {
  return `${map.primary ?? "-"}|${map.canvas ?? "-"}|${map.ink ?? "-"}`;
}

export function generateThemeBatchFromSeeds(seeds: string[], count = THEME_BATCH_SIZE): ThemePreset[] {
  const normalized = normalizeSeedColors(seeds);
  if (normalized.length === 0) {
    return THEME_PRESETS;
  }
  return generateRandomThemeBatch(count, normalized);
}

export function generateRandomFontPairingBatch(count = FONT_PAIRING_BATCH_SIZE): FontPairing[] {
  const batch: FontPairing[] = [];
  const seen = new Set<string>();
  let attempts = 0;

  while (batch.length < count && attempts < 300) {
    attempts += 1;

    const displayFont = pickRandom(SANS_FONTS);
    const bodyFont = pickRandom(SANS_FONTS);
    const monoFont = pickRandom(MONO_FONTS);
    const signature = comboSignature([displayFont, bodyFont, monoFont]);

    if (seen.has(signature)) continue;
    seen.add(signature);

    const index = batch.length + 1;
    const label =
      displayFont === bodyFont ? displayFont : `${displayFont} / ${bodyFont}`;

    batch.push({
      id: `pair-${index}-${Date.now()}`,
      label,
      displayFont,
      bodyFont,
      monoFont,
    });
  }

  return batch;
}

export function themePresetMatchesConfig(
  preset: ThemePreset,
  config: DesignConfig,
): boolean {
  return (
    preset.colors.primary === config.colors.primary &&
    preset.colors.canvas === config.colors.canvas &&
    preset.colors.ink === config.colors.ink &&
    preset.displayFont === config.displayFont &&
    preset.bodyFont === config.bodyFont &&
    preset.typeScalePreset === config.typeScalePreset &&
    preset.radiusStyle === config.radiusStyle
  );
}

export function fontPairingMatchesConfig(
  pairing: FontPairing,
  config: DesignConfig,
): boolean {
  return (
    pairing.displayFont === config.displayFont &&
    pairing.bodyFont === config.bodyFont &&
    pairing.monoFont === config.monoFont
  );
}
