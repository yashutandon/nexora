"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

export const TogglePreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Toggle */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic (Icon)</h3>
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </div>

      {/* 2. Outline Style */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Outline</h3>
        <Toggle variant="outline" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
      </div>

      {/* 3. With Text */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Text</h3>
        <Toggle aria-label="Toggle underline">
          <Underline className="mr-2 h-4 w-4" />
          Underline
        </Toggle>
      </div>

      {/* 4. Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Sizes</h3>
        <div className="flex items-center gap-4">
          <Toggle size="sm" aria-label="Toggle italic">
            <Italic className="h-3 w-3" />
          </Toggle>
          <Toggle size="default" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle italic">
            <Italic className="h-5 w-5" />
          </Toggle>
        </div>
      </div>
      
      {/* 5. Disabled */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. Disabled</h3>
        <Toggle disabled aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </div>

    </div>
  )
}
