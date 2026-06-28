import type { ReactNode } from "react";

interface SiteCardProps {
  variant?: "content" | "feature";
  children: ReactNode;
  className?: string;
}

export function SiteCard({ variant = "feature", children, className = "" }: SiteCardProps) {
  const base = variant === "content" ? "ds-card-content" : "ds-card-feature";
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}
