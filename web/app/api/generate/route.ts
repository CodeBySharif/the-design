import { NextRequest, NextResponse } from "next/server";
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
        { error: "Invalid config", errors: formatConfigIssues(parsed.error), details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const markdown = generateDesignMd(parsed.data);
    return NextResponse.json({ markdown });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 },
    );
  }
}
