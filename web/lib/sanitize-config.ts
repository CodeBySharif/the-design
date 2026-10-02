import { defaultDesignConfig } from "./defaults";
import {
  brandVoiceSchema,
  designConfigSchema,
  moodTagSchema,
  siteTypeSchema,
  uiStyleSchema,
  type DesignConfig,
} from "./schema";

function pickEnum<T>(
  value: unknown,
  parse: (v: unknown) => { success: boolean; data?: T },
  fallback: T,
): T {
  const result = parse(value);
  return result.success && result.data !== undefined ? result.data : fallback;
}

/** Deep-merge persisted config into defaults and coerce values so export/lint can succeed. */
export function sanitizeDesignConfig(raw: unknown): DesignConfig {
  const input = (raw && typeof raw === "object" ? raw : {}) as Partial<DesignConfig>;
  const defaults = defaultDesignConfig;

  const spacingBaseRaw = input.spacingBase as unknown;
  const spacingBase: 4 | 8 =
    spacingBaseRaw === 4 || spacingBaseRaw === "4"
      ? 4
      : spacingBaseRaw === 8 || spacingBaseRaw === "8"
        ? 8
        : defaults.spacingBase;

  const siteType = pickEnum(input.siteType, (v) => siteTypeSchema.safeParse(v), defaults.siteType);
  const uiStyle = pickEnum(input.uiStyle, (v) => uiStyleSchema.safeParse(v), defaults.uiStyle);

  const moodTags = Array.isArray(input.moodTags)
    ? input.moodTags.filter((t): t is DesignConfig["moodTags"][number] => moodTagSchema.safeParse(t).success)
    : defaults.moodTags;

  const brandVoice = Array.isArray(input.brandVoice)
    ? input.brandVoice
        .filter((t): t is DesignConfig["brandVoice"][number] => brandVoiceSchema.safeParse(t).success)
        .slice(0, 2)
    : defaults.brandVoice;

  const description =
    typeof input.description === "string" && input.description.trim().length > 0
      ? input.description.slice(0, 800)
      : defaults.description;

  const tagline = typeof input.tagline === "string" ? input.tagline.slice(0, 120) : defaults.tagline;

  const name =
    typeof input.name === "string" && input.name.trim().length > 0 ? input.name.trim() : defaults.name;

  const dialLevel = (value: unknown, fallback: 1 | 2 | 3): 1 | 2 | 3 =>
    value === 1 || value === 2 || value === 3 ? value : fallback;

  const inputDials = input.dials && typeof input.dials === "object" ? input.dials : undefined;

  const merged: DesignConfig = {
    ...defaults,
    ...input,
    name,
    tagline,
    description,
    siteType,
    audience: typeof input.audience === "string" ? input.audience.slice(0, 200) : defaults.audience,
    brandVoice: brandVoice.length > 0 ? brandVoice : defaults.brandVoice,
    moodTags: moodTags.length > 0 ? moodTags : defaults.moodTags,
    colors: { ...defaults.colors, ...input.colors },
    displayFont: input.displayFont || defaults.displayFont,
    bodyFont: input.bodyFont || defaults.bodyFont,
    monoFont: input.monoFont || defaults.monoFont,
    typeScalePreset: pickEnum(
      input.typeScalePreset,
      (v) => designConfigSchema.shape.typeScalePreset.safeParse(v),
      defaults.typeScalePreset,
    ),
    typography:
      Array.isArray(input.typography) && input.typography.length > 0
        ? input.typography
        : defaults.typography,
    spacingBase,
    spacing: { ...defaults.spacing, ...input.spacing },
    rounded: { ...defaults.rounded, ...input.rounded },
    radiusStyle: pickEnum(
      input.radiusStyle,
      (v) => designConfigSchema.shape.radiusStyle.safeParse(v),
      defaults.radiusStyle,
    ),
    layout: { ...defaults.layout, ...input.layout },
    layoutPatterns: { ...defaults.layoutPatterns, ...input.layoutPatterns },
    uiStyle,
    dials: {
      energy: dialLevel(inputDials?.energy, defaults.dials.energy),
      rhythm: dialLevel(inputDials?.rhythm, defaults.dials.rhythm),
      motion: dialLevel(inputDials?.motion, defaults.dials.motion),
    },
    pages:
      Array.isArray(input.pages) && input.pages.length > 0
        ? input.pages
            .filter((p): p is DesignConfig["pages"][number] =>
              Boolean(p && typeof p === "object" && typeof p.id === "string" && typeof p.name === "string"),
            )
            .map((p) => ({
              id: String(p.id).slice(0, 80),
              name: String(p.name).slice(0, 80),
              role: typeof p.role === "string" ? p.role.slice(0, 80) : "",
              intent: typeof p.intent === "string" ? p.intent.slice(0, 400) : "",
              composition: typeof p.composition === "string" ? p.composition.slice(0, 400) : "",
              avoid: typeof p.avoid === "string" ? p.avoid.slice(0, 400) : "",
            }))
            .slice(0, 12)
        : defaults.pages,
    elevation: pickEnum(
      input.elevation,
      (v) => designConfigSchema.shape.elevation.safeParse(v),
      defaults.elevation,
    ),
    components: { ...defaults.components, ...input.components },
    buttonStyle: pickEnum(
      input.buttonStyle,
      (v) => designConfigSchema.shape.buttonStyle.safeParse(v),
      defaults.buttonStyle,
    ),
    dos: Array.isArray(input.dos) && input.dos.length > 0 ? input.dos : defaults.dos,
    donts: Array.isArray(input.donts) && input.donts.length > 0 ? input.donts : defaults.donts,
    breakpoints:
      Array.isArray(input.breakpoints) && input.breakpoints.length > 0
        ? input.breakpoints
        : defaults.breakpoints,
    exportFilename:
      typeof input.exportFilename === "string" && input.exportFilename.trim()
        ? input.exportFilename.trim()
        : defaults.exportFilename,
  };

  const parsed = designConfigSchema.safeParse(merged);
  if (parsed.success) return parsed.data;

  // Last resort: defaults win nested objects so schema always passes.
  const fallback = designConfigSchema.safeParse({
    ...defaults,
    name: merged.name,
    tagline: merged.tagline.slice(0, 120),
    description: merged.description.slice(0, 800),
    siteType: defaults.siteType,
    uiStyle: defaults.uiStyle,
    colors: { ...defaults.colors, ...merged.colors },
    components: { ...defaults.components, ...merged.components },
  });
  return fallback.success ? fallback.data : defaults;
}

export function formatConfigIssues(
  error: { issues: Array<{ path: PropertyKey[]; message: string }> },
): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.map(String).join(".") || "config";
    return `${path}: ${issue.message}`;
  });
}
