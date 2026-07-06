"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const LabelPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto">
      {/* 1. Basic Label */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Label</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>

      {/* 2. Disabled Label */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Disabled Label</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <Label htmlFor="terms2" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </Label>
        </div>
      </div>
    </div>
  )
}
