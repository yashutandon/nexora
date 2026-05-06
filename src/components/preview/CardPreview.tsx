import { ArrowRight } from "lucide-react"

export const CardPreview = () => (
  <div className="w-full max-w-sm">
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900 shadow-xl shadow-black/6 dark:shadow-black/30 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/6 dark:border-white/6">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 ml-1">card.tsx</span>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Component Card</p>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-50">
              A flexible container with consistent border and shadow styling.
            </p>
          </div>
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
            <ArrowRight size={14} />
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Layout
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            Generic
          </span>
        </div>
      </div>
    </div>
  </div>
)