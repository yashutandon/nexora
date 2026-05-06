"use client"

import { ArrowRight, Flame, Sparkles } from "lucide-react"
import { useState } from "react"

export const AnimatedButtonPreview = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Shimmer button */}
      <button className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 overflow-hidden transition-all duration-150 hover:scale-[1.01] active:scale-[0.98]">
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-500" />
        Browse components
        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>

      {/* Red CTA */}
      <button className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-red-600 text-white overflow-hidden transition-all duration-150 hover:bg-red-700 hover:scale-[1.01] active:scale-[0.98]">
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-500" />
        <Flame size={13} strokeWidth={2} />
        Get started
      </button>

      {/* Loading state */}
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold border border-black/8 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-150 disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles size={13} />
            Click me
          </>
        )}
      </button>
    </div>
  )
}