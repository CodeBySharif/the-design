"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { StepIndicator } from "@/components/ui/step-indicator";

interface BuilderHeaderProps {
  step: number;
  onStepClick: (step: number) => void;
  action?: ReactNode;
}

export function BuilderHeader({ step, onStepClick, action }: BuilderHeaderProps) {
  return (
    <header
      className="shrink-0 border-b ds-divider"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="ds-container flex h-14 items-center justify-between">
        <Link href="/builder" className="ds-headline text-base sm:text-lg">
          The Design
        </Link>
        {action}
      </div>
      <div className="ds-container border-t pb-3 pt-3 ds-divider">
        <StepIndicator current={step} onStepClick={onStepClick} />
      </div>
    </header>
  );
}
