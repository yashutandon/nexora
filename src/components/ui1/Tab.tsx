"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export const Tabs = memo(({ tabs, active, onChange }: TabsProps) => (
  <div
    role="tablist"
    className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 w-fit border border-black/6 dark:border-white/6"
  >
    {tabs.map((tab) => {
      const isActive = tab.id === active
      return (
        <button
          key={tab.id}
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150",
            isActive
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          )}
        >
          {tab.label}
        </button>
      )
    })}
  </div>
))

Tabs.displayName = "Tabs"