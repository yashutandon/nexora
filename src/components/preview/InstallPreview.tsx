"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const PACKAGE_MANAGERS = ["npx", "npm", "yarn", "bun"] as const
type PM = typeof PACKAGE_MANAGERS[number]

const COMMANDS: Record<PM, string> = {
  npx:  "npx nexora-ui add button",
  npm:  "npm install @nexora/ui",
  yarn: "yarn add @nexora/ui",
  bun:  "bun add @nexora/ui",
}

export const InstallPreview = ({ componentId = "button" }: { componentId?: string }) => {
  const [pm, setPm] = useState<PM>("npx")
  const [copied, setCopied] = useState(false)

  const command = COMMANDS[pm].replace("button", componentId)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden w-full max-w-lg">
      {/* Terminal chrome — macOS traffic lights are intentionally fixed colors */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="flex items-center gap-1.5 ml-1 text-[11px] text-muted-foreground">
          <Terminal size={11} />
          terminal
        </span>
      </div>

      {/* Package manager tabs — active tab tracks --primary */}
      <div className="flex items-center gap-0 border-b border-border px-4">
        {PACKAGE_MANAGERS.map((p) => (
          <button
            key={p}
            onClick={() => setPm(p)}
            className={cn(
              "px-3 py-2.5 text-[12px] font-medium transition-all duration-150 border-b-2 -mb-px",
              pm === p
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Command line — intentionally uses dark terminal bg */}
      <div className="flex items-center justify-between gap-3 px-4 py-4 bg-zinc-950 font-mono">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-emerald-400 text-[13px] shrink-0">$</span>
          <span className="text-zinc-200 text-[13px] truncate">{command}</span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium shrink-0 transition-all duration-150",
            copied
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/6"
          )}
        >
          {copied
            ? <><Check size={11} strokeWidth={2.5} /> Copied</>
            : <><Copy size={11} /> Copy</>
          }
        </button>
      </div>
    </div>
  )
}