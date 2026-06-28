"use client";

import { useEffect } from "react";

export function googleFontsUrlForFamilies(fontNames: string[]): string {
  const families = [...new Set(fontNames.filter(Boolean))]
    .map(
      (f) =>
        `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@300;400;500;600;700;800`,
    )
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export function useGoogleFonts(fontNames: string[], linkId = "wizard-google-fonts") {
  useEffect(() => {
    const fonts = [...new Set(fontNames.filter(Boolean))];
    if (fonts.length === 0) return;

    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = googleFontsUrlForFamilies(fonts);
  }, [fontNames, linkId]);
}
