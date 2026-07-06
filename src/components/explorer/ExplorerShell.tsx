"use client"

import { useState, memo } from "react"
import { components } from "@/config/components"
import { Category, SidebarCategory } from "@/types/components"
import { ComponentView } from "@/components/explorer/ComponentView"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { NexoraLogo } from "@/components/ui/NexoraLogo"
import Link from "next/link"

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "generic",  label: "Generic"  },
  { id: "animated", label: "Animated" },
  { id: "saas",     label: "SaaS"     },
  { id: "fintech",  label: "Fintech"  },
]

const buildCategories = (): SidebarCategory[] =>
  CATEGORIES.map((cat) => ({
    ...cat,
    components: components.filter((c) => c.category === cat.id),
  }))

const sidebarCategories = buildCategories()

// ── Sidebar section ──────────────────────────────────────────────────────────
const SidebarSection = memo(({
  category,
  activeId,
  onSelect,
}: {
  category: SidebarCategory
  activeId: string
  onSelect: (id: string) => void
}) => {
  const [open, setOpen] = useState(true)

  if (category.components.length === 0) return null

  return (
    <div className="mb-6">
      <h4 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {category.label}
      </h4>
      <ul className="space-y-0.5">
        {category.components.map((comp) => {
          const isActive = activeId === comp.id
          return (
            <li key={comp.id}>
              <button
                onClick={() => onSelect(comp.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-left",
                  isActive
                    ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {comp.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
SidebarSection.displayName = "SidebarSection"

// ── Shell ────────────────────────────────────────────────────────────────────
export const ExplorerShell = () => {
  const [activeId, setActiveId] = useState(components[0].id)
  const active = components.find((c) => c.id === activeId) ?? components[0]

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-black font-sans">
      
      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 border-r border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black flex flex-col">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6">
              <NexoraLogo className="w-full h-full" />
            </div>
            <span className="font-bold tracking-tight text-zinc-900 dark:text-white">
              Nexora
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-white/10 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
              UI
            </span>
          </Link>
        </div>

        {/* Search (Visual Only) */}
        <div className="px-4 py-4 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400">
            <Search size={14} />
            <span className="text-sm">Search components...</span>
            <span className="ml-auto text-xs bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5">⌘K</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 no-scrollbar">
          {sidebarCategories.map((cat) => (
            <SidebarSection
              key={cat.id}
              category={cat}
              activeId={activeId}
              onSelect={setActiveId}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-black no-scrollbar relative">
        {/* Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-100/50 to-transparent dark:from-white/[0.02] dark:to-transparent pointer-events-none" />
        <ComponentView component={active} />
      </main>
    </div>
  )
}