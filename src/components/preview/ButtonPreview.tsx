import { ArrowRight } from "lucide-react"

export const ButtonPreview = () => (
  <div className="flex flex-wrap items-center gap-3">
    <button className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-all duration-150">
      Primary
      <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
    <button className="inline-flex items-center px-5 py-2.5 rounded-lg text-[13.5px] font-medium border border-black/8 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-150">
      Secondary
    </button>
    <button className="inline-flex items-center px-5 py-2.5 rounded-lg text-[13.5px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150">
      Ghost
    </button>
    <button className="inline-flex items-center px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-150">
      Danger
    </button>
  </div>
)