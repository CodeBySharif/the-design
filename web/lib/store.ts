import { create } from "zustand";
import { defaultDesignConfig } from "./defaults";
import type { DesignConfig } from "./schema";
import { sanitizeDesignConfig } from "./sanitize-config";
import type { FontPairing, ThemePreset } from "./theme-presets";

interface DesignStore {
  config: DesignConfig;
  step: number;
  themeBatch: ThemePreset[] | null;
  fontBatch: FontPairing[] | null;
  seedColors: string[];
  setConfig: (config: DesignConfig) => void;
  updateConfig: (partial: Partial<DesignConfig>) => void;
  setStep: (step: number) => void;
  setThemeBatch: (batch: ThemePreset[] | null) => void;
  setFontBatch: (batch: FontPairing[] | null) => void;
  setSeedColors: (colors: string[]) => void;
  reset: () => void;
}

export const useDesignStore = create<DesignStore>()(
  (set) => ({
    config: defaultDesignConfig,
    step: 0,
    themeBatch: null,
    fontBatch: null,
    seedColors: [],
    setConfig: (config) => set({ config: sanitizeDesignConfig(config) }),
    updateConfig: (partial) =>
      set((state) => ({
        config: sanitizeDesignConfig({
          ...state.config,
          ...partial,
          colors: partial.colors
            ? { ...state.config.colors, ...partial.colors }
            : state.config.colors,
          components: partial.components
            ? { ...state.config.components, ...partial.components }
            : state.config.components,
          layout: partial.layout
            ? { ...state.config.layout, ...partial.layout }
            : state.config.layout,
          layoutPatterns: partial.layoutPatterns
            ? { ...state.config.layoutPatterns, ...partial.layoutPatterns }
            : state.config.layoutPatterns,
          dials: partial.dials
            ? { ...state.config.dials, ...partial.dials }
            : state.config.dials,
          pages: partial.pages ?? state.config.pages,
          spacing: partial.spacing
            ? { ...state.config.spacing, ...partial.spacing }
            : state.config.spacing,
          rounded: partial.rounded
            ? { ...state.config.rounded, ...partial.rounded }
            : state.config.rounded,
        }),
      })),
    setStep: (step) => set({ step }),
    setThemeBatch: (themeBatch) => set({ themeBatch }),
    setFontBatch: (fontBatch) => set({ fontBatch }),
    setSeedColors: (seedColors) => set({ seedColors: seedColors.slice(0, 3) }),
    reset: () =>
      set({
        config: defaultDesignConfig,
        step: 0,
        themeBatch: null,
        fontBatch: null,
        seedColors: [],
      }),
  }),
);
