"use client";

import { memo, useCallback, useEffect } from "react";
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useViewportStore,
  DEVICE_SPECS,
  type DevicePreset,
} from "@/store/viewport-store";

// ─── Device button definitions ────────────────────────────────────────────────

type DeviceButtonDef = {
  id: DevicePreset;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const DEVICE_BUTTONS: DeviceButtonDef[] = [
  { id: "desktop", Icon: Monitor,    label: "Desktop" },
  { id: "tablet",  Icon: Tablet,     label: "Tablet (768px)" },
  { id: "mobile",  Icon: Smartphone, label: "Mobile (390px)" },
];

// ─── Toolbar ──────────────────────────────────────────────────────────────────

/**
 * PreviewToolbar
 *
 * Provides device-preset toggles (Desktop / Tablet / Mobile) and zoom
 * controls (+/- buttons, click-to-reset percentage display).
 *
 * Reads/writes: useViewportStore (Zustand, persisted to localStorage)
 * Side-effects: registers Ctrl/Cmd +/-/0 keyboard shortcuts
 */
export const PreviewToolbar = memo(function PreviewToolbar() {
  const { device, zoom, setDevice, zoomIn, zoomOut, resetZoom } =
    useViewportStore();

  const spec   = DEVICE_SPECS[device];
  const pct    = Math.round(zoom * 100);
  const canIn  = zoom < 2;
  const canOut = zoom > 0.25;

  // ── Keyboard shortcuts: Ctrl/Cmd + = | - | 0 ─────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      if (e.key === "=" || e.key === "+") { e.preventDefault(); zoomIn(); }
      if (e.key === "-")                  { e.preventDefault(); zoomOut(); }
      if (e.key === "0")                  { e.preventDefault(); resetZoom(); }
    },
    [zoomIn, zoomOut, resetZoom]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      role="toolbar"
      aria-label="Preview viewport controls"
      className={cn(
        "shrink-0 flex items-center gap-3 px-4 h-10",
        "border-b border-border bg-card/50 backdrop-blur-sm"
      )}
    >
      {/* ── Device toggles ──────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/60 p-0.5"
        role="group"
        aria-label="Device preset"
      >
        {DEVICE_BUTTONS.map(({ id, Icon, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={device === id}
            aria-label={label}
            title={label}
            onClick={() => setDevice(id)}
            className={cn(
              "flex items-center justify-center h-6 w-6 rounded-md transition-all duration-150",
              device === id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>

      {/* ── Viewport dimensions ─────────────────────────────────────────── */}
      <span
        className="hidden sm:block text-[11px] font-mono tabular-nums text-muted-foreground select-none"
        aria-live="polite"
        aria-label="Viewport dimensions"
      >
        {spec.width != null
          ? `${spec.width} × ${spec.height}`
          : "Responsive"}
      </span>

      {/* ── Zoom controls ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-0.5 ml-auto" role="group" aria-label="Zoom controls">
        <button
          type="button"
          onClick={zoomOut}
          disabled={!canOut}
          aria-label="Zoom out (Ctrl −)"
          title="Zoom out (Ctrl −)"
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-md transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            "disabled:opacity-35 disabled:pointer-events-none"
          )}
        >
          <ZoomOut className="w-3 h-3" />
        </button>

        {/* Zoom percentage — click to reset */}
        <button
          type="button"
          onClick={resetZoom}
          aria-label={`Current zoom: ${pct}%. Click to reset to 100% (Ctrl 0)`}
          title="Reset zoom to 100% (Ctrl 0)"
          className={cn(
            "h-6 px-1.5 min-w-[44px] rounded-md transition-colors",
            "text-[11px] font-mono font-medium tabular-nums text-foreground",
            "hover:bg-muted",
            zoom !== 1 && "text-primary"
          )}
        >
          {pct}%
        </button>

        <button
          type="button"
          onClick={zoomIn}
          disabled={!canIn}
          aria-label="Zoom in (Ctrl +)"
          title="Zoom in (Ctrl +)"
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-md transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            "disabled:opacity-35 disabled:pointer-events-none"
          )}
        >
          <ZoomIn className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
});

PreviewToolbar.displayName = "PreviewToolbar";
