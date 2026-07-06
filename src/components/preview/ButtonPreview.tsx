"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, Mail } from "lucide-react"

export const ButtonPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl items-center">
      {/* 1. Basic Variants */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* 2. Sizes */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 3. With Icons */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="secondary">
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 4. States */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. States (Loading & Disabled)</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button disabled>Not allowed</Button>
        </div>
      </div>

    </div>
  )
}