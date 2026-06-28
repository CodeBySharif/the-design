import { z } from "zod";

export const moodTagSchema = z.enum([
  "dark",
  "light",
  "editorial",
  "product-focused",
  "minimal",
  "playful",
  "professional",
]);

export const siteTypeSchema = z.enum([
  "marketing",
  "docs",
  "dashboard",
  "e-commerce",
  "portfolio",
  "landing-page",
]);

export const brandVoiceSchema = z.enum([
  "formal",
  "friendly",
  "technical",
  "bold",
  "calm",
  "playful",
]);

export const uiStyleSchema = z.enum([
  "flat",
  "skeuomorphism",
  "brutalism",
  "glassmorphism",
  "neomorphism",
  "claymorphism",
]);

export const layoutPatternSchema = z.object({
  hero: z.boolean(),
  bento: z.boolean(),
  sidebar: z.boolean(),
  split: z.boolean(),
});

export const typographyStepSchema = z.object({
  name: z.string(),
  fontFamily: z.string(),
  fontSize: z.string(),
  fontWeight: z.number(),
  lineHeight: z.union([z.string(), z.number()]),
  letterSpacing: z.string().optional(),
});

export const breakpointSchema = z.object({
  name: z.string(),
  width: z.string(),
  changes: z.string(),
});

export const designConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().max(80),
  description: z.string().min(1, "Description is required").max(300),
  siteType: siteTypeSchema,
  audience: z.string().max(200),
  brandVoice: z.array(brandVoiceSchema).max(2),
  moodTags: z.array(moodTagSchema),

  colors: z.object({
    primary: z.string(),
    onPrimary: z.string(),
    primaryHover: z.string(),
    canvas: z.string(),
    canvasSoft: z.string(),
    ink: z.string(),
    inkMuted: z.string(),
    inkSubtle: z.string(),
    success: z.string(),
    warning: z.string(),
    error: z.string(),
    hairline: z.string(),
  }),

  displayFont: z.string(),
  bodyFont: z.string(),
  monoFont: z.string(),
  typeScalePreset: z.enum(["compact", "balanced", "editorial", "expressive"]),
  typography: z.array(typographyStepSchema),

  spacingBase: z.union([z.literal(4), z.literal(8)]),
  spacing: z.record(z.string(), z.string()),

  rounded: z.record(z.string(), z.string()),
  radiusStyle: z.enum(["sharp", "soft", "pill"]),

  layout: z.object({
    maxWidth: z.string(),
    gutter: z.string(),
    sectionPadding: z.string(),
  }),

  layoutPatterns: layoutPatternSchema,
  uiStyle: uiStyleSchema,

  elevation: z.enum(["flat", "tonal-layers", "subtle-shadow"]),

  components: z.object({
    buttons: z.boolean(),
    cards: z.boolean(),
    inputs: z.boolean(),
    nav: z.boolean(),
    footer: z.boolean(),
    badges: z.boolean(),
    tabs: z.boolean(),
    modal: z.boolean(),
    table: z.boolean(),
    tooltip: z.boolean(),
    avatar: z.boolean(),
    pricingCard: z.boolean(),
    bentoGrid: z.boolean(),
    heroSection: z.boolean(),
  }),
  buttonStyle: z.enum(["rounded-rect", "pill"]),

  dos: z.array(z.string()),
  donts: z.array(z.string()),

  breakpoints: z.array(breakpointSchema),

  exportFilename: z.string(),
});

export type MoodTag = z.infer<typeof moodTagSchema>;
export type UiStyle = z.infer<typeof uiStyleSchema>;
export type LayoutPatterns = z.infer<typeof layoutPatternSchema>;
export type SiteType = z.infer<typeof siteTypeSchema>;
export type BrandVoice = z.infer<typeof brandVoiceSchema>;
export type TypographyStep = z.infer<typeof typographyStepSchema>;
export type Breakpoint = z.infer<typeof breakpointSchema>;
export type DesignConfig = z.infer<typeof designConfigSchema>;
