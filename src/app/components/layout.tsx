"use client"

import { memo, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { components } from "@/config/components"
import { Category, SidebarCategory } from "@/types/components"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { NexoraLogo } from "@/components/ui/NexoraLogo"
import Header from "@/components/layout/Header"

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "generic",  label: "Generic"  },
  { id: "animated", label: "Animated" },
  { id: "saas",     label: "SaaS"     },
  { id: "fintech",  label: "Fintech"  },
  { id: "blocks",   label: "Blocks"   },
]

// ── Sidebar section ──────────────────────────────────────────────────────────
const SidebarSection = memo(({
  category,
  activeId,
}: {
  category: SidebarCategory
  activeId: string
}) => {
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
              <Link
                href={`/components/${comp.id}`}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-left",
                  isActive
                    ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {comp.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
SidebarSection.displayName = "SidebarSection"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  // Active id is the last part of the path, e.g., /components/button -> button
  const activeId = pathname.split('/').pop() || ""

  // Dynamically filter categories based on search
  const filteredCategories: SidebarCategory[] = CATEGORIES.map((cat) => ({
    ...cat,
    components: components
      .filter((c) => c.category === cat.id)
      .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
  })).filter((cat) => cat.components.length > 0)

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden bg-white dark:bg-black font-sans pt-20">
        
        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 border-r border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black flex flex-col h-full">
          {/* Search */}
          <div className="px-4 py-4 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-white transition-all">
              <Search size={14} className="shrink-0" />
              <input 
                type="text" 
                placeholder="Search components..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
              <span className="ml-auto shrink-0 text-xs bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5">⌘K</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 pb-6 no-scrollbar">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <SidebarSection
                  key={cat.id}
                  category={cat}
                  activeId={activeId}
                />
              ))
            ) : (
              <div className="px-3 text-sm text-zinc-500 mt-4 text-center">
                No components found.
              </div>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-black no-scrollbar relative h-full">
          {/* Top Gradient */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-100/50 to-transparent dark:from-white/[0.02] dark:to-transparent pointer-events-none z-10" />
          {children}
        </main>
      </div>
    </>
  )
}