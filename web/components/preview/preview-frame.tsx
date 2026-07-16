"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import type { DesignConfig, SiteType } from "@/lib/schema";
import { configToCssVars, googleFontsUrl } from "@/lib/css-vars";
import { getUiStylePreview, usesSharpCorners } from "@/lib/ui-styles";
import { siteTypeLabel } from "@/lib/site-types";
import { StyleSignature, styleSignatureLabel } from "./style-signature";

interface PreviewFrameProps {
  config: DesignConfig;
  showHeader?: boolean;
}

type StyleBundle = ReturnType<typeof getUiStylePreview>;

/** Nav styles must use side longhands only — never borderColor + optional borderBottom. */
function previewNavStyle(nav: CSSProperties): CSSProperties {
  const {
    border: _border,
    borderColor: _borderColor,
    borderWidth: _borderWidth,
    borderStyle: _borderStyle,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    ...rest
  } = nav;

  return {
    height: 56,
    fontFamily: "var(--font-body)",
    ...rest,
    borderTop: borderTop ?? "none",
    borderRight: borderRight ?? "none",
    borderLeft: borderLeft ?? "none",
    borderBottom: borderBottom ?? "1px solid var(--color-hairline)",
  };
}

/** Strip shorthand border keys so side longhands can be set safely. */
function omitBorderShorthand(style: CSSProperties): CSSProperties {
  const {
    border: _b,
    borderColor: _c,
    borderWidth: _w,
    borderStyle: _s,
    ...rest
  } = style;
  return rest;
}

function previewHeroStyle(hero: CSSProperties): CSSProperties {
  const {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    ...rest
  } = omitBorderShorthand(hero);

  return {
    background: "var(--color-canvas-soft)",
    ...rest,
    borderTop: borderTop ?? "none",
    borderRight: borderRight ?? "none",
    borderLeft: borderLeft ?? "none",
    borderBottom: borderBottom ?? "none",
  };
}

function Section({
  title,
  children,
  soft,
  style,
}: {
  title: string;
  children: ReactNode;
  soft?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-hairline)",
        padding: "var(--spacing-lg) var(--spacing-xl)",
        background: soft ? "var(--color-canvas-soft)" : "var(--color-canvas)",
        ...style,
      }}
    >
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-ink-subtle)", letterSpacing: "0.08em" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text;
}

/** Input styles: side longhands only so border + borderBottom never conflict on rerender. */
function previewInputStyle(input: CSSProperties, extras: CSSProperties = {}): CSSProperties {
  const {
    border: _border,
    borderColor: _borderColor,
    borderWidth: _borderWidth,
    borderStyle: _borderStyle,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    ...rest
  } = { ...extras, ...input };

  const fallback = "1px solid var(--color-hairline)";
  return {
    ...rest,
    borderTop: borderTop ?? fallback,
    borderRight: borderRight ?? fallback,
    borderBottom: borderBottom ?? fallback,
    borderLeft: borderLeft ?? fallback,
  };
}

function PrimaryButton({
  label,
  btnRadius,
  uiStyle,
  full,
}: {
  label: string;
  btnRadius: string;
  uiStyle: StyleBundle;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      style={{
        background: "var(--color-primary)",
        color: "var(--color-on-primary)",
        borderRadius: btnRadius,
        padding: "10px 18px",
        fontWeight: 600,
        fontSize: 13,
        border: "none",
        width: full ? "100%" : undefined,
        ...uiStyle.buttonPrimary,
      }}
    >
      {label}
    </button>
  );
}

function SecondaryButton({
  label,
  btnRadius,
  uiStyle,
}: {
  label: string;
  btnRadius: string;
  uiStyle: StyleBundle;
}) {
  return (
    <button
      type="button"
      style={{
        background: "var(--color-canvas)",
        color: "var(--color-ink)",
        borderRadius: btnRadius,
        padding: "10px 18px",
        fontWeight: 600,
        fontSize: 13,
        border: "1px solid var(--color-hairline)",
        ...uiStyle.buttonSecondary,
      }}
    >
      {label}
    </button>
  );
}

function TypographySection({ config }: { config: DesignConfig }) {
  return (
    <div className="px-4 py-4" style={{ borderTop: "1px solid var(--color-hairline)" }}>
      <p
        className="mb-3 text-xs font-medium uppercase tracking-wide"
        style={{ color: "var(--color-ink-subtle)" }}
      >
        Typography
      </p>
      <div className="space-y-2">
        {config.typography.slice(0, 6).map((step) => (
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
  );
}

function navFor(siteType: SiteType): string[] {
  const map: Record<SiteType, string[]> = {
    marketing: ["Product", "Customers", "Pricing"],
    "landing-page": ["Product", "Pricing"],
    docs: ["Guides", "API", "SDK"],
    dashboard: ["Overview", "Metrics", "Alerts"],
    "e-commerce": ["Shop", "Collections", "Cart"],
    portfolio: ["Work", "About", "Contact"],
    "saas-app": ["Inbox", "Projects", "Automations"],
    blog: ["Writing", "Topics", "Newsletter"],
    auth: ["Help"],
    admin: ["Users", "Roles", "Audit"],
    "mobile-app": ["Home", "Search", "You"],
    marketplace: ["Browse", "Sellers", "Orders"],
    social: ["Feed", "Messages", "Profile"],
    education: ["Learn", "Courses", "Certificates"],
    booking: ["Book", "Schedule", "Account"],
    news: ["Top", "World", "Opinion"],
    community: ["Forum", "Groups", "Events"],
    agency: ["Services", "Work", "Contact"],
    fintech: ["Accounts", "Transfer", "Cards"],
    healthcare: ["Care", "Records", "Visits"],
    "real-estate": ["Buy", "Rent", "Saved"],
    "food-delivery": ["Menus", "Orders", "Account"],
    travel: ["Flights", "Stays", "Trips"],
    music: ["Listen", "Library", "Radio"],
    podcast: ["Shows", "Episodes", "Queue"],
    crypto: ["Wallet", "Swap", "Activity"],
    nonprofit: ["Cause", "Impact", "Donate"],
    event: ["Schedule", "Speakers", "Tickets"],
    "hr-portal": ["People", "Time off", "Policies"],
    legal: ["Practices", "Matters", "Contact"],
  };
  return map[siteType];
}

export function PreviewFrame({ config, showHeader = true }: PreviewFrameProps) {
  const vars = configToCssVars(config);
  const uiStyle = getUiStylePreview(config.uiStyle, config.colors);
  const sharp = usesSharpCorners(config.uiStyle);
  const btnRadius =
    config.uiStyle === "soft-ui" || config.uiStyle === "gaming"
      ? config.uiStyle === "soft-ui"
        ? "9999px"
        : "8px"
      : config.buttonStyle === "pill"
        ? "var(--radius-pill)"
        : sharp
          ? config.uiStyle === "paper"
            ? "2px"
            : "0"
          : "var(--radius-md)";
  const cardRadius =
    config.uiStyle === "soft-ui"
      ? "20px"
      : config.uiStyle === "gaming"
        ? "10px"
        : config.uiStyle === "paper"
          ? "2px"
          : sharp
            ? "0"
            : "var(--radius-lg)";

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
  const cardBase: CSSProperties = {
    borderRadius: cardRadius,
    padding: "var(--spacing-xl)",
    ...uiStyle.card,
  };
  const ctx = { config, uiStyle, btnRadius, cardBase, displayStep, bodyStep };

  return (
    <div
      className="overflow-hidden rounded-xl border ds-divider"
      style={{
        ...(vars as CSSProperties),
        overflowWrap: "anywhere",
        wordBreak: "break-word",
      }}
    >
      {showHeader && (
        <div
          className="flex items-center justify-between gap-2 border-b px-4 py-2 ds-divider"
          style={{ background: "var(--color-canvas-soft)" }}
        >
          <p className="text-xs font-medium ds-text-muted">Live Preview</p>
          <div className="flex flex-wrap justify-end gap-1">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                background: "var(--color-canvas)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-hairline)",
              }}
            >
              {siteTypeLabel(config.siteType)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              {config.uiStyle.replace(/-/g, " ")}
            </span>
          </div>
        </div>
      )}

      <div style={{ background: "var(--color-canvas)", color: "var(--color-ink)" }}>
        <div
          className="flex items-center justify-between gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={StyleSignature({ style: config.uiStyle, colors: config.colors })}
        >
          <span>{styleSignatureLabel(config.uiStyle)} style</span>
          <span style={{ opacity: 0.75 }}>{siteTypeLabel(config.siteType)}</span>
        </div>

        {config.siteType !== "auth" && (
          <div
            className="flex items-center justify-between px-4"
            style={previewNavStyle(uiStyle.nav)}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>
              {config.name}
            </span>
            <div
              className="flex gap-4 text-sm"
              style={{ color: uiStyle.nav.color ?? "var(--color-ink-muted)" }}
            >
              {navFor(config.siteType).map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        )}

        <SitePreview {...ctx} />
        <TypographySection config={config} />
      </div>
    </div>
  );
}

type PreviewCtx = {
  config: DesignConfig;
  uiStyle: StyleBundle;
  btnRadius: string;
  cardBase: CSSProperties;
  displayStep: DesignConfig["typography"][number] | undefined;
  bodyStep: DesignConfig["typography"][number] | undefined;
};

function SitePreview(ctx: PreviewCtx) {
  switch (ctx.config.siteType) {
    case "marketing":
      return <MarketingPreview {...ctx} />;
    case "landing-page":
      return <LandingPreview {...ctx} />;
    case "docs":
      return <DocsPreview {...ctx} />;
    case "dashboard":
      return <DashboardPreview {...ctx} />;
    case "e-commerce":
      return <EcommercePreview {...ctx} />;
    case "portfolio":
      return <PortfolioPreview {...ctx} />;
    case "saas-app":
      return <SaasPreview {...ctx} />;
    case "blog":
      return <BlogPreview {...ctx} />;
    case "auth":
      return <AuthPreview {...ctx} />;
    case "admin":
      return <AdminPreview {...ctx} />;
    case "mobile-app":
      return <MobilePreview {...ctx} />;
    case "marketplace":
      return <MarketplacePreview {...ctx} />;
    case "social":
      return <SocialPreview {...ctx} />;
    case "education":
      return <EducationPreview {...ctx} />;
    case "booking":
      return <BookingPreview {...ctx} />;
    case "news":
      return <NewsPreview {...ctx} />;
    case "community":
      return <CommunityPreview {...ctx} />;
    case "agency":
      return <AgencyPreview {...ctx} />;
    case "fintech":
      return <FintechPreview {...ctx} />;
    case "healthcare":
      return <HealthcarePreview {...ctx} />;
    case "real-estate":
      return <RealEstatePreview {...ctx} />;
    case "food-delivery":
      return <FoodDeliveryPreview {...ctx} />;
    case "travel":
      return <TravelPreview {...ctx} />;
    case "music":
      return <MusicPreview {...ctx} />;
    case "podcast":
      return <PodcastPreview {...ctx} />;
    case "crypto":
      return <CryptoPreview {...ctx} />;
    case "nonprofit":
      return <NonprofitPreview {...ctx} />;
    case "event":
      return <EventPreview {...ctx} />;
    case "hr-portal":
      return <HrPortalPreview {...ctx} />;
    case "legal":
      return <LegalPreview {...ctx} />;
    default:
      return <MarketingPreview {...ctx} />;
  }
}

function HeroBand({
  ctx,
  eyebrow,
  cta,
  secondary,
}: {
  ctx: PreviewCtx;
  eyebrow: string;
  cta: string;
  secondary?: string;
}) {
  const { config, uiStyle, btnRadius, displayStep, bodyStep } = ctx;
  return (
    <div
      className="px-6 py-8"
      style={previewHeroStyle(uiStyle.hero)}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
        {eyebrow}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: displayStep?.fontSize ?? "36px",
          fontWeight: displayStep?.fontWeight ?? 700,
          lineHeight: displayStep?.lineHeight ?? 1.1,
        }}
      >
        {config.tagline || "Build something great"}
      </h1>
      <p
        className="mt-3 max-w-md"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: bodyStep?.fontSize ?? "16px",
          color: "var(--color-ink-muted)",
        }}
      >
        {firstSentence(config.description)}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton label={cta} btnRadius={btnRadius} uiStyle={uiStyle} />
        {secondary && <SecondaryButton label={secondary} btnRadius={btnRadius} uiStyle={uiStyle} />}
      </div>
    </div>
  );
}

function MarketingPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <HeroBand ctx={ctx} eyebrow="Marketing site" cta="Get started" secondary="See pricing" />
      <Section title="Logo wall" soft>
        <div className="flex flex-wrap items-center justify-between gap-3 opacity-70">
          {["NORTH", "FIELD", "ATLAS", "COVE", "PAPER"].map((logo) => (
            <span key={logo} className="text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
              {logo}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Feature grid">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Launch faster", "Stay on brand", "Ship with confidence"].map((t) => (
            <div key={t} style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{t}</p>
              <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                Benefit-led cards for product marketing pages.
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Pricing tiers" soft>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Starter", "$0", "Export once"],
            ["Pro", "$29", "Unlimited themes"],
            ["Team", "$79", "Shared libraries"],
          ].map(([name, price, perk], i) => (
            <div
              key={name}
              style={{
                ...cardBase,
                background: i === 1 ? "var(--color-primary)" : "var(--color-canvas)",
                color: i === 1 ? "var(--color-on-primary)" : "var(--color-ink)",
              }}
            >
              <p className="text-xs uppercase tracking-wide opacity-80">{name}</p>
              <p className="mt-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{price}</p>
              <p className="mt-2 text-sm opacity-80">{perk}</p>
              <div className="mt-3">
                {i === 1 ? (
                  <PrimaryButton label="Choose Pro" btnRadius={btnRadius} uiStyle={uiStyle} />
                ) : (
                  <SecondaryButton label="Select" btnRadius={btnRadius} uiStyle={uiStyle} />
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function LandingPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <HeroBand ctx={ctx} eyebrow="Landing page" cta="Start free" />
      <Section title="Single offer">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", textAlign: "center", maxWidth: 420, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>
            One message. One action.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
            Landing pages strip secondary destinations.
          </p>
          <div className="mt-4">
            <PrimaryButton label="Claim offer" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
      <Section title="Proof strip" soft>
        <div className="grid grid-cols-3 gap-3 text-center">
          {["No credit card", "2-min setup", "Cancel anytime"].map((item) => (
            <div key={item} style={{ ...cardBase, background: "var(--color-canvas)", padding: 14 }}>
              <p className="text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="FAQ tease">
        <div className="space-y-2">
          {["What’s included?", "How does billing work?"].map((q) => (
            <div key={q} className="flex justify-between px-3 py-3 text-sm" style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "12px 14px" }}>
              <span>{q}</span>
              <span style={{ color: "var(--color-ink-subtle)" }}>+</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function DocsPreview(ctx: PreviewCtx) {
  const { cardBase, bodyStep } = ctx;
  return (
    <>
      <div className="grid grid-cols-4 gap-0" style={{ borderTop: "1px solid var(--color-hairline)" }}>
        <aside className="col-span-1 space-y-1 p-3" style={{ background: "var(--color-canvas-soft)", borderRight: "1px solid var(--color-hairline)" }}>
          {["Introduction", "Install", "Tokens", "Lint"].map((item, i) => (
            <div key={item} className="rounded px-2 py-1.5 text-sm" style={{ background: i === 1 ? "var(--color-canvas)" : "transparent", color: i === 1 ? "var(--color-ink)" : "var(--color-ink-muted)" }}>
              {item}
            </div>
          ))}
        </aside>
        <div className="col-span-3 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>
            Article
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }}>Install the CLI</h2>
          <p className="mt-2" style={{ fontSize: bodyStep?.fontSize ?? "16px", color: "var(--color-ink-muted)", lineHeight: 1.6, maxWidth: "58ch" }}>
            Docs favor readable columns, heading hierarchy, and mono for commands.
          </p>
        </div>
      </div>
      <Section title="Code sample" soft>
        <pre style={{ ...cardBase, fontFamily: "ui-monospace, monospace", fontSize: 13, background: "var(--color-canvas)", overflow: "auto" }}>
{`npx @google/design.md lint DESIGN.md
npx @google/design.md export --format tailwind`}
        </pre>
      </Section>
      <Section title="API table">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 0, overflow: "hidden" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "var(--color-ink-muted)" }}>
                <th className="px-3 py-2 text-left">Prop</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["primary", "color", "Brand action"],
                ["spacing.md", "dimension", "Base rhythm"],
              ].map(([a, b, c]) => (
                <tr key={a} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                  <td className="px-3 py-2 font-mono text-xs">{a}</td>
                  <td className="px-3 py-2">{b}</td>
                  <td className="px-3 py-2" style={{ color: "var(--color-ink-muted)" }}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="On this page" soft>
        <div className="flex flex-wrap gap-2">
          {["Install", "Configure", "Validate", "Export"].map((item) => (
            <span key={item} className="text-xs font-medium" style={{ padding: "6px 10px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
              {item}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

function DashboardPreview(ctx: PreviewCtx) {
  const { cardBase } = ctx;
  return (
    <>
      <Section title="KPI strip">
        <div className="grid grid-cols-4 gap-3">
          {[
            ["Revenue", "$128k"],
            ["Active", "4.2k"],
            ["NPS", "62"],
            ["Errors", "0.4%"],
          ].map(([l, v]) => (
            <div key={l} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 14 }}>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{l}</p>
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{v}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Trend chart" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 120 }}>
          <p className="text-sm font-semibold">Weekly active users</p>
          <div className="mt-4 flex h-16 items-end gap-2">
            {[40, 55, 48, 70, 62, 80, 76].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--color-primary)", borderRadius: 4, opacity: 0.35 + i * 0.08 }} />
            ))}
          </div>
        </div>
      </Section>
      <Section title="Alerts">
        <div className="space-y-2">
          {[
            ["Latency spike", "warning"],
            ["Backup complete", "success"],
          ].map(([title, tone]) => (
            <div key={title} className="flex items-center justify-between text-sm" style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "12px 14px" }}>
              <span>{title}</span>
              <span style={{ color: tone === "success" ? "var(--color-success)" : "var(--color-warning)", fontWeight: 600 }}>
                {tone}
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Recent activity" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)", padding: 0, overflow: "hidden" }}>
          <table className="w-full text-sm">
            <tbody>
              {["Deploy web@1.4", "Invite sent to Ada", "Quota updated"].map((row) => (
                <tr key={row} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                  <td className="px-3 py-2">{row}</td>
                  <td className="px-3 py-2 text-right" style={{ color: "var(--color-ink-subtle)" }}>2m ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

function EcommercePreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Category tabs">
        <div className="flex gap-4 text-sm font-medium" style={{ borderBottom: "1px solid var(--color-hairline)" }}>
          {["All", "Tops", "Outerwear", "Accessories"].map((c, i) => (
            <span
              key={c}
              style={{
                padding: "0 0 10px",
                color: i === 0 ? "var(--color-ink)" : "var(--color-ink-muted)",
                borderBottom: i === 0 ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Product grid" soft>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Merino tee", "$42"],
            ["Field jacket", "$180"],
            ["Trail cap", "$28"],
          ].map(([name, price], i) => (
            <div key={name} style={{ ...cardBase, background: "var(--color-canvas)" }}>
              <div style={{ height: 70, background: "var(--color-canvas-soft)", borderRadius: cardBase.borderRadius, marginBottom: 10 }} />
              <p style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}>{name}</p>
              <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{price}</p>
              {i === 0 && (
                <div className="mt-2 flex gap-1">
                  {["XS", "S", "M", "L"].map((sz, j) => (
                    <span
                      key={sz}
                      className="text-[10px] font-medium"
                      style={{
                        width: 22,
                        height: 22,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 999,
                        background: j === 1 ? "var(--color-primary)" : "var(--color-canvas-soft)",
                        color: j === 1 ? "var(--color-on-primary)" : "var(--color-ink)",
                        border: "1px solid var(--color-hairline)",
                      }}
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <PrimaryButton label="Add to cart" btnRadius={btnRadius} uiStyle={uiStyle} full />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Collection rail">
        <div className="flex gap-2 overflow-hidden">
          {["New", "Essentials", "Outdoor", "Sale"].map((c) => (
            <span key={c} className="shrink-0 text-sm font-medium" style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "10px 16px" }}>
              {c}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Cart drawer" soft>
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="font-semibold">Cart · 2 items · $128</p>
          <PrimaryButton label="Checkout" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function PortfolioPreview(ctx: PreviewCtx) {
  const { cardBase, displayStep, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Case study hero">
        <div
          style={{
            ...omitBorderShorthand(cardBase),
            ...previewHeroStyle(uiStyle.hero),
            minHeight: 160,
          }}
        >
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Featured · 2026</p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: displayStep?.fontSize ?? "36px", marginTop: 8, maxWidth: "16ch" }}>
            Northwind rebrand
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>Identity, web, and motion system</p>
        </div>
      </Section>
      <Section title="Masonry" soft>
        <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto" }}>
          <div className="col-span-2 row-span-2" style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 160 }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20 }}>Atlas editorial</p>
            <p className="mt-2 text-xs" style={{ color: "var(--color-ink-subtle)" }}>Full-bleed print × digital</p>
          </div>
          <div style={{ ...cardBase, background: "var(--color-primary)", color: "var(--color-on-primary)", minHeight: 70 }}>
            <p className="text-sm font-semibold">Cove app</p>
          </div>
          <div style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 70 }}>
            <p className="text-sm font-semibold">Harbor type</p>
          </div>
        </div>
      </Section>
      <Section title="Process">
        <div className="flex items-center gap-2">
          {["Discover", "Craft", "Ship"].map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 12, flex: 1 }}>
                <p className="text-xs" style={{ color: "var(--color-ink-subtle)" }}>0{i + 1}</p>
                <p className="font-semibold">{step}</p>
              </div>
              {i < 2 && <span style={{ color: "var(--color-ink-subtle)" }}>→</span>}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Contact" soft>
        <div className="flex flex-wrap items-center justify-between gap-3" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Available for select projects</p>
            <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>hello@studio</p>
          </div>
          <PrimaryButton label="Inquire" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function SaasPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <div
        className="flex items-center justify-between gap-3 px-4"
        style={{
          height: 48,
          background: "var(--color-canvas-soft)",
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
          <input
            readOnly
            placeholder="Search projects…"
            style={previewInputStyle(uiStyle.input, {
              flex: 1,
              maxWidth: 280,
              padding: "8px 12px",
              borderRadius: btnRadius,
              background: "var(--color-canvas)",
              fontSize: 13,
            })}
          />
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Ada</span>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "var(--color-primary)",
              color: "var(--color-on-primary)",
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            A
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0">
        <aside className="col-span-1 space-y-1 p-3" style={{ background: "var(--color-canvas-soft)", borderRight: "1px solid var(--color-hairline)" }}>
          {["Inbox", "Boards", "Automations", "Settings"].map((item, i) => (
            <div key={item} className="rounded px-2 py-1.5 text-sm" style={{ background: i === 1 ? "var(--color-canvas)" : "transparent", color: i === 1 ? "var(--color-ink)" : "var(--color-ink-muted)" }}>
              {item}
            </div>
          ))}
        </aside>
        <div className="col-span-3 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Boards</p>
          <div className="grid grid-cols-3 gap-3">
            {["Todo", "Doing", "Done"].map((col, i) => (
              <div key={col} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 12 }}>
                <p className="text-xs font-semibold uppercase" style={{ color: "var(--color-ink-subtle)" }}>{col}</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded px-2 py-2 text-sm" style={{ background: "var(--color-canvas)" }}>
                    {i === 0 ? "Draft tokens" : i === 1 ? "Ship lint API" : "Theme batch"}
                  </div>
                  {i < 2 && (
                    <div className="rounded px-2 py-2 text-sm" style={{ background: "var(--color-canvas)", opacity: 0.7 }}>
                      {i === 0 ? "Invite Ada" : "Review PR"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Section title="Composer" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <input
            readOnly
            placeholder="Create a task…"
            style={previewInputStyle(uiStyle.input, {
              width: "100%",
              borderRadius: btnRadius,
              padding: "10px 12px",
              background: "var(--color-canvas-soft)",
            })}
          />
          <div className="mt-3">
            <PrimaryButton label="Create" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
      <Section title="Automation">
        <div className="flex items-center justify-between text-sm" style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <span>When issue closes → notify channel</span>
          <span style={{ color: "var(--color-success)", fontWeight: 600 }}>On</span>
        </div>
      </Section>
    </>
  );
}

function BlogPreview(ctx: PreviewCtx) {
  const { cardBase, bodyStep } = ctx;
  return (
    <>
      <Section title="Article">
        <div className="mx-auto" style={{ maxWidth: "62ch" }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Essay · 9 min</p>
          <h1 className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, lineHeight: 1.15 }}>
            Design systems that survive contact with production
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <span style={{ width: 26, height: 26, borderRadius: 999, background: "var(--color-primary)", color: "var(--color-on-primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
              M
            </span>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>By Maya Chen · Apr 12</p>
          </div>
          <p className="mt-5" style={{ color: "var(--color-ink-muted)", fontSize: bodyStep?.fontSize ?? "16px", lineHeight: 1.7 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "3em", lineHeight: 0.8, float: "left", marginRight: 8, fontWeight: 700, color: "var(--color-ink)" }}>
              D
            </span>
            esign systems fail quietly, in the gap between a file and a shipped component. Long-form reading favors calm chrome and a strong heading hierarchy.
          </p>
        </div>
      </Section>
      <Section title="Related posts" soft>
        <div className="mx-auto space-y-2" style={{ maxWidth: "62ch" }}>
          {["Token hygiene", "Type scale pitfalls", "Contrast as craft"].map((t) => (
            <div key={t} className="flex justify-between gap-3 text-sm" style={{ ...cardBase, background: "var(--color-canvas)", padding: "12px 14px" }}>
              <span style={{ fontWeight: 600 }}>{t}</span>
              <span style={{ color: "var(--color-ink-subtle)" }}>Apr</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Topics">
        <div className="mx-auto flex flex-wrap gap-2" style={{ maxWidth: "62ch" }}>
          {["Systems", "Typography", "Color", "Process"].map((t) => (
            <span key={t} className="text-xs font-medium" style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid var(--color-hairline)", background: "var(--color-canvas-soft)" }}>
              {t}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Newsletter" soft>
        <div className="mx-auto flex flex-wrap gap-2" style={{ ...cardBase, background: "var(--color-canvas)", maxWidth: "62ch" }}>
          <input
            readOnly
            placeholder="you@studio.com"
            className="min-w-[180px] flex-1"
            style={previewInputStyle(ctx.uiStyle.input, {
              borderRadius: 8,
              padding: "10px 12px",
            })}
          />
          <PrimaryButton label="Subscribe" btnRadius={ctx.btnRadius} uiStyle={ctx.uiStyle} />
        </div>
      </Section>
    </>
  );
}

function AuthPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Sign in">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", maxWidth: 360, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }}>Welcome back</p>
          <label className="mb-1 mt-4 block text-sm font-medium">Email</label>
          <input
            readOnly
            placeholder="you@example.com"
            style={previewInputStyle(uiStyle.input, {
              width: "100%",
              padding: "12px 14px",
              borderRadius: btnRadius === "0" ? 0 : 8,
              background: "var(--color-canvas)",
            })}
          />
          <label className="mb-1 mt-3 block text-sm font-medium">Password</label>
          <input
            readOnly
            placeholder="••••••••"
            style={previewInputStyle(uiStyle.input, {
              width: "100%",
              padding: "12px 14px",
              borderRadius: btnRadius === "0" ? 0 : 8,
              background: "var(--color-canvas)",
            })}
          />
          <div className="mt-4">
            <PrimaryButton label="Continue" btnRadius={btnRadius} uiStyle={uiStyle} full />
          </div>
        </div>
      </Section>
      <Section title="Alternatives" soft>
        <div className="mx-auto grid max-w-[360px] gap-2">
          {["Continue with Google", "Continue with GitHub"].map((label) => (
            <SecondaryButton key={label} label={label} btnRadius={btnRadius} uiStyle={uiStyle} />
          ))}
        </div>
      </Section>
      <Section title="Trust notes">
        <ul className="mx-auto max-w-[360px] space-y-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
          {["SSO available on Pro", "We never store plaintext passwords", "2FA recommended"].map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      </Section>
      <Section title="Onboarding step" soft>
        <div className="mx-auto max-w-[360px]" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="text-xs" style={{ color: "var(--color-ink-subtle)" }}>Step 2 of 3</p>
          <p className="mt-1 font-semibold">Invite your team</p>
          <div className="mt-3 h-2 rounded-full" style={{ background: "var(--color-canvas-soft)" }}>
            <div style={{ width: "66%", height: "100%", background: "var(--color-primary)", borderRadius: 999 }} />
          </div>
        </div>
      </Section>
    </>
  );
}

function AdminPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Bulk actions">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" readOnly checked className="h-4 w-4" />
            <span style={{ color: "var(--color-ink-muted)" }}>3 selected</span>
          </label>
          <div className="flex gap-2">
            <SecondaryButton label="Export" btnRadius={btnRadius} uiStyle={uiStyle} />
            <PrimaryButton label="Delete" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
      <Section title="Filters" soft>
        <div className="flex flex-wrap gap-2">
          {["All users", "Admins", "Suspended", "Invited"].map((f, i) => (
            <span key={f} className="text-xs font-medium" style={{ padding: "5px 10px", borderRadius: 6, background: i === 0 ? "var(--color-primary)" : "var(--color-canvas)", color: i === 0 ? "var(--color-on-primary)" : "var(--color-ink)", border: "1px solid var(--color-hairline)" }}>
              {f}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Users table">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 0, overflow: "hidden" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--color-canvas)", color: "var(--color-ink-muted)" }}>
                <th className="px-3 py-1.5 text-left">
                  <input type="checkbox" readOnly className="h-3.5 w-3.5" />
                </th>
                <th className="px-3 py-1.5 text-left">User</th>
                <th className="px-3 py-1.5 text-left">Role</th>
                <th className="px-3 py-1.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ada@co", "Owner", "Active"],
                ["lin@co", "Editor", "Active"],
                ["sam@co", "Viewer", "Invited"],
              ].map(([u, r, s], i) => (
                <tr key={u} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                  <td className="px-3 py-1.5">
                    <input type="checkbox" readOnly checked={i < 1} className="h-3.5 w-3.5" />
                  </td>
                  <td className="px-3 py-1.5 font-mono text-xs">{u}</td>
                  <td className="px-3 py-1.5">{r}</td>
                  <td className="px-3 py-1.5">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ padding: "2px 8px", borderRadius: 999, background: s === "Active" ? "var(--color-success)" : "var(--color-warning)", color: "var(--color-on-primary)" }}
                    >
                      {s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Audit log" soft>
        <div className="space-y-1 text-xs">
          {["Role changed: Viewer → Editor", "API key rotated", "SSO enforced"].map((row) => (
            <div key={row} style={{ ...cardBase, background: "var(--color-canvas)", padding: "6px 10px" }}>{row}</div>
          ))}
        </div>
      </Section>
    </>
  );
}

function MobilePreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Home stack">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", maxWidth: 320, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }}>Good morning</p>
          <div className="mt-4 space-y-2">
            {["Continue lesson", "3 unread", "Weekly goal"].map((item) => (
              <div key={item} className="rounded-lg px-3 py-3 text-sm" style={{ background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Large touch actions" soft>
        <div className="mx-auto grid max-w-[320px] gap-2">
          <PrimaryButton label="Primary action" btnRadius={btnRadius} uiStyle={uiStyle} full />
          <SecondaryButton label="Secondary" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
      <Section title="Cards">
        <div className="mx-auto max-w-[320px] space-y-2">
          {["Streak: 5 days", "Next: Typography"].map((t) => (
            <div key={t} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 14 }}>{t}</div>
          ))}
        </div>
      </Section>
      <Section title="Bottom nav" soft>
        <div className="mx-auto flex max-w-[320px] justify-around rounded-xl px-2 py-3 text-xs font-medium" style={{ background: "var(--color-canvas)", ...uiStyle.nav }}>
          {["Home", "Search", "You"].map((tab, i) => (
            <span key={tab} style={{ color: i === 0 ? "var(--color-primary)" : "var(--color-ink-muted)" }}>{tab}</span>
          ))}
        </div>
      </Section>
    </>
  );
}

function MarketplacePreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  const sellers: [string, string, string][] = [
    ["Studio North", "4.9", "128 sales"],
    ["Paper & Grain", "4.8", "86 sales"],
    ["Coastal Forge", "4.6", "54 sales"],
  ];
  return (
    <>
      <Section title="Top sellers">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 0, overflow: "hidden" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "var(--color-ink-muted)" }}>
                <th className="px-3 py-2 text-left">Seller</th>
                <th className="px-3 py-2 text-left">Rating</th>
                <th className="px-3 py-2 text-left">Sales</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map(([name, rating, sales]) => (
                <tr key={name} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span style={{ width: 24, height: 24, borderRadius: 999, background: "var(--color-primary)", color: "var(--color-on-primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
                        {name[0]}
                      </span>
                      <span className="font-medium">{name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2" style={{ color: "var(--color-warning)" }}>★ {rating}</td>
                  <td className="px-3 py-2" style={{ color: "var(--color-ink-muted)" }}>{sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Listings" soft>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Ceramic vase", "Linen throw", "Oak stool"].map((item, i) => (
            <div key={item} style={{ ...cardBase, background: "var(--color-canvas)" }}>
              <div style={{ height: 60, background: "var(--color-canvas-soft)", borderRadius: cardBase.borderRadius, marginBottom: 8 }} />
              <p style={{ fontWeight: 600 }}>{item}</p>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className="text-[11px] font-medium"
                  style={{ padding: "3px 8px", borderRadius: 999, background: "var(--color-canvas-soft)", color: "var(--color-ink-muted)", border: "1px solid var(--color-hairline)" }}
                >
                  {sellers[i % sellers.length][0]}
                </span>
                <SecondaryButton label="View" btnRadius={btnRadius} uiStyle={uiStyle} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Order pipeline">
        <div className="flex items-center gap-2">
          {["Placed", "Shipped", "Delivered"].map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 6px",
                  borderRadius: btnRadius,
                  background: i <= 1 ? "var(--color-primary)" : "var(--color-canvas-soft)",
                  color: i <= 1 ? "var(--color-on-primary)" : "var(--color-ink-muted)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {step}
              </div>
              {i < 2 && <span style={{ color: "var(--color-ink-subtle)" }}>→</span>}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Trust" soft>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {["Buyer protection", "Verified sellers", "Secure checkout"].map((t) => (
            <div key={t} style={{ ...cardBase, background: "var(--color-canvas)", padding: 12 }}>{t}</div>
          ))}
        </div>
      </Section>
    </>
  );
}

function SocialPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  const posts: [string, string, number, number][] = [
    ["Ada", "Shipped the new type scale today.", 24, 6],
    ["Lin", "Anyone tried the contrast fixer?", 11, 3],
  ];
  return (
    <>
      <Section title="Stories">
        <div className="flex gap-3 overflow-hidden">
          {["You", "Ada", "Lin", "Sam", "Rin"].map((name, i) => (
            <div key={name} className="shrink-0 text-center">
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  border: `2px solid ${i === 0 ? "var(--color-hairline)" : "var(--color-primary)"}`,
                  margin: "0 auto",
                  background: "var(--color-canvas-soft)",
                }}
              />
              <p className="mt-1 text-xs">{name}</p>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-3 gap-0" style={{ borderTop: "1px solid var(--color-hairline)" }}>
        <div className="col-span-2 space-y-3 p-4">
          {posts.map(([who, body, likes, comments]) => (
            <div key={who} style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--color-primary)", color: "var(--color-on-primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  {who[0]}
                </span>
                <p className="text-sm font-semibold">{who}</p>
              </div>
              <p className="mt-2 text-sm">{body}</p>
              <div className="mt-3 flex gap-4 text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                <span>{likes} likes</span>
                <span>{comments} comments</span>
              </div>
            </div>
          ))}
        </div>
        <aside className="col-span-1 p-4" style={{ background: "var(--color-canvas-soft)", borderLeft: "1px solid var(--color-hairline)" }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {["Maya", "Omar", "Rin"].map((n) => (
              <span key={n} className="text-xs font-medium" style={{ padding: "6px 10px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
                + {n}
              </span>
            ))}
          </div>
        </aside>
      </div>
      <Section title="Compose" soft>
        <div className="flex gap-2">
          <PrimaryButton label="Post" btnRadius={btnRadius} uiStyle={uiStyle} />
          <SecondaryButton label="Attach" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function EducationPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Continue learning">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Typography foundations</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "var(--color-canvas)" }}>
            <div style={{ width: "58%", height: "100%", background: "var(--color-primary)" }} />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--color-ink-muted)" }}>Lesson 4 of 7 · 58%</p>
          <div className="mt-3">
            <PrimaryButton label="Resume lesson" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
      <Section title="Module list" soft>
        <div className="space-y-2">
          {["Scale & rhythm", "Pairing fonts", "Accessibility"].map((m, i) => (
            <div key={m} className="flex justify-between text-sm" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 12px" }}>
              <span>{i + 1}. {m}</span>
              <span style={{ color: i < 2 ? "var(--color-success)" : "var(--color-ink-subtle)" }}>{i < 2 ? "Done" : "Locked"}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Quiz check">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <p className="font-semibold">What is a modular scale?</p>
          <div className="mt-3 space-y-2 text-sm">
            {["A ratio for type sizes", "A color palette"].map((a, i) => (
              <div key={a} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${i === 0 ? "var(--color-primary)" : "var(--color-hairline)"}`, background: "var(--color-canvas)" }}>
                {a}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Certificate" soft>
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div>
            <p className="font-semibold">Course certificate</p>
            <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Unlocks at 100%</p>
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--color-warning)" }}>In progress</span>
        </div>
      </Section>
    </>
  );
}

function BookingPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  const selectedDay = 16;
  return (
    <>
      <Section title="Month">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>March</p>
            <div className="flex gap-3 text-xs" style={{ color: "var(--color-ink-subtle)" }}>
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px]" style={{ color: "var(--color-ink-subtle)" }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 4;
              const inMonth = day >= 1 && day <= 31;
              const isSelected = day === selectedDay;
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                    fontSize: 12,
                    background: isSelected ? "var(--color-primary)" : "var(--color-canvas)",
                    color: isSelected ? "var(--color-on-primary)" : inMonth ? "var(--color-ink)" : "var(--color-ink-subtle)",
                    fontWeight: isSelected ? 700 : 400,
                    opacity: inMonth ? 1 : 0.35,
                  }}
                >
                  {inMonth ? day : ""}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
      <Section title="Time slots" soft>
        <div className="flex flex-wrap gap-2">
          {["9:00", "10:30", "13:00", "15:30", "17:00"].map((slot, i) => (
            <span key={slot} className="text-xs font-medium" style={{ padding: "8px 14px", borderRadius: 999, background: i === 2 ? "var(--color-primary)" : "var(--color-canvas)", color: i === 2 ? "var(--color-on-primary)" : "var(--color-ink)", border: "1px solid var(--color-hairline)" }}>
              {slot}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Service">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["Consultation", "30 min"],
            ["Workshop", "90 min"],
          ].map(([name, dur]) => (
            <div key={name} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 14 }}>
              <p className="font-semibold">{name}</p>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{dur}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Confirm" soft>
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div>
            <p className="font-semibold">March {selectedDay} · 13:00</p>
            <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Consultation</p>
          </div>
          <PrimaryButton label="Book slot" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function NewsPreview(ctx: PreviewCtx) {
  const { cardBase } = ctx;
  return (
    <>
      <Section title="Front page">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase" style={{ color: "var(--color-error)" }}>Breaking</p>
            <h2 className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28 }}>
              Cities rethink public typography after accessibility audit
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
              Fast scanning hierarchy — headline first, metadata quiet.
            </p>
          </div>
          <div className="space-y-3">
            {["Council approves new signage standard", "Transit maps redesigned for legibility"].map((t) => (
              <div key={t} style={{ borderLeft: "3px solid var(--color-primary)", paddingLeft: 10 }}>
                <p className="text-sm font-semibold">{t}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--color-ink-subtle)" }}>3 min read</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Sections" soft>
        <div className="grid gap-3 sm:grid-cols-3">
          {["World", "Business", "Culture"].map((section) => (
            <div key={section} style={{ borderLeft: "3px solid var(--color-primary)", paddingLeft: 12 }}>
              <p className="text-xs uppercase" style={{ color: "var(--color-ink-subtle)" }}>{section}</p>
              <p className="mt-1 text-sm font-semibold">Three brief headlines stacked for scan speed.</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Opinion">
        <div
          style={{
            ...omitBorderShorthand(cardBase),
            background: "var(--color-canvas-soft)",
            borderTop: "1px solid var(--color-hairline)",
            borderRight: "1px solid var(--color-hairline)",
            borderBottom: "1px solid var(--color-hairline)",
            borderLeft: "3px solid var(--color-ink-subtle)",
          }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, lineHeight: 1.3 }}>
            &ldquo;Why design tokens belong in newsrooms too.&rdquo;
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--color-ink-muted)" }}>By Maya Chen · 6 min</p>
        </div>
      </Section>
      <Section title="Trending" soft>
        <div className="flex flex-wrap gap-2">
          {["#DesignSystems", "#A11y", "#Type"].map((t) => (
            <span key={t} className="text-xs font-medium" style={{ padding: "6px 10px", borderRadius: 4, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
              {t}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

function CommunityPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <div className="grid grid-cols-4 gap-0" style={{ borderTop: "1px solid var(--color-hairline)" }}>
        <aside className="col-span-1 space-y-1 p-3" style={{ background: "var(--color-canvas-soft)", borderRight: "1px solid var(--color-hairline)" }}>
          {["Forum A", "Forum B", "Design Ops", "Type Club"].map((item, i) => (
            <div key={item} className="rounded px-2 py-1.5 text-sm" style={{ background: i === 0 ? "var(--color-canvas)" : "transparent", color: i === 0 ? "var(--color-ink)" : "var(--color-ink-muted)" }}>
              # {item}
            </div>
          ))}
        </aside>
        <div className="col-span-3 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Forum A</p>
          <div
            style={{
              ...omitBorderShorthand(cardBase),
              background: "var(--color-canvas-soft)",
              borderTop: "1px solid var(--color-primary)",
              borderRight: "1px solid var(--color-primary)",
              borderBottom: "1px solid var(--color-primary)",
              borderLeft: "1px solid var(--color-primary)",
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-primary)" }}>Pinned</span>
            <p className="mt-1 font-semibold">Read this before posting</p>
            <p className="mt-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>Community guidelines · 214 replies</p>
          </div>
          <div className="mt-2 space-y-2">
            {["How do you version tokens?", "Share your spacing base"].map((t) => (
              <div key={t} className="flex justify-between text-sm" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 12px" }}>
                <span className="font-medium">{t}</span>
                <span style={{ color: "var(--color-ink-subtle)" }}>18 replies</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Section title="Members" soft>
        <div className="flex flex-wrap gap-2">
          {["Rin · Mod", "Ada · Top helper", "Lin · New member"].map((m) => (
            <span key={m} className="text-xs font-medium" style={{ padding: "6px 12px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
              {m}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Upcoming event">
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <div>
            <p className="font-semibold">Office hours</p>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>Thu 4pm · Voice channel</p>
          </div>
          <SecondaryButton label="RSVP" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function AgencyPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle, displayStep, config } = ctx;
  return (
    <>
      <Section title="Split hero">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
              Full-service agency
            </p>
            <h1
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: displayStep?.fontSize ?? "34px",
                lineHeight: displayStep?.lineHeight ?? 1.1,
              }}
            >
              {config.tagline || "Brand, product, and web under one roof"}
            </h1>
            <div className="mt-4">
              <PrimaryButton label="Start a project" btnRadius={btnRadius} uiStyle={uiStyle} />
            </div>
          </div>
          <div
            style={{
              ...cardBase,
              background: "var(--color-primary)",
              color: "var(--color-on-primary)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 140,
            }}
          >
            <p className="text-xs uppercase tracking-wide opacity-80">Case result</p>
            <p className="mt-2 text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>+38%</p>
            <p className="mt-1 text-sm opacity-90">Conversion lift for Harbor Commerce</p>
          </div>
        </div>
      </Section>
      <Section title="Logo wall" soft>
        <div className="flex flex-wrap items-center justify-between gap-4 opacity-70">
          {["NORTH", "FIELD", "ATLAS", "COVE", "PAPER"].map((logo) => (
            <span key={logo} className="text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
              {logo}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Case study">
        <div className="grid gap-3 sm:grid-cols-2">
          <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
            <p className="text-xs uppercase" style={{ color: "var(--color-ink-subtle)" }}>Selected work</p>
            <p className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
              Harbor Commerce rebrand
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
              Identity, storefront, and campaign system delivered in six weeks.
            </p>
          </div>
          <div
            style={{
              ...cardBase,
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
              4.2x
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>Return on ad spend</p>
          </div>
        </div>
      </Section>
      <Section title="Contact" soft>
        <div className="flex flex-wrap items-center justify-between gap-3" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Tell us about your project</p>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>We reply within one business day.</p>
          </div>
          <PrimaryButton label="Book a call" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function FintechPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Accounts">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Checking", "$8,420.12"],
            ["Savings", "$24,110.00"],
          ].map(([name, amt]) => (
            <div key={name} style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{name}</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{amt}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Upcoming bills" soft>
        <div className="space-y-2 text-sm">
          {[
            ["Rent", "$1,850", "May 1"],
            ["Internet", "$79", "May 4"],
            ["Car payment", "$310", "May 9"],
          ].map(([name, amt, due]) => (
            <div key={name} className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 12px" }}>
              <span className="font-medium">{name}</span>
              <span style={{ color: "var(--color-ink-muted)" }}>{amt} · due {due}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Card">
        <div
          style={{
            ...cardBase,
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
            color: "var(--color-on-primary)",
            minHeight: 110,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p className="text-xs opacity-80">Everyday debit</p>
          <div>
            <p className="text-lg tracking-widest">•••• •••• •••• 4242</p>
            <p className="mt-1 text-xs opacity-80">Ada Rivera · Exp 08/29</p>
          </div>
        </div>
      </Section>
      <Section title="Transfer" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div className="flex flex-wrap gap-2">
            <input
              readOnly
              placeholder="From: Checking"
              className="min-w-[140px] flex-1"
              style={previewInputStyle(uiStyle.input, { padding: "10px 12px", borderRadius: 8 })}
            />
            <input
              readOnly
              placeholder="To: Savings"
              className="min-w-[140px] flex-1"
              style={previewInputStyle(uiStyle.input, { padding: "10px 12px", borderRadius: 8 })}
            />
          </div>
          <div className="mt-3"><PrimaryButton label="Send money" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
        </div>
      </Section>
    </>
  );
}

function HealthcarePreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Vitals">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            ["BP", "118/76"],
            ["HR", "68 bpm"],
            ["Weight", "154 lb"],
          ].map(([l, v]) => (
            <div key={l} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 14 }}>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{l}</p>
              <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>{v}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Next appointment" soft>
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div>
            <p className="font-semibold">Dr. Rivera · Primary care</p>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>Thu 10:30 · Clinic B</p>
          </div>
          <PrimaryButton label="Manage" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
      <Section title="Lab results">
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <div>
            <p className="font-semibold">Basic metabolic panel</p>
            <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Reported Apr 10</p>
          </div>
          <span className="text-xs font-semibold" style={{ padding: "6px 12px", borderRadius: 999, background: "var(--color-success)", color: "var(--color-on-primary)" }}>
            Normal
          </span>
        </div>
      </Section>
      <Section title="Message care team" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>Ask a non-urgent question</p>
          <div className="mt-3"><SecondaryButton label="Start message" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
        </div>
      </Section>
    </>
  );
}

function RealEstatePreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Filters">
        <div className="flex flex-wrap gap-2">
          {["Buy", "Rent", "2+ beds", "Pet ok"].map((f, i) => (
            <span key={f} className="text-xs font-medium" style={{ padding: "6px 12px", borderRadius: 999, background: i === 0 ? "var(--color-primary)" : "var(--color-canvas-soft)", color: i === 0 ? "var(--color-on-primary)" : "var(--color-ink)" }}>
              {f}
            </span>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-3 gap-0" style={{ borderTop: "1px solid var(--color-hairline)" }}>
        <div className="col-span-2 space-y-3 p-4">
          {[
            ["Maple Loft", "$2,450/mo", "2 bd", "1 ba", "980 sqft"],
            ["Harbor Condo", "$689k", "3 bd", "2 ba", "1,420 sqft"],
          ].map(([name, price, beds, baths, sqft]) => (
            <div key={name} style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <div className="flex gap-3">
                <div style={{ width: 70, height: 70, background: "var(--color-canvas)", borderRadius: cardBase.borderRadius, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}>{name}</p>
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{price}</p>
                  <div className="mt-2 flex gap-1">
                    {[beds, baths, sqft].map((chip) => (
                      <span key={chip} className="text-[10px] font-medium" style={{ padding: "3px 8px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside
          className="col-span-1 flex flex-col items-center justify-center gap-2"
          style={{ background: "var(--color-canvas-soft)", borderLeft: "1px solid var(--color-hairline)", minHeight: 180 }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--color-ink-muted)" }}>Map · 12 homes</p>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-primary)" }} />
            ))}
          </div>
        </aside>
      </div>
      <Section title="Tour CTA" soft>
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="font-semibold">Schedule a tour</p>
          <PrimaryButton label="Book" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function FoodDeliveryPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Restaurants nearby">
        <div className="space-y-2">
          {[
            ["Nori Bowl", "22–32 min"],
            ["Brick Oven", "30–40 min"],
          ].map(([name, eta]) => (
            <div key={name} className="flex justify-between" style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "12px 14px" }}>
              <span className="font-semibold">{name}</span>
              <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{eta}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Menu" soft>
        <div className="space-y-3">
          {[
            ["Spicy ramen", "$14"],
            ["Matcha soft serve", "$6"],
          ].map(([item, price]) => (
            <div key={item} style={{ ...cardBase, background: "var(--color-canvas)", padding: 12 }}>
              <div className="flex justify-between">
                <p className="text-sm font-medium">{item}</p>
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{price}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {["No onion", "Extra spice", "Utensils"].map((m) => (
                  <span key={m} className="text-[10px]" style={{ padding: "4px 8px", borderRadius: 999, border: "1px solid var(--color-hairline)", color: "var(--color-ink-muted)" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Checkout">
        <div className="flex flex-wrap gap-2">
          {["Card ending 4242", "Deliver to Home"].map((o) => (
            <span key={o} className="text-xs font-medium" style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid var(--color-hairline)" }}>
              {o}
            </span>
          ))}
        </div>
      </Section>
      <Section
        title="Cart"
        soft
        style={{ position: "sticky", bottom: 0, background: "var(--color-canvas)", boxShadow: "0 -4px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <p className="font-semibold">2 items · $20</p>
          <PrimaryButton label="Checkout" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}

function TravelPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle, displayStep } = ctx;
  return (
    <>
      <div
        style={{
          minHeight: 160,
          background: "linear-gradient(160deg, var(--color-primary), var(--color-primary-hover))",
          color: "var(--color-on-primary)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "var(--spacing-xl)",
          borderTop: "1px solid var(--color-hairline)",
        }}
      >
        <p className="text-xs uppercase tracking-wide opacity-80">Featured destination</p>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: displayStep?.fontSize ?? "34px" }}>Lisbon</p>
        <p className="mt-1 text-sm opacity-90">May 12–24 · 2 travelers</p>
      </div>
      <Section title="Stay picks">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Alfama loft", "River hotel", "Bairro flat"].map((s) => (
            <div key={s} style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
              <div style={{ height: 64, background: "var(--color-canvas)", borderRadius: cardBase.borderRadius, marginBottom: 8 }} />
              <p className="font-semibold">{s}</p>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>From $129/night</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Flights" soft>
        <div className="space-y-2 text-sm">
          {["Nonstop · $640", "1 stop · $480"].map((r) => (
            <div key={r} className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 12px" }}>
              <span>{r}</span>
              <PrimaryButton label="Select" btnRadius={btnRadius} uiStyle={uiStyle} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Itinerary">
        <div className="space-y-3">
          {[
            ["Day 1", "Arrive · check in · Alfama walking tour"],
            ["Day 2", "Belém day trip · sunset at Miradouro"],
          ].map(([day, plan]) => (
            <div key={day} className="flex gap-3">
              <span
                className="shrink-0 text-xs font-semibold"
                style={{ padding: "4px 10px", borderRadius: 999, background: "var(--color-primary)", color: "var(--color-on-primary)", height: "fit-content" }}
              >
                {day}
              </span>
              <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{plan}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function MusicPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Album grid">
        <div className="grid grid-cols-2 gap-2" style={{ maxWidth: 200 }}>
          {["var(--color-primary)", "var(--color-primary-hover)", "var(--color-ink-subtle)", "var(--color-canvas-soft)"].map((bg, i) => (
            <div
              key={i}
              style={{ aspectRatio: "1 / 1", borderRadius: cardBase.borderRadius, background: bg, border: "1px solid var(--color-hairline)" }}
            />
          ))}
        </div>
      </Section>
      <Section title="Waveform" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="text-sm font-semibold">Midnight Circuit · Nova Atlas</p>
          <div className="mt-3 flex h-12 items-end gap-[3px]">
            {[20, 45, 30, 60, 38, 70, 50, 80, 42, 65, 34, 58, 28, 72, 46].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--color-primary)", borderRadius: 2, opacity: 0.4 + (i % 5) * 0.12 }} />
            ))}
          </div>
        </div>
      </Section>
      <Section title="Playlists">
        <div className="flex flex-wrap gap-2">
          {["Focus", "Drive", "Late night", "Workout"].map((p) => (
            <span key={p} className="text-xs font-medium" style={{ padding: "8px 14px", borderRadius: 999, background: "var(--color-canvas-soft)", border: "1px solid var(--color-hairline)" }}>
              {p}
            </span>
          ))}
        </div>
      </Section>
      <Section
        title="Player bar"
        soft
        style={{ position: "sticky", bottom: 0, background: "var(--color-canvas)", boxShadow: "0 -4px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--color-primary)", flexShrink: 0 }} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Midnight Circuit</p>
              <p className="truncate text-xs" style={{ color: "var(--color-ink-muted)" }}>Nova Atlas</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <SecondaryButton label="Prev" btnRadius={btnRadius} uiStyle={uiStyle} />
            <PrimaryButton label="Play" btnRadius={btnRadius} uiStyle={uiStyle} />
            <SecondaryButton label="Next" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
    </>
  );
}

function PodcastPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Featured show">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div style={{ width: 96, height: 96, borderRadius: cardBase.borderRadius, background: "var(--color-primary)", flexShrink: 0 }} />
          <div className="flex-1">
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>Design Systems Weekly</p>
            <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>Interviews with builders shipping tokens</p>
            <div className="mt-3 flex h-8 items-end gap-[2px]">
              {[10, 30, 55, 20, 40, 65, 15, 50, 35, 60, 25, 45, 12, 38, 28].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--color-ink-subtle)", opacity: 0.55, borderRadius: 1 }} />
              ))}
            </div>
            <div className="mt-3"><PrimaryButton label="Follow show" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
          </div>
        </div>
      </Section>
      <Section title="Episodes" soft>
        <div className="space-y-2 text-sm">
          {[
            ["#128 Contrast debt", "42 min", "Apr 12"],
            ["#127 Type in product", "38 min", "Apr 5"],
          ].map(([title, dur, date]) => (
            <div key={title} className="flex justify-between" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 12px" }}>
              <span className="font-medium">{title}</span>
              <span style={{ color: "var(--color-ink-subtle)" }}>{dur} · {date}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Chapters">
        <div className="space-y-1 text-sm">
          {[
            ["00:00", "Intro"],
            ["04:20", "The debt metaphor"],
            ["18:45", "Fixing contrast at scale"],
            ["33:10", "Listener questions"],
          ].map(([time, chapter]) => (
            <div key={time} className="flex gap-3" style={{ padding: "6px 4px", borderBottom: "1px solid var(--color-hairline)" }}>
              <span className="font-mono text-xs" style={{ color: "var(--color-ink-subtle)" }}>{time}</span>
              <span>{chapter}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Listen" soft>
        <PrimaryButton label="Play latest episode" btnRadius={btnRadius} uiStyle={uiStyle} full />
      </Section>
    </>
  );
}

function CryptoPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Wallet">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Portfolio</p>
              <p className="text-2xl font-bold font-mono">$12,480.22</p>
            </div>
            <span className="font-mono text-xs" style={{ padding: "4px 10px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
              0xA4b2…91F2
            </span>
          </div>
          <div className="mt-3 flex justify-between font-mono text-xs" style={{ color: "var(--color-ink-subtle)" }}>
            <span>Gas: 12 gwei</span>
            <span>Network fee: $1.84</span>
          </div>
        </div>
      </Section>
      <Section title="Chart" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 100 }}>
          <p className="text-sm font-semibold">ETH / USD</p>
          <div className="mt-3 flex h-14 items-end gap-1">
            {[30, 45, 38, 60, 55, 72, 68].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--color-primary)", opacity: 0.4 + i * 0.08 }} />
            ))}
          </div>
        </div>
      </Section>
      <Section title="Transaction">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <p className="text-xs uppercase" style={{ color: "var(--color-ink-subtle)" }}>Tx hash</p>
          <p className="mt-1 break-all font-mono text-xs" style={{ color: "var(--color-ink-muted)" }}>
            0x7f9a1c3e4b8d2f6a0e5c9b1d3a7f2e8c4b6d0a9e1f3c5b7d9e2a4c6b8d0f1a3e
          </p>
        </div>
      </Section>
      <Section title="Confirm swap" soft>
        <div
          style={{
            ...omitBorderShorthand(cardBase),
            background: "var(--color-canvas)",
            borderTop: "1px solid var(--color-warning)",
            borderRight: "1px solid var(--color-warning)",
            borderBottom: "1px solid var(--color-warning)",
            borderLeft: "1px solid var(--color-warning)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--color-warning)" }}>⚠ Review before confirming</p>
          <p className="mt-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>Swap 1.0 ETH → 3,240 USDC · Slippage 0.5%</p>
          <div className="mt-3 flex gap-2">
            <PrimaryButton label="Approve" btnRadius={btnRadius} uiStyle={uiStyle} />
            <SecondaryButton label="Cancel" btnRadius={btnRadius} uiStyle={uiStyle} />
          </div>
        </div>
      </Section>
    </>
  );
}

function NonprofitPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <HeroBand ctx={ctx} eyebrow="Nonprofit" cta="Donate now" secondary="Our mission" />
      <Section title="Impact">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["12k", "meals"],
            ["38", "cities"],
            ["92%", "to programs"],
          ].map(([n, l]) => (
            <div key={l} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: 12 }}>
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{n}</p>
              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{l}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Campaign goal" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Spring fundraiser</span>
            <span style={{ color: "var(--color-ink-muted)" }}>$42,000 of $60,000</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: "var(--color-canvas-soft)" }}>
            <div style={{ width: "70%", height: "100%", background: "var(--color-primary)" }} />
          </div>
        </div>
      </Section>
      <Section title="Choose an amount">
        <div className="flex flex-wrap gap-2">
          {["$25", "$50", "$100", "Custom"].map((a, i) => (
            <span
              key={a}
              className="text-sm font-medium"
              style={{ padding: "8px 14px", borderRadius: btnRadius, background: i === 1 ? "var(--color-primary)" : "var(--color-canvas-soft)", color: i === 1 ? "var(--color-on-primary)" : "var(--color-ink)" }}
            >
              {a}
            </span>
          ))}
        </div>
        <div className="mt-3"><PrimaryButton label="Give monthly" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
      </Section>
      <Section title="Story" soft>
        <div style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="font-semibold">How Mira&rsquo;s pantry got restocked</p>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>A neighborhood story with measurable outcomes.</p>
        </div>
      </Section>
    </>
  );
}

function EventPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Countdown">
        <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <p className="text-xs uppercase" style={{ color: "var(--color-ink-subtle)" }}>May 18–19 · San Francisco</p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24 }}>Systems Summit</p>
          <div className="mt-3 flex gap-2">
            {[
              ["02", "days"],
              ["14", "hrs"],
              ["08", "min"],
            ].map(([n, l]) => (
              <div key={l} className="text-center" style={{ ...cardBase, background: "var(--color-canvas)", padding: "10px 16px", minWidth: 60 }}>
                <p className="font-mono text-xl font-bold">{n}</p>
                <p className="text-[10px] uppercase" style={{ color: "var(--color-ink-subtle)" }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4"><PrimaryButton label="Get tickets" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
        </div>
      </Section>
      <Section title="Venue & speakers" soft>
        <div className="grid gap-3 sm:grid-cols-2">
          <div style={{ ...cardBase, background: "var(--color-canvas)", minHeight: 90, display: "grid", placeItems: "center" }}>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>● Moscone Center, SF</p>
          </div>
          <div className="flex items-center gap-3 overflow-hidden">
            {["Ada", "Lin", "Sam"].map((n) => (
              <div key={n} className="shrink-0 text-center">
                <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--color-primary)", color: "var(--color-on-primary)", display: "grid", placeItems: "center", fontWeight: 700, margin: "0 auto" }}>
                  {n[0]}
                </div>
                <p className="mt-1 text-xs">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Schedule">
        <div className="space-y-2 text-sm">
          {["09:00 Keynote", "11:00 Workshops", "16:00 Demo alley"].map((s) => (
            <div key={s} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "8px 12px" }}>{s}</div>
          ))}
        </div>
      </Section>
      <Section title="Your ticket" soft>
        <div className="flex items-center gap-4" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: "2px dashed var(--color-hairline)",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--color-ink-subtle)",
            }}
          >
            QR
          </div>
          <div>
            <p className="font-semibold">General admission</p>
            <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Gate opens 8:00am</p>
          </div>
        </div>
      </Section>
    </>
  );
}

function HrPortalPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  const filled = new Set([2, 5, 9, 10, 14, 18, 20]);
  return (
    <>
      <Section title="Time off">
        <div className="grid gap-4 sm:grid-cols-2" style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
          <div>
            <p className="font-semibold">PTO balance</p>
            <p className="mt-1 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>11 days</p>
            <div className="mt-3"><PrimaryButton label="Request time off" btnRadius={btnRadius} uiStyle={uiStyle} /></div>
          </div>
          <div>
            <p className="mb-2 text-xs" style={{ color: "var(--color-ink-muted)" }}>Last 3 weeks</p>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 3,
                    background: filled.has(i) ? "var(--color-primary)" : "var(--color-canvas)",
                    border: "1px solid var(--color-hairline)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section title="Directory" soft>
        <div className="space-y-2 text-sm">
          {["Ada · Design", "Lin · Eng", "Sam · People"].map((p) => (
            <div key={p} style={{ ...cardBase, background: "var(--color-canvas)", padding: "8px 12px" }}>{p}</div>
          ))}
        </div>
      </Section>
      <Section title="Approvals">
        <div className="space-y-2 text-sm">
          {["Expense · $84", "Laptop request"].map((a) => (
            <div key={a} className="flex items-center justify-between" style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "8px 12px" }}>
              <span>{a}</span>
              <div className="flex gap-2">
                <PrimaryButton label="Approve" btnRadius={btnRadius} uiStyle={uiStyle} />
                <SecondaryButton label="Deny" btnRadius={btnRadius} uiStyle={uiStyle} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Policies" soft>
        <div className="flex flex-wrap gap-2">
          {["Handbook", "Benefits", "Code of conduct"].map((p) => (
            <span key={p} className="text-xs font-medium" style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--color-hairline)" }}>
              {p}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

function LegalPreview(ctx: PreviewCtx) {
  const { cardBase, btnRadius, uiStyle } = ctx;
  return (
    <>
      <Section title="Matters & document review">
        <div className="grid gap-3 sm:grid-cols-2">
          <div style={{ ...cardBase, background: "var(--color-canvas-soft)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Matters</p>
            <div className="mt-2 space-y-2 text-sm">
              {["Acme acquisition", "Brand filing", "Vendor MSA"].map((m, i) => (
                <div
                  key={m}
                  className="flex justify-between"
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: i === 0 ? "var(--color-canvas)" : "transparent",
                    border: i === 0 ? "1px solid var(--color-primary)" : "1px solid transparent",
                  }}
                >
                  <span>{m}</span>
                  <span style={{ color: "var(--color-ink-subtle)" }}>Open</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              ...omitBorderShorthand(cardBase),
              background: "var(--color-canvas)",
              borderTop: "1px solid var(--color-hairline)",
              borderRight: "1px solid var(--color-hairline)",
              borderBottom: "1px solid var(--color-hairline)",
              borderLeft: "1px solid var(--color-hairline)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-subtle)" }}>Document preview</p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
              The Parties agree that <span style={{ textDecoration: "line-through", color: "var(--color-error)" }}>thirty (30)</span>{" "}
              <span style={{ color: "var(--color-success)", fontWeight: 600 }}>forty-five (45)</span> days notice shall be provided prior to termination.
            </p>
            <div className="mt-3 flex gap-2">
              <PrimaryButton label="Approve" btnRadius={btnRadius} uiStyle={uiStyle} />
              <SecondaryButton label="Redline" btnRadius={btnRadius} uiStyle={uiStyle} />
            </div>
          </div>
        </div>
      </Section>
      <Section title="Practice areas" soft>
        <div className="flex flex-wrap gap-2">
          {["Corporate", "IP", "Litigation", "Employment"].map((p) => (
            <span key={p} className="text-xs font-medium" style={{ padding: "6px 12px", borderRadius: 999, background: "var(--color-canvas)", border: "1px solid var(--color-hairline)" }}>
              {p}
            </span>
          ))}
        </div>
      </Section>
      <Section title="Documents">
        <div className="space-y-2 text-sm">
          {["NDA template", "Engagement letter"].map((d) => (
            <div key={d} style={{ ...cardBase, background: "var(--color-canvas-soft)", padding: "8px 12px" }}>{d}</div>
          ))}
        </div>
      </Section>
      <Section title="Consult CTA" soft>
        <div className="flex justify-between items-center" style={{ ...cardBase, background: "var(--color-canvas)" }}>
          <p className="font-semibold">Request a consult</p>
          <PrimaryButton label="Contact" btnRadius={btnRadius} uiStyle={uiStyle} />
        </div>
      </Section>
    </>
  );
}
