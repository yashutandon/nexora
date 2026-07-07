"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { temporal } from "zundo";
import { themes, ThemeConfig } from "@/registry/themes";
import { SANS_FONTS, SERIF_FONTS, MONO_FONTS } from "@/registry/fonts";

export type ShadowConfig = {
  color: string;
  opacity: number; // 0 - 1
  blur: number; // px
  spread: number; // px
  offsetX: number; // px
  offsetY: number; // px
};

export type TypographyConfig = {
  fontSans: string;
  fontSerif: string;
  fontMono: string;
  letterSpacing: number; // em
};

const DEFAULT_SHADOW: ShadowConfig = {
  color: "#000000",
  opacity: 0.1,
  blur: 6,
  spread: -1,
  offsetX: 0,
  offsetY: 2,
};

const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontSans: SANS_FONTS[0].value,
  fontSerif: SERIF_FONTS[0].value,
  fontMono: MONO_FONTS[0].value,
  letterSpacing: 0,
};

interface ThemeConfigState {
  theme: string;
  radius: number;
  shadow: ShadowConfig;
  typography: TypographyConfig;
  customVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  setTheme: (theme: string) => void;
  setRadius: (radius: number) => void;
  setShadow: (shadow: Partial<ShadowConfig>) => void;
  setTypography: (typography: Partial<TypographyConfig>) => void;
  setCustomVariable: (mode: "light" | "dark", key: string, value: string) => void;
  /** Clears manual color overrides only — does NOT touch the selected theme. */
  resetCustomVariables: () => void;
  /** Full factory reset: theme, radius, shadow, typography, overrides. */
  resetAll: () => void;
  getActiveTheme: () => ThemeConfig | undefined;
}

export const useThemeConfig = create<ThemeConfigState>()(
  temporal(
    persist(
      (set, get) => ({
        theme: "zinc",
        radius: 0.5,
        shadow: DEFAULT_SHADOW,
        typography: DEFAULT_TYPOGRAPHY,
        customVariables: { light: {}, dark: {} },

        setTheme: (theme) => set({ theme, customVariables: { light: {}, dark: {} } }),

        setRadius: (radius) => set({ radius }),

        setShadow: (shadow) =>
          set((state) => ({ shadow: { ...state.shadow, ...shadow } })),

        setTypography: (typography) =>
          set((state) => ({ typography: { ...state.typography, ...typography } })),

        setCustomVariable: (mode, key, value) =>
          set((state) => ({
            customVariables: {
              ...state.customVariables,
              [mode]: { ...state.customVariables[mode], [key]: value },
            },
          })),

        resetCustomVariables: () => set({ customVariables: { light: {}, dark: {} } }),

        resetAll: () =>
          set({
            theme: "zinc",
            radius: 0.5,
            shadow: DEFAULT_SHADOW,
            typography: DEFAULT_TYPOGRAPHY,
            customVariables: { light: {}, dark: {} },
          }),

        getActiveTheme: () => themes.find((t) => t.name === get().theme) || themes[0],
      }),
      {
        name: "nexora-theme-config",
        version: 2,
      }
    ),
    {
      limit: 50,
      partialize: (state) => ({
        theme: state.theme,
        radius: state.radius,
        shadow: state.shadow,
        typography: state.typography,
        customVariables: state.customVariables,
      }),
    }
  )
);