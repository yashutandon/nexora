"use client"

import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle } from "lucide-react"

export const BadgePreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl items-center">
      {/* 1. Basic Variants */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      {/* 2. With Icons */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default" className="gap-1 pr-1.5">
            <Check className="h-3 w-3" /> Completed
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="h-3 w-3" /> Pending
          </Badge>
          <Badge variant="destructive" className="gap-1">
            <X className="h-3 w-3" /> Failed
          </Badge>
        </div>
      </div>

      {/* 3. Dot Badges (Status) */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Status Indicators</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="outline" className="gap-1.5 pl-2 border-zinc-200 dark:border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </Badge>
          <Badge variant="outline" className="gap-1.5 pl-2 border-zinc-200 dark:border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            In Progress
          </Badge>
          <Badge variant="outline" className="gap-1.5 pl-2 border-zinc-200 dark:border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            Draft
          </Badge>
        </div>
      </div>

    </div>
  )
}