import { NextRequest, NextResponse } from "next/server";
import { getReferenceExcerpt } from "@/lib/reference-excerpts";

export async function GET(request: NextRequest) {
  const step = Number(request.nextUrl.searchParams.get("step") ?? "0");
  const excerpt = getReferenceExcerpt(step);
  if (!excerpt) {
    return NextResponse.json({ excerpt: null });
  }
  return NextResponse.json({ excerpt });
}
