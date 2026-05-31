"use client"

import { useState, memo } from "react"
import { ComponentConfig } from "@/types/components"
import { previewRegistry } from "@/components/explorer/preview-registry"
import { PreviewContainer } from "../ui1/PreviewContainer"
import { CodeBlock } from "../ui1/CodeBlock"
import { InstallPreview } from "../preview/InstallPreview"
import { ExternalLink, Terminal, Eye, Code2, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORY_META: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  generic:  { bg: "bg-blue-50 dark:bg-blue-950/40",       text: "text-blue-600 dark:text-blue-400",       dot: "bg-blue-500",    label: "Generic"  },
  animated: { bg: "bg-violet-50 dark:bg-violet-950/40",   text: "text-violet-600 dark:text-violet-400",   dot: "bg-violet-500",  label: "Animated" },
  saas:     { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", label: "SaaS"     },
  fintech:  { bg: "bg-amber-50 dark:bg-amber-950/40",     text: "text-amber-600 dark:text-amber-400",     dot: "bg-amber-500",   label: "Fintech"  },
}

const TAGS = ["Tailwind CSS v4", "TypeScript", "React 19", "Accessible"]

const STEPS = [
  { n: "1", title: "Install via CLI",         desc: "Add Nexora UI to your project using your preferred package manager."                        },
  { n: "2", title: "Import the component",    desc: "Import the component from the package and drop it into your JSX."                          },
  { n: "3", title: "Customize with Tailwind", desc: "Every component accepts a className prop — override any style with Tailwind utilities."    },
]

export const ComponentView = memo(({ component }: { component: ComponentConfig }) => {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const Preview = previewRegistry[component.id]
  const meta = CATEGORY_META[component.category] ?? CATEGORY_META.generic

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 py-10 flex flex-col gap-10">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-1.5 text-[12px] text-zinc-400 dark:text-zinc-600" aria-label="Breadcrumb">
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 cursor-pointer transition-colors duration-150">Components</span>
          <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-700 shrink-0" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 cursor-pointer transition-colors duration-150">{meta.label}</span>
          <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-700 shrink-0" />
          <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate">{component.name}</span>
        </nav>

        {/* ── HEADER ── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3 min-w-0">
              {/* Category + source */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full", meta.bg, meta.text)}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
                  {meta.label}
                </span>
                <span className="text-[11px] text-zinc-300 dark:text-zinc-700" aria-hidden>·</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-medium">Nexora UI</span>
              </div>

              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50">
                {component.name}
              </h1>

              <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
                {component.description}
              </p>
            </div>

            <a
              href="#"
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-150"
            >
              <ExternalLink size={11} />
              Source
            </a>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── INSTALLATION ── */}
        <div className="flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          {/* Card header */}
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60">
            <Terminal size={13} className="text-zinc-400 dark:text-zinc-600" />
            <span className="text-[12.5px] font-semibold text-zinc-600 dark:text-zinc-400 tracking-wide">
              Installation
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Steps */}
            <div className="flex flex-col">
              {STEPS.map((s, idx) => (
                <div key={s.n} className="flex gap-3.5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                      {s.n}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className="w-px flex-1 my-1.5 bg-zinc-100 dark:bg-zinc-800 min-h-[20px]" />
                    )}
                  </div>
                  <div className={cn("flex flex-col gap-0.5", idx < STEPS.length - 1 && "pb-5")}>
                    <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 leading-none mb-1">
                      {s.title}
                    </p>
                    <p className="text-[12.5px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                      {s.desc.replace("the component", component.name)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Install widget */}
            <div>
              <InstallPreview componentId={component.id} />
            </div>
          </div>
        </div>

        {/* ── PREVIEW / CODE ── */}
        <div className="flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60">
            <div className="flex items-center gap-0.5">
              {(["preview", "code"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-150",
                    tab === t
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
                  )}
                >
                  {t === "preview" ? <Eye size={12} /> : <Code2 size={12} />}
                  {t === "preview" ? "Preview" : "Code"}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-medium font-mono">
              {tab === "code"
                ? `${component.name.toLowerCase().replace(/ /g, "-")}.tsx`
                : "Live preview"}
            </span>
          </div>

          {/* Tab content */}
          <div className="min-h-64">
            {tab === "preview" ? (
              <PreviewContainer>
                {Preview ? (
                  <Preview />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-300 dark:text-zinc-700 py-16">
                    <Eye size={20} strokeWidth={1.5} />
                    <p className="text-[12.5px]">No preview available</p>
                  </div>
                )}
              </PreviewContainer>
            ) : (
              <CodeBlock code={component.code} />
            )}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between pt-1 pb-4">
          <p className="text-[12px] text-zinc-400 dark:text-zinc-600">
            Part of{" "}
            <span className="font-medium text-zinc-500 dark:text-zinc-500">Nexora UI</span>
            {" "}· MIT License
          </p>
          <a
            href="#"
            className="text-[12px] text-zinc-400 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 font-medium"
          >
            Report an issue →
          </a>
        </div>

      </div>
    </div>
  )
})

ComponentView.displayName = "ComponentView"