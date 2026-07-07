"use client"

import { ArrowRight, Flame, Sparkles } from "lucide-react"
import { useState, useRef } from "react"

// Keyframes use color-mix so pulse-ring tracks --primary automatically
const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0   color-mix(in srgb, var(--primary) 40%, transparent); }
  70%  { box-shadow: 0 0 0 8px color-mix(in srgb, var(--primary)  0%, transparent); }
  100% { box-shadow: 0 0 0 0   color-mix(in srgb, var(--primary)  0%, transparent); }
}
@keyframes fill-progress {
  from { width: 0%; }
  to   { width: 100%; }
}
`

import { useBuilderStore } from "@/hooks/use-builder-store"

export const AnimatedButtonPreview = () => {
  const rawProps = useBuilderStore((state) => state.componentProps["animated-button"]);
  const props = rawProps || {};
  const activeEffect = props.effect || "shimmer";

  const [loading, setLoading] = useState(false)
  const [shimmerActive, setShimmerActive] = useState(false)
  const [flameHover, setFlameHover] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const flameRef = useRef<HTMLButtonElement>(null)
  const rippleIdRef = useRef(0)

  const handleLoadingClick = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  const handleShimmerClick = () => {
    setShimmerActive(true)
    setTimeout(() => setShimmerActive(false), 600)
  }

  const handleFlameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!flameRef.current) return
    const rect = flameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = rippleIdRef.current++
    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-2xl">
      <style>{shimmerKeyframes}</style>

      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-4 p-12 border border-border/50 rounded-xl bg-muted/20 w-full min-h-[200px] justify-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          Interactive Preview
        </span>
        
        {activeEffect === "shimmer" && (
          <button
            onClick={handleShimmerClick}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 600,
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              border: "none",
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.15s, background-color 0.15s",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
            }}
            onMouseDown={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"
            }}
            onMouseUp={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)"
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                animation: shimmerActive ? "shimmer 0.6s ease forwards" : "none",
                backgroundSize: "200% 100%",
                pointerEvents: "none",
              }}
            />
            <Sparkles size={16} />
            Shimmer Effect
          </button>
        )}

        {activeEffect === "loading" && (
          <button
            onClick={handleLoadingClick}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 600,
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              cursor: loading ? "default" : "pointer",
              overflow: "hidden",
              transition: "all 0.2s ease",
              width: "160px",
              opacity: loading ? 0.9 : 1,
            }}
          >
            {loading ? (
              <svg
                style={{ animation: "spin 1s linear infinite", width: "16px", height: "16px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  opacity="0.25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <>
                Save changes <ArrowRight size={16} />
              </>
            )}
            {loading && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "3px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  animation: "fill-progress 2.5s linear forwards",
                }}
              />
            )}
          </button>
        )}

        {activeEffect === "ripple" && (
          <button
            ref={flameRef}
            onClick={handleFlameClick}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 600,
              backgroundColor: "transparent",
              color: "var(--foreground)",
              border: "1px solid color-mix(in srgb, var(--foreground) 20%, transparent)",
              cursor: "pointer",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)"
              ;(e.currentTarget as HTMLButtonElement).style.animation = "pulse-ring 1.5s infinite"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                "color-mix(in srgb, var(--foreground) 20%, transparent)"
              ;(e.currentTarget as HTMLButtonElement).style.animation = "none"
            }}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: ripple.x,
                  top: ripple.y,
                  width: "2px",
                  height: "2px",
                  background: "var(--primary)",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "ripple-effect 0.6s linear forwards",
                  pointerEvents: "none",
                }}
              />
            ))}
            <style>
              {`
                @keyframes ripple-effect {
                  0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
                  100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
                }
              `}
            </style>
            <Flame size={16} />
            Interactive Hover
          </button>
        )}
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All Effects Reference
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>

        {/* ── 1. Shimmer Button — tracks --foreground / --background ── */}
        <button
          onClick={handleShimmerClick}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
            border: "none",
            cursor: "pointer",
            overflow: "hidden",
            transition: "transform 0.15s, background-color 0.15s",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
          }}
          onMouseDown={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"
          }}
          onMouseUp={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)"
          }}
        >
          {/* shimmer sweep */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
              animation: shimmerActive ? "shimmer 0.6s ease forwards" : "none",
              pointerEvents: "none",
            }}
          />
          Browse components
          <ArrowRight size={13} style={{ transition: "transform 0.2s" }} />
        </button>

        {/* ── 2. Primary CTA with ripple — tracks --primary ── */}
        <button
          ref={flameRef}
          onClick={handleFlameClick}
          onMouseEnter={() => setFlameHover(true)}
          onMouseLeave={() => setFlameHover(false)}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            cursor: "pointer",
            overflow: "hidden",
            transition: "transform 0.15s, background-color 0.15s",
            animation: flameHover ? "pulse-ring 1.2s ease-out infinite" : "none",
            outline: "none",
          }}
          onMouseDown={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"
          }}
          onMouseUp={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)"
          }}
        >
          {ripples.map((r) => (
            <span
              key={r.id}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
                transform: "translate(-50%, -50%) scale(0)",
                pointerEvents: "none",
              }}
              ref={(el) => {
                if (el) {
                  el.animate(
                    [
                      { transform: "translate(-50%,-50%) scale(0)", opacity: 0.7 },
                      { transform: "translate(-50%,-50%) scale(10)", opacity: 0 },
                    ],
                    { duration: 600, easing: "ease-out", fill: "forwards" }
                  )
                }
              }}
            />
          ))}
          <Flame size={13} strokeWidth={2} />
          Get started
        </button>

        {/* ── 3. Ghost / outline button — tracks --border, --foreground, --muted-foreground ── */}
        <button
          onClick={handleLoadingClick}
          disabled={loading}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            border: "1px solid var(--border)",
            backgroundColor: "transparent",
            color: loading ? "var(--muted-foreground)" : "var(--foreground)",
            cursor: loading ? "not-allowed" : "pointer",
            overflow: "hidden",
            transition: "opacity 0.15s, transform 0.15s",
            outline: "none",
            opacity: loading ? 0.85 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--muted)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"
          }}
          onMouseDown={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"
          }}
          onMouseUp={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
          }}
        >
          {/* animated fill bar — tracks --foreground */}
          {loading && (
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                backgroundColor: "var(--foreground)",
                animation: "fill-progress 2.5s linear forwards",
                borderRadius: "0 0 8px 8px",
              }}
            />
          )}
          {loading ? (
            <>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid var(--muted-foreground)",
                  borderTopColor: "transparent",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                  flexShrink: 0,
                }}
              />
              Processing...
            </>
          ) : (
            <>
              <Sparkles size={13} />
              Click me
            </>
          )}
        </button>

      </div>
    </div>
  </div>
  )
}