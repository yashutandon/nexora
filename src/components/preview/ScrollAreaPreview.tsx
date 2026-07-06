"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const ScrollAreaPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl items-center">
      <div className="space-y-4 w-full text-center">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Scroll Area</h3>
        <div className="flex justify-center">
          <ScrollArea className="h-72 w-48 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a]">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none text-left">Tags</h4>
              {tags.map((tag) => (
                <div key={tag}>
                  <div className="text-sm text-left">{tag}</div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
