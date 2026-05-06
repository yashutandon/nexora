"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export const CodeBlock = ({ code, language = "tsx", className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string>("")
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

    codeToHtml(code, {
      lang: language,
      theme: "vesper",
    })
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
      "relative rounded-2xl border border-black/8 dark:border-white/8 bg-[#101010] overflow-hidden",
      className
    )}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/6 bg-[#101010]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all duration-150",
            copied
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/6"
          )}
        >
          {copied ? (
            <><Check size={11} strokeWidth={2.5} /> Copied!</>
          ) : (
            <><Copy size={11} /> Copy</>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="p-5 text-[12.5px] leading-[1.75]">
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-3.5 rounded-full bg-zinc-800"
                style={{ width: `${[72, 90, 55, 80, 45, 65][i]}%` }}
              />
            ))}
          </div>
        ) : (
          <div
            className="shiki-wrapper"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  )
}