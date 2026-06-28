import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IBM_Plex_Mono, Libre_Baskerville, Raleway } from "next/font/google";
import {
  designToCssVars,
  getBodyFontFamily,
  getDisplayFontFamily,
  getMonoFontFamily,
  getUiStyle,
  loadSiteDesign,
} from "@/lib/site-design";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteDesign = loadSiteDesign();
const cssVars = designToCssVars(siteDesign);
const uiStyle = getUiStyle(siteDesign);
const displayFont = getDisplayFontFamily(siteDesign);
const bodyFont = getBodyFontFamily(siteDesign);
const monoFont = getMonoFontFamily(siteDesign);

export const metadata: Metadata = {
  title: "The Design",
  description: siteDesign.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-ui-style={uiStyle}
      className={`${libreBaskerville.variable} ${raleway.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={
          {
            ...cssVars,
            "--font-display": `"${displayFont}", var(--font-libre-baskerville), Georgia, serif`,
            "--font-body": `"${bodyFont}", var(--font-raleway), system-ui, sans-serif`,
            "--font-mono": `"${monoFont}", var(--font-ibm-plex-mono), ui-monospace, monospace`,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
