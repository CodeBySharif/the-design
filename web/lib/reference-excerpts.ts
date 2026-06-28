import fs from "fs";
import path from "path";

const REFERENCE_FILES = [
  "DESIGN-linear.app.md",
  "DESIGN-wise.md",
  "DESIGN-supabase.md",
  "DESIGN-sanity.md",
  "DESIGN-mongodb.md",
];

const SECTION_MAP: Record<number, string> = {
  0: "Overview",
  1: "Colors",
  2: "Typography",
  3: "Do's and Don'ts",
};

function getReferencesDir(): string {
  return path.join(process.cwd(), "..", "references");
}

function extractSection(content: string, sectionName: string): string | null {
  const regex = new RegExp(
    `## ${sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`,
  );
  const match = content.match(regex);
  if (!match) return null;
  const text = match[1].trim();
  return text.length > 800 ? text.slice(0, 800) + "…" : text;
}

export function getReferenceExcerpt(step: number): {
  source: string;
  section: string;
  excerpt: string;
} | null {
  const section = SECTION_MAP[step];
  if (!section) return null;

  const refDir = getReferencesDir();
  if (!fs.existsSync(refDir)) return null;

  for (const file of REFERENCE_FILES) {
    const filePath = path.join(refDir, file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf-8");
    const excerpt = extractSection(content, section);
    if (excerpt) {
      return { source: file.replace("DESIGN-", "").replace(".md", ""), section, excerpt };
    }
  }
  return null;
}

export function listReferenceFiles(): string[] {
  const refDir = getReferencesDir();
  if (!fs.existsSync(refDir)) return [];
  return fs.readdirSync(refDir).filter((f) => f.endsWith(".md"));
}
