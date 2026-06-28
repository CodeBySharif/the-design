"use client";

import { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store";
import { SiteButton } from "@/components/site/site-button";
import { BuilderHeader } from "@/components/builder/builder-header";
import { BuilderFooter } from "@/components/builder/builder-footer";
import { STEPS } from "@/components/ui/step-indicator";
import { MoodStep } from "@/components/wizard/mood-step";
import { ColorsStep, colorsStepCanContinue } from "@/components/wizard/colors-step";
import { TypographyStep } from "@/components/wizard/typography-step";
import { ReviewExportStep } from "@/components/wizard/review-export-step";
import { PreviewModal } from "@/components/preview/preview-modal";
import { SeedColorBar } from "@/components/theme/seed-color-bar";
import { countFailingPairs } from "@/lib/contrast-pairs";
import { autoFixContrast } from "@/lib/contrast-fix";
import {
  generateRandomFontPairingBatch,
  generateRandomThemeBatch,
  generateThemeBatchFromSeeds,
  THEME_BATCH_SIZE,
  FONT_PAIRING_BATCH_SIZE,
} from "@/lib/theme-generate";

export default function BuilderPage() {
  const {
    config,
    step,
    setStep,
    updateConfig,
    themeBatch,
    setThemeBatch,
    fontBatch,
    setFontBatch,
    seedColors,
  } = useDesignStore();
  const [lintErrors, setLintErrors] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (step >= STEPS.length) {
      setStep(STEPS.length - 1);
    }
  }, [step, setStep]);

  const canContinue = step !== 1 || colorsStepCanContinue(config);
  const colorFailures = step === 1 ? countFailingPairs(config.colors) : 0;

  const continueHint =
    step === 1 && !canContinue
      ? "Fix contrast issues before continuing (or use Auto-fix)."
      : undefined;

  const goNext = () => {
    if (!canContinue) return;
    setStep(Math.min(step + 1, STEPS.length - 1));
  };

  const goPrev = () => setStep(Math.max(step - 1, 0));

  const runLintAndGetMarkdown = async (): Promise<{
    markdown: string;
    valid: boolean;
    errors: string[];
  }> => {
    const res = await fetch("/api/lint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await res.json();
    return {
      markdown: data.markdown ?? "",
      valid: data.valid ?? false,
      errors: data.errors ?? [],
    };
  };

  const handleExport = async () => {
    setExporting(true);
    setLintErrors([]);
    try {
      const { markdown, valid, errors } = await runLintAndGetMarkdown();
      if (!valid) {
        setLintErrors(errors);
        return;
      }
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = config.exportFilename || "DESIGN.md";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const handleCopy = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await res.json();
    if (data.markdown) {
      await navigator.clipboard.writeText(data.markdown);
    }
  };

  const renderStep = () => {
    const props = { config, onChange: updateConfig };
    switch (step) {
      case 0:
        return <MoodStep {...props} />;
      case 1:
        return <ColorsStep {...props} />;
      case 2:
        return <TypographyStep {...props} />;
      case 3:
        return (
          <ReviewExportStep
            config={config}
            onChange={updateConfig}
            onExport={handleExport}
            onCopy={handleCopy}
            lintErrors={lintErrors}
            exporting={exporting}
          />
        );
      default:
        return null;
    }
  };

  const footerLeft = () => {
    if (step === 0) {
      return (
        <>
          <SeedColorBar className="mr-2 border-r pr-4 ds-divider" />
          <SiteButton variant="primary" onClick={() => setThemeBatch(generateThemeBatchFromSeeds(seedColors, THEME_BATCH_SIZE))}>
            Generate
          </SiteButton>
          <SiteButton variant="secondary" onClick={() => setThemeBatch(generateRandomThemeBatch(THEME_BATCH_SIZE, seedColors))}>
            Randomize
          </SiteButton>
          {themeBatch !== null && (
            <SiteButton variant="ghost" onClick={() => setThemeBatch(null)}>
              Originals
            </SiteButton>
          )}
        </>
      );
    }

    if (step === 1 && colorFailures > 0) {
      return (
        <SiteButton
          variant="secondary"
          onClick={() => {
            const colors = useDesignStore.getState().config.colors;
            updateConfig({ colors: autoFixContrast(colors) });
          }}
        >
          Auto-fix contrast
        </SiteButton>
      );
    }

    if (step === 2) {
      return (
        <>
          <SiteButton variant="secondary" onClick={() => setFontBatch(generateRandomFontPairingBatch(FONT_PAIRING_BATCH_SIZE))}>
            Randomize
          </SiteButton>
          {fontBatch !== null && (
            <SiteButton variant="ghost" onClick={() => setFontBatch(null)}>
              Originals
            </SiteButton>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <BuilderHeader
        step={step}
        onStepClick={setStep}
        action={
          <div className="flex items-center gap-2">
            <SiteButton variant="secondary" onClick={() => setPreviewOpen(true)}>
              Preview
            </SiteButton>
            <SiteButton variant="ghost" onClick={() => useDesignStore.getState().reset()}>
              Reset
            </SiteButton>
          </div>
        }
      />

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="ds-container py-8">{renderStep()}</div>
      </main>

      <BuilderFooter
        left={footerLeft()}
        hint={continueHint}
        back={
          <SiteButton variant="ghost" onClick={goPrev} disabled={step === 0}>
            Back
          </SiteButton>
        }
        forward={
          step < STEPS.length - 1 ? (
            <SiteButton variant="primary" onClick={goNext} disabled={!canContinue}>
              Continue
            </SiteButton>
          ) : null
        }
      />

      <PreviewModal config={config} open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}
