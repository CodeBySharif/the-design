"use client";

const STEPS = ["Style", "Mood", "Colors", "Typography", "Export"];

interface StepIndicatorProps {
  current: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ current, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Builder steps" className="ds-step-rail" style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}>
      {STEPS.map((label, i) => {
        const state = i === current ? "active" : i < current ? "done" : "pending";
        return (
          <button
            key={label}
            type="button"
            onClick={() => onStepClick?.(i)}
            aria-current={i === current ? "step" : undefined}
            className={`ds-step-item ds-step-${state}`}
          >
            <span className="ds-step-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="ds-step-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { STEPS };
