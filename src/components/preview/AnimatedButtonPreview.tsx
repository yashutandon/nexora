"use client"

import { ArrowRight, Flame, Sparkles } from "lucide-react"
import { useState, useRef } from "react"

const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
}
@keyframes fill-progress {
  from { width: 0%; }
  to { width: 100%; }
}
`

export const AnimatedButtonPreview = () => {
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
    <>
      <style>{shimmerKeyframes}</style>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>

        {/* ── 1. Shimmer Button ── */}
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
            backgroundColor: "#18181b",
            color: "#ffffff",
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
          <ArrowRight
            size={13}
            style={{
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* ── 2. Flame / Red CTA with ripple ── */}
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
            backgroundColor: "#dc2626",
            color: "#ffffff",
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
          {/* ripple elements */}
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
                animation: "shimmer 0s", // placeholder — we use inline keyframes below
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

        {/* ── 3. Loading button with fill-progress bar ── */}
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
            border: "1px solid rgba(0,0,0,0.12)",
            backgroundColor: "transparent",
            color: loading ? "#a1a1aa" : "#3f3f46",
            cursor: loading ? "not-allowed" : "pointer",
            overflow: "hidden",
            transition: "opacity 0.15s, transform 0.15s",
            outline: "none",
            opacity: loading ? 0.85 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,0,0,0.04)"
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
          {/* animated fill bar at bottom */}
          {loading && (
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                backgroundColor: "#18181b",
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
                  border: "2px solid #a1a1aa",
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
    </>
  )
}