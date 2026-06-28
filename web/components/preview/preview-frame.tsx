"use client";

import { useEffect } from "react";
import type { DesignConfig } from "@/lib/schema";
import { configToCssVars, googleFontsUrl } from "@/lib/css-vars";
import { getUiStylePreview } from "@/lib/ui-styles";

interface PreviewFrameProps {
  config: DesignConfig;
  showHeader?: boolean;
}

function PreviewSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-xs font-semibold uppercase tracking-wide"
      style={{ color: "var(--color-ink-subtle)", letterSpacing: "0.08em" }}
    >
      {children}
    </p>
  );
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text;
}

export function PreviewFrame({ config, showHeader = true }: PreviewFrameProps) {
  const vars = configToCssVars(config);
  const uiStyle = getUiStylePreview(config.uiStyle, config.colors);
  const btnRadius =
    config.buttonStyle === "pill" ? "var(--radius-pill)" : "var(--radius-md)";
  const isBrutal = config.uiStyle === "brutalism";
  const cardRadius = isBrutal ? "0" : "var(--radius-lg)";

  useEffect(() => {
    const id = "preview-google-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = googleFontsUrl(config);
  }, [config.displayFont, config.bodyFont, config.monoFont]);

  const displayStep =
    config.typography.find((t) => t.name.startsWith("display")) ?? config.typography[0];
  const bodyStep = config.typography.find((t) => t.name === "body-md") ?? config.typography[4];
  const labelStep = config.typography.find((t) => t.name.startsWith("label"));

  const heroHeadline = config.tagline || "Build something great";
  const heroSubtext = firstSentence(config.description);
  const showHero = config.layoutPatterns.hero || config.components.heroSection;
  const showSplit = config.layoutPatterns.split;

  const sectionLabelStyle: React.CSSProperties = {
    borderTop: "1px solid var(--color-hairline)",
    padding: "var(--spacing-lg) var(--spacing-xl)",
    background: "var(--color-canvas)",
  };

  const cardBase: React.CSSProperties = {
    borderRadius: cardRadius,
    padding: "var(--spacing-xl)",
    ...uiStyle.card,
  };

  return (
    <div
      className="overflow-hidden rounded-xl border ds-divider"
      style={vars as React.CSSProperties}
    >
      {showHeader && (
        <div
          className="flex items-center justify-between border-b px-4 py-2 ds-divider"
          style={{ background: "var(--color-canvas-soft)" }}
        >
          <p className="text-xs font-medium ds-text-muted">Live Preview</p>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            {config.uiStyle.replace("-", " ")}
          </span>
        </div>
      )}

      <div style={{ background: "var(--color-canvas)", color: "var(--color-ink)" }}>
        {/* Nav */}
        {config.components.nav && (
          <div
            className="flex items-center justify-between border-b px-4"
            style={{
              borderColor: "var(--color-hairline)",
              height: "56px",
              fontFamily: "var(--font-body)",
              ...uiStyle.nav,
            }}
          >
            <div className="flex items-center gap-2">
              {config.components.avatar && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...uiStyle.card,
                  }}
                >
                  {config.name.charAt(0)}
                </div>
              )}
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>
                {config.name}
              </span>
            </div>
            <div className="flex gap-4 text-sm" style={{ color: "var(--color-ink-muted)" }}>
              <span>Features</span>
              <span>Pricing</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        {config.components.tabs && (
          <div className="flex gap-1 px-4 py-2" style={{ background: "var(--color-canvas-soft)" }}>
            {["Overview", "Features", "Pricing"].map((tab, i) => (
              <span
                key={tab}
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: i === 0 ? "var(--radius-sm)" : "var(--radius-sm)",
                  background: i === 0 ? "var(--color-canvas)" : "transparent",
                  color: i === 0 ? "var(--color-ink)" : "var(--color-ink-muted)",
                  ...uiStyle.card,
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        )}

        {/* Hero */}
        {showHero && (
          <div
            className="px-6 py-8"
            style={{
              background: "var(--color-canvas-soft)",
              ...uiStyle.hero,
            }}
          >
            <div className={showSplit ? "grid gap-6 sm:grid-cols-2 items-center" : ""}>
              <div>
                {labelStep && (
                  <p
                    className="mb-2 uppercase"
                    style={{
                      fontFamily: `"${labelStep.fontFamily}", sans-serif`,
                      fontSize: labelStep.fontSize,
                      fontWeight: labelStep.fontWeight,
                      letterSpacing: labelStep.letterSpacing,
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {config.siteType.replace("-", " ")}
                  </p>
                )}
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: displayStep?.fontSize ?? "36px",
                    fontWeight: displayStep?.fontWeight ?? 700,
                    lineHeight: displayStep?.lineHeight ?? 1.1,
                    letterSpacing: displayStep?.letterSpacing,
                  }}
                >
                  {heroHeadline}
                </h1>
                <p
                  className="mt-3 max-w-md"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: bodyStep?.fontSize ?? "16px",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {heroSubtext}
                </p>
                {config.components.buttons && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      style={{
                        background: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        borderRadius: btnRadius,
                        padding: "12px 24px",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: 14,
                        border: "none",
                        ...uiStyle.buttonPrimary,
                      }}
                    >
                      Get started
                    </button>
                    <button
                      type="button"
                      style={{
                        background: "var(--color-canvas-soft)",
                        color: "var(--color-ink)",
                        borderRadius: btnRadius,
                        padding: "12px 24px",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: 14,
                        border: "1px solid var(--color-hairline)",
                        ...uiStyle.buttonSecondary,
                      }}
                    >
                      Learn more
                    </button>
                  </div>
                )}
              </div>
              {showSplit && (
                <div
                  style={{
                    ...cardBase,
                    background: "var(--color-canvas)",
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-ink-subtle)",
                    fontSize: 13,
                  }}
                >
                  Product visual
                </div>
              )}
            </div>
          </div>
        )}

        {/* Component sections */}
        <div style={sectionLabelStyle}>
          <PreviewSectionLabel>Card</PreviewSectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>
                Feature card
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                Cards use your spacing, radius, and surface tokens.
              </p>
              {config.components.badges && (
                <span
                  className="mt-3 inline-block"
                  style={{
                    background: "var(--color-canvas)",
                    color: "var(--color-success)",
                    borderRadius: "var(--radius-pill)",
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Active
                </span>
              )}
            </div>
            <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
              <p className="text-sm font-medium" style={{ color: "var(--color-ink-muted)" }}>
                Quick stats
              </p>
              <p
                className="mt-1 text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                2.4k
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-ink-subtle)" }}>
                Weekly active users
              </p>
              <div
                className="mt-4 flex gap-2"
                style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: 12 }}
              >
                {["Speed", "Scale", "Support"].map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium"
                    style={{
                      background: "var(--color-canvas-soft)",
                      color: "var(--color-ink-muted)",
                      borderRadius: "var(--radius-pill)",
                      padding: "4px 10px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...sectionLabelStyle, background: "var(--color-canvas-soft)" }}>
          <PreviewSectionLabel>Bento grid</PreviewSectionLabel>
          <div className="grid grid-cols-3 gap-3">
            <div
              className="col-span-2 row-span-2"
              style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 100 }}
            >
              <p style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}>Featured</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                Spotlight cell spans two columns
              </p>
            </div>
            <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <p className="text-sm font-medium">Metric</p>
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                98%
              </p>
            </div>
            <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <p className="text-sm font-medium">Users</p>
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                12k
              </p>
            </div>
          </div>
        </div>

        <div style={sectionLabelStyle}>
          <PreviewSectionLabel>Form</PreviewSectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <label className="mb-2 block text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                Email address
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                readOnly
                style={{
                  width: "100%",
                  background: "var(--color-canvas)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: isBrutal ? "0" : "var(--radius-md)",
                  padding: "12px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  ...uiStyle.input,
                }}
              />
              <label className="mb-2 mt-4 block text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                Message
              </label>
              <textarea
                placeholder="Tell us about your project…"
                readOnly
                rows={3}
                style={{
                  width: "100%",
                  resize: "none",
                  background: "var(--color-canvas)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: isBrutal ? "0" : "var(--radius-md)",
                  padding: "12px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  ...uiStyle.input,
                }}
              />
              {config.components.buttons && (
                <button
                  type="button"
                  className="mt-4"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    borderRadius: btnRadius,
                    padding: "10px 20px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 14,
                    border: "none",
                    ...uiStyle.buttonPrimary,
                  }}
                >
                  Submit
                </button>
              )}
            </div>
            <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
              <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Get in touch
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                Form fields sit beside supporting copy — labels, hints, and contact details.
              </p>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                {["Response within 24 hours", "No spam, ever", "Cancel anytime"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-primary)",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Optional extras */}
        {(config.layoutPatterns.sidebar || config.components.table || config.components.pricingCard) && (
        <div
          className={`gap-4 p-4 ${config.layoutPatterns.sidebar ? "grid grid-cols-4" : "grid sm:grid-cols-2"}`}
        >
          {config.layoutPatterns.sidebar && (
            <div
              className="col-span-1 space-y-2 rounded-lg p-3"
              style={{ background: "var(--color-canvas-soft)", ...uiStyle.card }}
            >
              {["Home", "Projects", "Settings"].map((item, i) => (
                <div
                  key={item}
                  className="rounded px-2 py-1.5 text-sm"
                  style={{
                    background: i === 0 ? "var(--color-canvas)" : "transparent",
                    color: i === 0 ? "var(--color-ink)" : "var(--color-ink-muted)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className={config.layoutPatterns.sidebar ? "col-span-3 space-y-4" : "contents"}>
            {config.components.table && (
              <div style={{ ...cardBase, background: "var(--color-canvas)", overflow: "hidden" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "var(--color-canvas-soft)", color: "var(--color-ink-muted)" }}>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Alpha", "Beta"].map((row) => (
                      <tr key={row} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                        <td className="px-3 py-2">{row}</td>
                        <td className="px-3 py-2" style={{ color: "var(--color-success)" }}>
                          Live
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {config.components.pricingCard && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
                  <p className="font-semibold">Starter</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    $9
                  </p>
                </div>
                <div
                  style={{
                    ...cardBase,
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                  }}
                >
                  <p className="font-semibold">Pro</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    $29
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Type scale */}
        <div className="border-t px-4 py-4 ds-divider" style={{ borderColor: "var(--color-hairline)" }}>
          <p
            className="mb-3 text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--color-ink-subtle)" }}
          >
            Type scale ({config.typography.length})
          </p>
          <div className="space-y-2">
            {config.typography.map((step) => (
              <div
                key={step.name}
                className="flex items-baseline justify-between gap-3"
                style={{
                  fontFamily: step.name.startsWith("code")
                    ? `"${step.fontFamily}", ui-monospace, monospace`
                    : `"${step.fontFamily}", sans-serif`,
                  fontSize: step.fontSize,
                  fontWeight: step.fontWeight,
                  lineHeight: step.lineHeight,
                }}
              >
                <span className="shrink-0 text-[10px]" style={{ color: "var(--color-ink-subtle)" }}>
                  {step.name}
                </span>
                <span className="min-w-0 text-right">The quick brown fox</span>
              </div>
            ))}
          </div>
        </div>

        {config.components.footer && (
          <div
            className="px-4 py-3 text-center text-xs"
            style={{ background: "var(--color-canvas-soft)", color: "var(--color-ink-subtle)" }}
          >
            Footer · {config.name}
          </div>
        )}
      </div>
    </div>
  );
}
