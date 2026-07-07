"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DevicePreset = "desktop" | "tablet" | "mobile";

export interface DeviceSpec {
  readonly label: string;
  readonly width: number | null;  // null = fill container (desktop)
  readonly height: number | null; // null = auto
}

// ─── Device presets ───────────────────────────────────────────────────────────

export const DEVICE_SPECS = {
  desktop: { label: "Desktop", width: null, height: null },
  tablet:  { label: "Tablet",  width: 768,  height: 1024 },
  mobile:  { label: "Mobile",  width: 390,  height: 844  },
} as const satisfies Record<DevicePreset, DeviceSpec>;

// ─── Zoom ─────────────────────────────────────────────────────────────────────

/** Ordered snap-points for keyboard/button zoom. */
export const ZOOM_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2] as const;

// ─── Store ────────────────────────────────────────────────────────────────────

interface ViewportState {
  device: DevicePreset;
  zoom: number;

  setDevice: (device: DevicePreset) => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export const useViewportStore = create<ViewportState>()(
  persist(
    (set, get) => ({
      device: "desktop",
      zoom: 1,

      setDevice: (device) => set({ device }),

      /** Clamp and round to avoid floating-point drift. */
      setZoom: (zoom) =>
        set({ zoom: Math.round(Math.max(0.25, Math.min(2, zoom)) * 100) / 100 }),

      /** Snap to next ZOOM_STEPS value above current. */
      zoomIn: () => {
        const { zoom } = get();
        const next = ZOOM_STEPS.find((z) => z > zoom + 0.001);
        set({ zoom: next ?? Math.min(2, Math.round((zoom + 0.25) * 100) / 100) });
      },

      /** Snap to next ZOOM_STEPS value below current. */
      zoomOut: () => {
        const { zoom } = get();
        const prev = [...ZOOM_STEPS].reverse().find((z) => z < zoom - 0.001);
        set({ zoom: prev ?? Math.max(0.25, Math.round((zoom - 0.25) * 100) / 100) });
      },

      resetZoom: () => set({ zoom: 1 }),
    }),
    {
      name: "nexora-viewport",
      version: 1,
    }
  )
);
