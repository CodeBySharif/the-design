"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDesignStore } from "@/lib/store";

const SEED_SLOTS = 3;
const DEFAULTS = ["#db2777", "#fff1f2", "#4c0519"];

interface SeedColorBarProps {
  className?: string;
}

export function SeedColorBar({ className = "" }: SeedColorBarProps) {
  const seedColors = useDesignStore((s) => s.seedColors);
  const setSeedColors = useDesignStore((s) => s.setSeedColors);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onPointerDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [openIndex]);

  const updateSeed = (index: number, color: string) => {
    const next = seedColors.map((c, i) => (i === index ? color : c));
    setSeedColors(next);
  };

  const addSlot = () => {
    if (seedColors.length >= SEED_SLOTS) return;
    setSeedColors([...seedColors, DEFAULTS[seedColors.length] ?? "#2563eb"]);
  };

  const clearAll = () => {
    setSeedColors([]);
    setOpenIndex(null);
  };

  return (
    <div ref={barRef} className={`flex items-center gap-2 ${className}`}>
      <span className="ds-overline hidden shrink-0 sm:inline">Your colors</span>

      <div className="flex items-center gap-1.5">
        {seedColors.map((color, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="ds-seed-swatch"
              style={{ background: color }}
              aria-label={`Seed color ${index + 1}: ${color}`}
              title={color}
            />
            {openIndex === index && (
              <div className="ds-seed-popover">
                <HexColorPicker color={color} onChange={(v) => updateSeed(index, v)} />
              </div>
            )}
          </div>
        ))}

        {seedColors.length < SEED_SLOTS && (
          <button
            type="button"
            onClick={addSlot}
            className="ds-seed-add"
            aria-label="Add a seed color"
            title="Add color (up to 3)"
          >
            +
          </button>
        )}
      </div>

      {seedColors.length > 0 ? (
        <button type="button" onClick={clearAll} className="ds-seed-clear" title="Clear all colors">
          Clear
        </button>
      ) : (
        <span className="ds-caption hidden text-left sm:inline">Add colors, then Generate</span>
      )}
    </div>
  );
}
