import type { ReactNode } from "react";

export function SiteFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="ds-footer">
      <div className="ds-container text-center">
        {children ?? (
          <p>
          Styled from root{" "}
          <a href="https://github.com/google-labs-code/design.md" className="ds-footer-link">
            DESIGN.md
          </a>{" "}
          — edit the file to change this app&apos;s look.
        </p>
        )}
      </div>
    </footer>
  );
}
