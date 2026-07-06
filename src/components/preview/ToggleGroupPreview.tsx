"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

export const ToggleGroupPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Toggle Group (Multiple) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Multiple Selection</h3>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* 2. Single Selection (Radio-like) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Single Selection</h3>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* 3. Outline Variant */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Outline Style</h3>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* 4. Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Sizes</h3>
        <div className="flex flex-col gap-4">
          <ToggleGroup type="multiple" size="sm">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-3 w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-3 w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-3 w-3" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <ToggleGroup type="multiple" size="lg">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

    </div>
  )
}
