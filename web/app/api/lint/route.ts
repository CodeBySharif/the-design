import { NextRequest, NextResponse } from "next/server";
import { lint } from "@google/design.md/linter";
import { designConfigSchema } from "@/lib/schema";
import { generateDesignMd } from "@/lib/generate-design-md";
import { formatConfigIssues, sanitizeDesignConfig } from "@/lib/sanitize-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sanitized = sanitizeDesignConfig(body);
    const parsed = designConfigSchema.safeParse(sanitized);
    if (!parsed.success) {
      return NextResponse.json(
        {
          valid: false,
          errors: formatConfigIssues(parsed.error),
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const markdown = generateDesignMd(parsed.data);

    try {
      const report = lint(markdown);
      const errors = report.findings
        .filter((f) => f.severity === "error")
        .map((f) => f.message);
      const warnings = report.findings
        .filter((f) => f.severity === "warning")
        .map((f) => f.message);

      return NextResponse.json({
        valid: errors.length === 0,
        errors,
        warnings,
        markdown,
        summary: report.summary,
      });
    } catch (lintErr) {
      return NextResponse.json({
        valid: false,
        errors: [lintErr instanceof Error ? lintErr.message : "Lint failed"],
        markdown,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { valid: false, errors: [err instanceof Error ? err.message : "Lint request failed"] },
      { status: 500 },
    );
  }
}
