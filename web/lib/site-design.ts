import fs from "fs";
import path from "path";
import { load as parseYaml } from "js-yaml";

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string | number;
  letterSpacing?: string;
}

export interface ComponentToken {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  typography?: string;
  rounded?: string;
  padding?: string;
  height?: string;
}

export interface SiteDesignTokens {
  name: string;
  description: string;
  tagline?: string;
  siteType?: string;
  uiStyle?: string;
  layoutPatterns?: Record<string, boolean>;
  colors: Record<string, string>;
  typography: Record<string, TypographyToken>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components?: Record<string, ComponentToken>;
}

function designMdPath(): string {
  const candidates = [
    path.join(process.cwd(), "..", "DESIGN.md"),
    path.join(process.cwd(), "DESIGN.md"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return candidates[0];
}

export function loadSiteDesign(): SiteDesignTokens {
  const filePath = designMdPath();
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`No YAML frontmatter found in ${filePath}`);
  }

  const parsed = parseYaml(match[1]) as SiteDesignTokens;
  return parsed;
}

function resolveTokenRef(value: string, design: SiteDesignTokens): string {
  const single = value.match(/^\{([^}]+)\}$/);
  if (single) {
    const [category, key] = single[1].split(".");
    if (category === "colors" && key) return design.colors[key] ?? value;
    if (category === "rounded" && key) return design.rounded[key] ?? value;
    if (category === "spacing" && key) return design.spacing[key] ?? value;
    return value;
  }

  return value.replace(/\{([^}]+)\}/g, (_, path: string) => {
    const [category, key] = path.split(".");
    if (category === "colors" && key) return design.colors[key] ?? `{${path}}`;
    if (category === "rounded" && key) return design.rounded[key] ?? `{${path}}`;
    if (category === "spacing" && key) return design.spacing[key] ?? `{${path}}`;
    return `{${path}}`;
  });
}

function componentToCssVars(
  design: SiteDesignTokens,
): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!design.components) return vars;

  for (const [name, token] of Object.entries(design.components)) {
    const prefix = `--comp-${name}`;
    if (token.backgroundColor) {
      vars[`${prefix}-bg`] = resolveTokenRef(token.backgroundColor, design);
    }
    if (token.textColor) {
      vars[`${prefix}-color`] = resolveTokenRef(token.textColor, design);
    }
    if (token.borderColor) {
      vars[`${prefix}-border`] = resolveTokenRef(token.borderColor, design);
    }
    if (token.rounded) {
      vars[`${prefix}-radius`] = resolveTokenRef(token.rounded, design);
    }
    if (token.padding) {
      vars[`${prefix}-padding`] = resolveTokenRef(token.padding, design);
    }
    if (token.height) {
      vars[`${prefix}-height`] = token.height;
    }
    if (token.typography) {
      const typoKey = token.typography.match(/^\{typography\.([^}]+)\}$/)?.[1];
      if (typoKey && design.typography[typoKey]) {
        const t = design.typography[typoKey];
        vars[`${prefix}-font`] = `"${t.fontFamily}"`;
        vars[`${prefix}-size`] = t.fontSize;
        vars[`${prefix}-weight`] = String(t.fontWeight);
        vars[`${prefix}-line`] =
          typeof t.lineHeight === "number" ? String(t.lineHeight) : t.lineHeight;
      }
    }
  }

  return vars;
}

export function designToCssVars(design: SiteDesignTokens): Record<string, string> {
  const vars: Record<string, string> = {
    "--layout-max-width": "1200px",
    "--layout-gutter": design.spacing.lg ?? "24px",
  };

  for (const [key, value] of Object.entries(design.colors)) {
    vars[`--color-${key}`] = value;
  }

  for (const [key, value] of Object.entries(design.rounded)) {
    vars[`--rounded-${key}`] = value;
  }

  for (const [key, value] of Object.entries(design.spacing)) {
    vars[`--spacing-${key}`] = value;
  }

  for (const [key, token] of Object.entries(design.typography)) {
    vars[`--type-${key}-size`] = token.fontSize;
    vars[`--type-${key}-weight`] = String(token.fontWeight);
    vars[`--type-${key}-line`] =
      typeof token.lineHeight === "number" ? String(token.lineHeight) : token.lineHeight;
    if (token.letterSpacing) {
      vars[`--type-${key}-tracking`] = token.letterSpacing;
    }
    vars[`--type-${key}-font`] = `"${token.fontFamily}"`;
  }

  Object.assign(vars, componentToCssVars(design));

  return vars;
}

export function getDisplayFontFamily(design: SiteDesignTokens): string {
  return (
    design.typography["display-xl"]?.fontFamily ??
    design.typography["display-mega"]?.fontFamily ??
    design.typography["display-md"]?.fontFamily ??
    "Libre Baskerville"
  );
}

export function getBodyFontFamily(design: SiteDesignTokens): string {
  return design.typography["body-md"]?.fontFamily ?? "Raleway";
}

export function getMonoFontFamily(design: SiteDesignTokens): string {
  const codeToken =
    design.typography["code-sm"] ??
    design.typography["code-md"] ??
    Object.values(design.typography).find((t) =>
      /mono|plex|jetbrains|fira code/i.test(t.fontFamily),
    );
  return codeToken?.fontFamily ?? getBodyFontFamily(design);
}

export function getUiStyle(design: SiteDesignTokens): string {
  return design.uiStyle ?? "flat";
}

export function collectFontFamilies(design: SiteDesignTokens): string[] {
  const families = new Set<string>();
  for (const token of Object.values(design.typography)) {
    if (token.fontFamily) families.add(token.fontFamily);
  }
  return Array.from(families);
}
