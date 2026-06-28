import { NextRequest, NextResponse } from "next/server";
import { designConfigSchema } from "@/lib/schema";
import { generateDesignMd } from "@/lib/generate-design-md";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = designConfigSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid config", details: parsed.error.flatten() },
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
