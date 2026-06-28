import { SiteButton } from "@/components/site/site-button";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteTopNav } from "@/components/site/site-top-nav";

const STEPS = [
  {
    title: "Pick a mood",
    body: "Start from curated templates or generate ten new combos from your own colors.",
  },
  {
    title: "Tune colors",
    body: "Every token is labeled in plain language with live WCAG contrast checks.",
  },
  {
    title: "Export DESIGN.md",
    body: "Download a spec Cursor can follow when you start your next project.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteTopNav title="The Design" action={<SiteButton href="/builder">Start</SiteButton>} />

      <section className="ds-hero-band">
        <div className="ds-container max-w-3xl py-16 text-center sm:py-20">
          <p className="ds-overline">Design system builder</p>
          <h1 className="ds-display-xl mt-3">Theme your next project</h1>
          <p className="ds-body-lg ds-text-muted mx-auto mt-6 max-w-lg">
            Pick a mood, shape your palette and typography, then export a DESIGN.md file for
            Cursor to follow when you start building.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <SiteButton href="/builder" variant="primary">
              Open builder
            </SiteButton>
            <SiteButton href="/builder" variant="tertiary">
              Browse templates
            </SiteButton>
          </div>
        </div>
      </section>

      <section className="ds-container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="ds-overline">How it works</p>
          <h2 className="ds-headline mt-2">Four steps to a design spec</h2>
        </div>
        <div className="ds-feature-grid mx-auto mt-10 max-w-4xl">
          {STEPS.map((step, i) => (
            <article key={step.title} className="ds-card-feature">
              <p className="ds-overline">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="ds-body-md mt-2 font-semibold">{step.title}</h3>
              <p className="ds-body-sm ds-text-muted mt-2">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
