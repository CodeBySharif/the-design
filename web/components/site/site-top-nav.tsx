import Link from "next/link";
import type { ReactNode } from "react";

interface SiteTopNavProps {
  title?: string;
  action?: ReactNode;
}

export function SiteTopNav({ title = "Design.md Builder", action }: SiteTopNavProps) {
  return (
    <header className="ds-top-nav">
      <div className="ds-container flex h-14 items-center justify-between">
        <Link href="/" className="ds-headline">
          {title}
        </Link>
        {action}
      </div>
    </header>
  );
}
