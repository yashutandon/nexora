"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

const items = [
  { delay: "0ms",   label: "First element",  sub: "Appears immediately"  },
  { delay: "80ms",  label: "Second element", sub: "Slight delay"          },
  { delay: "160ms", label: "Third element",  sub: "Staggered entrance"    },
  { delay: "240ms", label: "Fourth element", sub: "Smooth cascade"        },
]

export const FadeInPreview = () => {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
          Staggered fade-up
        </p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw size={11} />
          Replay
        </button>
      </div>

      <div key={key} className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              animationDelay: item.delay,
              animationDuration: "550ms",
              animationFillMode: "both",
              animationName: "fadeUp",
              animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              {/* status dot tracks --primary */}
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="text-[13px] font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-[11.5px] text-muted-foreground">
                  {item.sub}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              {item.delay}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  )
}