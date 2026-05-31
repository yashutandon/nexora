"use client"

import { useState, memo } from "react"
import { components } from "@/config/components"
import { Category, SidebarCategory } from "@/types/components"
import { ComponentView } from "@/components/explorer/ComponentView"
import { ChevronDown, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

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

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-150"
        aria-expanded={open}
      >
        {category.label}
        <ChevronDown
          size={11}
          className={cn("transition-transform duration-200 text-zinc-300 dark:text-zinc-700", open ? "rotate-0" : "-rotate-90")}
        />
      </button>

      {open && (
        <ul role="list" className="mt-0.5 flex flex-col gap-px">
          {category.components.map((comp) => {
            const isActive = activeId === comp.id
            return (
              <li key={comp.id}>
                <button
                  onClick={() => onSelect(comp.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 text-left",
                    isActive
                      ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive
                    ? <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                    : <span className="w-1 h-1 rounded-full bg-transparent shrink-0" />
                  }
                  <span className="truncate">{comp.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
})

SidebarSection.displayName = "SidebarSection"

// ── Shell ────────────────────────────────────────────────────────────────────
export const ExplorerShell = () => {
  const [activeId, setActiveId] = useState(components[0].id)
  const active = components.find((c) => c.id === activeId) ?? components[0]

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">

      {/* Sidebar */}
      <aside
        className="w-[220px] shrink-0 flex flex-col border-r border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-zinc-950"
        aria-label="Component navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-zinc-200 dark:border-white/[0.07] shrink-0">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-red-600 dark:bg-red-500 text-white shrink-0">
            <Flame size={12} strokeWidth={2.5} />
          </span>
          <span className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Nexora <span className="text-red-500 font-bold">/ui</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 min-h-0 overflow-y-auto py-4 px-2 flex flex-col gap-5 no-scrollbar" aria-label="Components">
          {sidebarCategories.map((cat) => (
            <SidebarSection
              key={cat.id}
              category={cat}
              activeId={activeId}
              onSelect={setActiveId}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-white/[0.07] shrink-0">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
            v2.4.0 · 120+ components
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar bg-zinc-50 dark:bg-zinc-950">
        <ComponentView component={active} />
      </main>

    </div>
  )
}