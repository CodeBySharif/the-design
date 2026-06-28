import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultDesignConfig } from "./defaults";
import type { DesignConfig } from "./schema";
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
  persist(
    (set) => ({
      config: defaultDesignConfig,
      step: 0,
      themeBatch: null,
      fontBatch: null,
      seedColors: [],
      setConfig: (config) => set({ config }),
      updateConfig: (partial) =>
        set((state) => ({ config: { ...state.config, ...partial } })),
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
    {
      name: "design-md-builder",
      merge: (persisted, current) => {
        const p = persisted as Partial<DesignStore> | undefined;
        const step = Math.min(p?.step ?? 0, 3);
        return {
          ...current,
          ...p,
          step,
          config: {
            ...defaultDesignConfig,
            ...p?.config,
            colors: { ...defaultDesignConfig.colors, ...p?.config?.colors },
          },
          themeBatch: p?.themeBatch ?? null,
          fontBatch: p?.fontBatch ?? null,
          seedColors: p?.seedColors ?? [],
        };
      },
    },
  ),
);
