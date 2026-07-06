"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export const AspectRatioPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto items-center">
      {/* 1. 16:9 Aspect Ratio */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">1. 16:9 (Widescreen)</h3>
        <Card className="overflow-hidden">
          <AspectRatio ratio={16 / 9} className="bg-zinc-100 dark:bg-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </Card>
      </div>

      {/* 2. 1:1 Aspect Ratio */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">2. 1:1 (Square)</h3>
        <Card className="overflow-hidden">
          <AspectRatio ratio={1 / 1} className="bg-zinc-100 dark:bg-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1528143358874-52d3cb10d635?w=800&dpr=2&q=80"
              alt="Photo by Alexander Kaunas"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </Card>
      </div>
    </div>
  )
}
