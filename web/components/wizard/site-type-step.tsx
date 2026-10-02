"use client";

import type { DesignConfig } from "@/lib/schema";
import { SITE_TYPE_OPTIONS } from "@/lib/site-types";
import { getDefaultPagesForSiteType } from "@/lib/page-briefs";
import {
  getSuggestedDontsForIdentity,
  getSuggestedDosForIdentity,
} from "@/lib/defaults";
import { StepIntro } from "@/components/wizard/step-intro";

interface SiteTypeStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

export function SiteTypeStep({ config, onChange }: SiteTypeStepProps) {
  const select = (siteType: DesignConfig["siteType"]) => {
    onChange({
      siteType,
      pages: getDefaultPagesForSiteType(siteType),
      dos: getSuggestedDosForIdentity(config),
      donts: getSuggestedDontsForIdentity(config),
    });
  };

  return (
    <div className="ds-step-stack">
      <StepIntro
        overline="Site"
        title="What are you building?"
        description="Pick a site type. It sets product context in DESIGN.md and shapes the live preview."
      />

      <div className="ds-option-grid">
        {SITE_TYPE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => select(option.id)}
            className={`ds-option-tile ${
              config.siteType === option.id ? "ds-option-tile-active" : ""
            }`}
          >
            <p className="font-semibold">{option.label}</p>
            <p className="mt-1 text-xs opacity-80">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
