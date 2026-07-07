"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { useViewportStore } from "@/store/viewport-store";

// ─── Mobile chrome (iPhone-style) ─────────────────────────────────────────────

const MobileChrome = memo(function MobileChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label="Mobile device frame (390 × 844)"
      className={cn(
        "relative mx-auto overflow-hidden",
        "rounded-[48px] border-[9px] border-[#1c1c1e]",
        "bg-[#1c1c1e] shadow-[0_32px_80px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      )}
      style={{ width: 390 }}
    >
      {/* Status bar with Dynamic Island */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-center h-11 pt-3 pointer-events-none">
        <div className="w-[126px] h-[34px] bg-[#1c1c1e] rounded-full" aria-hidden />
      </div>

      {/* Subtle side button reflections */}
      <div
        className="absolute right-[-9px] top-[100px] w-[3px] h-[64px] bg-[#2a2a2d] rounded-l pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute left-[-9px] top-[130px] w-[3px] h-[40px] bg-[#2a2a2d] rounded-r pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute left-[-9px] top-[180px] w-[3px] h-[40px] bg-[#2a2a2d] rounded-r pointer-events-none"
        aria-hidden
      />

      {/* Screen — clips content to the screen area */}
      <div
        className="flex flex-col overflow-y-auto overflow-x-hidden rounded-[39px] bg-background"
        style={{ height: 844, paddingTop: 44, paddingBottom: 34 }}
      >
        <div className="flex-1 flex flex-col w-full min-h-full [&>div]:min-h-full [&>div]:flex-1">
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-32 h-[5px] rounded-full bg-[#3a3a3c]" />
      </div>
    </div>
  );
});
MobileChrome.displayName = "MobileChrome";

// ─── Tablet chrome (iPad-style) ───────────────────────────────────────────────

const TabletChrome = memo(function TabletChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label="Tablet device frame (768 × 1024)"
      className={cn(
        "relative mx-auto overflow-hidden",
        "rounded-[28px] border-[10px] border-[#1c1c1e]",
        "bg-[#1c1c1e] shadow-[0_32px_80px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      )}
      style={{ width: 768 }}
    >
      {/* Front camera dot */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-center h-4 pointer-events-none"
        aria-hidden
      >
        <div className="w-[6px] h-[6px] rounded-full bg-[#3a3a3c]" />
      </div>

      {/* Screen */}
      <div
        className="flex flex-col overflow-y-auto overflow-x-hidden rounded-[18px] bg-background"
        style={{ height: 1024, paddingTop: 16, paddingBottom: 24 }}
      >
        <div className="flex-1 flex flex-col w-full min-h-full [&>div]:min-h-full [&>div]:flex-1">
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-24 h-[4px] rounded-full bg-[#3a3a3c]" />
      </div>
    </div>
  );
});
TabletChrome.displayName = "TabletChrome";

// ─── Main component ───────────────────────────────────────────────────────────

interface ResponsiveFrameProps {
  children: React.ReactNode;
}

/**
 * ResponsiveFrame
 *
 * Wraps the preview canvas in the correct layout for the selected device preset:
 *
 *  • Desktop  — full-width canvas (existing PreviewSwitcher layout), zoom applied
 *               via CSS transform on the inner box.
 *  • Tablet   — 768 × 1024 iPad chrome, content scrolls inside the screen area.
 *  • Mobile   — 390 × 844 iPhone chrome with Dynamic Island, side buttons,
 *               and home indicator.
 *
 * Zoom is applied via `transform: scale(zoom)` with `transform-origin: top center`.
 * The scroll container uses `overflow: auto` so zoomed-in content remains reachable.
 *
 * Reads from: useViewportStore (device, zoom)
 * Writes to:  nothing
 */
export const ResponsiveFrame = memo(function ResponsiveFrame({
  children,
}: ResponsiveFrameProps) {
  const { device, zoom } = useViewportStore();

  const scale = zoom;
  const hasScale = scale !== 1;

  // ── Desktop ────────────────────────────────────────────────────────────────
  if (device === "desktop") {
    return (
      <div className="flex-1 overflow-auto bg-muted/10">
        <div className="flex flex-col items-center px-6 py-8 lg:px-10">
          <div
            className="w-full max-w-5xl origin-top transition-transform duration-200"
            style={hasScale ? { transform: `scale(${scale})` } : undefined}
          >
            <div className="rounded-xl border border-border shadow-sm overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Mobile / Tablet ────────────────────────────────────────────────────────
  const frameWidth  = device === "mobile" ? 390 : 768;
  const scaledWidth = Math.round(frameWidth * scale);

  return (
    <div
      className="flex-1 overflow-auto bg-muted/10"
      // Make the scroll container respect the zoomed layout width so
      // horizontal scrollbars appear correctly when zoomed in.
      style={{ minWidth: 0 }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          minHeight: "100%",
          padding: "40px 24px 64px",
          // When scaled up, ensure the wrapper is wide enough for the
          // scroll container to create a horizontal scrollbar.
          minWidth: scale > 1 ? scaledWidth + 48 : undefined,
        }}
      >
        <div
          className="transition-transform duration-200 origin-top"
          style={hasScale ? { transform: `scale(${scale})` } : undefined}
        >
          {device === "mobile" ? (
            <MobileChrome>{children}</MobileChrome>
          ) : (
            <TabletChrome>{children}</TabletChrome>
          )}
        </div>
      </div>
    </div>
  );
});

ResponsiveFrame.displayName = "ResponsiveFrame";
