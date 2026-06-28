"use client";

const STEPS = ["Mood", "Colors", "Typography", "Export"];

interface StepIndicatorProps {
  current: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ current, onStepClick }: StepIndicatorProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {STEPS.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onStepClick?.(i)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            i === current
              ? "ds-step-active"
              : i < current
                ? "ds-step-done"
                : "ds-step-pending"
          }`}
        >
          {i + 1}. {label}
        </button>
      ))}
    </nav>
  );
}

export { STEPS };
