"use client"

import { useState, memo, useEffect } from "react"
import { ComponentConfig } from "@/types/components"
import { previewRegistry } from "@/components/explorer/preview-registry"
import { PreviewContainer } from "../ui1/PreviewContainer"
import { CodeBlock } from "../ui1/CodeBlock"
import { InstallPreview } from "../preview/InstallPreview"
import { DefaultPreview } from "../preview/DefaultPreview"
import { ExternalLink, Terminal, Eye, Code2, ChevronRight, Check, Lock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios"

export const ComponentView = memo(({ component }: { component: ComponentConfig }) => {
  const { user } = useAuthStore()
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [fetchedCode, setFetchedCode] = useState<string | null>(null)
  const [isLoadingCode, setIsLoadingCode] = useState(false)
  
  const Preview = previewRegistry[component.id]
  
  const isPro = user?.role === "PRO"
  const showCode = !component.isPremium || isPro

  useEffect(() => {
    // Only fetch if they can see the code and it's not already fetched
    if (showCode && !fetchedCode) {
      setIsLoadingCode(true)
      axios.get(`/api/components/${component.id}`)
        .then((res) => {
          setFetchedCode(res.data.code)
        })
        .catch(() => {
          setFetchedCode(`/* 
  Code for ${component.name} is currently being developed. 
  Check back soon! 
*/`)
        })
        .finally(() => {
          setIsLoadingCode(false)
        })
    }
  }, [component.id, showCode, fetchedCode])

  return (
    <div className="max-w-4xl mx-auto w-full px-8 py-16 flex flex-col gap-16 relative z-10">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">Components</span>
          <ChevronRight size={14} />
          <span className="text-zinc-900 dark:text-white capitalize">{component.category}</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {component.name}
            </h1>
            <a
              href="#"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors text-zinc-700 dark:text-zinc-300"
            >
              <ExternalLink size={14} /> GitHub
            </a>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {component.description}
          </p>
        </div>
      </div>

      {/* ── PREVIEW & CODE ── */}
      <div className="flex flex-col rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center">
            <button
              onClick={() => setTab("preview")}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                tab === "preview"
                  ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                tab === "code"
                  ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              <Code2 size={14} /> Code
            </button>
          </div>
        </div>

        <div className="min-h-[400px]">
          {tab === "preview" ? (
            <PreviewContainer>
              {Preview ? <Preview /> : <DefaultPreview componentName={component.name} />}
            </PreviewContainer>
          ) : showCode ? (
            <div className="p-4 h-full">
              {isLoadingCode ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-zinc-500">
                  <Loader2 className="animate-spin" size={24} />
                  <p className="text-sm">Fetching code...</p>
                </div>
              ) : (
                <CodeBlock code={fetchedCode || ""} />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 text-center bg-zinc-50 dark:bg-zinc-900/50">
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
                <Lock size={20} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Pro Component</h3>
              <p className="text-sm text-zinc-500 max-w-sm">This component requires a Pro license. Upgrade to access the source code.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── INSTALLATION ── */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Installation</h2>
        <div className="flex flex-col rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0a0a0a]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
            <Terminal size={14} className="text-zinc-500" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CLI</span>
          </div>
          <div className="p-6">
            <InstallPreview componentId={component.id} />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Manual Installation</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400 shrink-0">1</div>
              <div className="flex flex-col gap-1 pt-1.5">
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">Copy the code</p>
                <p className="text-sm text-zinc-500">Select the Code tab above and copy the source code.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400 shrink-0">2</div>
              <div className="flex flex-col gap-1 pt-1.5">
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">Create the file</p>
                <p className="text-sm text-zinc-500">Paste the code into a new file <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white text-xs">components/ui/{component.name.toLowerCase().replace(/ /g, "-")}.tsx</code>.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400 shrink-0">3</div>
              <div className="flex flex-col gap-1 pt-1.5">
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">Update imports</p>
                <p className="text-sm text-zinc-500">Ensure any dependencies like <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white text-xs">lucide-react</code> are installed.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  )
})

ComponentView.displayName = "ComponentView"