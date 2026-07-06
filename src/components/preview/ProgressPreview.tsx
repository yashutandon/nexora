"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export const ProgressPreview = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Progress */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic (Animated)</h3>
        <Progress value={progress} className="w-full" />
      </div>

      {/* 2. With Label */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. With Label & Value</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Uploading file...</span>
            <span>45%</span>
          </div>
          <Progress value={45} className="w-full" />
        </div>
      </div>

      {/* 3. Success / Error Colors */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Semantic Colors</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <span>Completed</span>
              <span>100%</span>
            </div>
            {/* Custom color via className on the indicator */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-red-600 dark:text-red-400">
              <span>Failed</span>
              <span>32%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="h-full bg-red-500 transition-all" style={{ width: '32%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Sizes</h3>
        <div className="space-y-6">
          <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div className="h-full bg-zinc-900 dark:bg-zinc-50 transition-all" style={{ width: '60%' }} />
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div className="h-full bg-zinc-900 dark:bg-zinc-50 transition-all" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

    </div>
  )
}
