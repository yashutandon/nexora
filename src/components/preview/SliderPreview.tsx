"use client"

import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Sun, Moon } from "lucide-react"

export const SliderPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Slider */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic</h3>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      {/* 2. Range Slider */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Range Selection</h3>
        <Slider defaultValue={[25, 75]} max={100} step={1} />
        <div className="flex justify-between text-xs text-zinc-500 font-medium">
          <span>Min: $25</span>
          <span>Max: $75</span>
        </div>
      </div>

      {/* 3. With Icons */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Icons</h3>
        <div className="flex items-center gap-4">
          <VolumeX className="text-zinc-500 h-4 w-4" />
          <Slider defaultValue={[30]} max={100} step={1} />
          <Volume2 className="text-zinc-500 h-4 w-4" />
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <Moon className="text-zinc-500 h-4 w-4" />
          <Slider defaultValue={[80]} max={100} step={1} />
          <Sun className="text-zinc-500 h-4 w-4" />
        </div>
      </div>

      {/* 4. Steps & Ticks */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Stepped (Intervals of 20)</h3>
        <Slider defaultValue={[40]} max={100} step={20} />
      </div>

      {/* 5. Disabled */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. Disabled</h3>
        <Slider defaultValue={[50]} max={100} step={1} disabled />
      </div>

    </div>
  )
}
