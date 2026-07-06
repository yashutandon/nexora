"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const RadioGroupPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto">
      {/* 1. Basic Radio Group */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic (Vertical)</h3>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 2. Custom Cards */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Custom Cards (Pricing)</h3>
        <RadioGroup defaultValue="pro" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="starter" id="starter" className="peer sr-only" />
            <Label
              htmlFor="starter"
              className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 peer-data-[state=checked]:border-zinc-900 dark:peer-data-[state=checked]:border-zinc-50 cursor-pointer"
            >
              <span className="font-semibold text-lg">Starter</span>
              <span className="text-sm text-zinc-500">$9 / month</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="pro" id="pro" className="peer sr-only" />
            <Label
              htmlFor="pro"
              className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 peer-data-[state=checked]:border-zinc-900 dark:peer-data-[state=checked]:border-zinc-50 cursor-pointer"
            >
              <span className="font-semibold text-lg">Pro</span>
              <span className="text-sm text-zinc-500">$29 / month</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

    </div>
  )
}
