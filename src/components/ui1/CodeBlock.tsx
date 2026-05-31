"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export const CodeBlock = ({ code, language = "tsx", className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const [html, setHtml]     = useState<string>("")
  const [loading, setLoading] = useState(true)
  const cacheRef = useRef<Map<string, string>>(new Map())

  useEffect(() => {
    const cacheKey = `${language}:${code}`
    if (cacheRef.current.has(cacheKey)) {
      setHtml(cacheRef.current.get(cacheKey)!)
      setLoading(false)
      return
    }
    setLoading(true)
    codeToHtml(code, { lang: language, theme: "vesper" })
      .then((result) => {
        cacheRef.current.set(cacheKey, result)
        setHtml(result)
      })
      .finally(() => setLoading(false))
  }, [code, language])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className={cn(
      "relative flex flex-col rounded-xl border border-black/8 dark:border-white/8 bg-[#101010] overflow-hidden",
      className
    )}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#101010]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <div className="w-px h-3.5 bg-white/[0.06] mx-1" aria-hidden />
          <Terminal size={11} strokeWidth={2} className="text-zinc-600" aria-hidden />
          <span className="text-[11px] text-zinc-600 font-mono">
            {language === "tsx" ? "component.tsx" : language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all duration-150",
            copied
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06]"
          )}
        >
          {copied
            ? <><Check size={11} strokeWidth={2.5} /> Copied!</>
            : <><Copy size={11} /> Copy</>
          }
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-auto p-5 text-[12.5px] leading-[1.75]">
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            {[72, 90, 55, 80, 45, 65, 78, 50].map((w, i) => (
              <div key={i} className="h-3.5 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : (
          <div
            className="shiki-wrapper [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!text-[12.5px] [&_code]:!leading-[1.75]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  )
}