"use client"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

export const SpinnerPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto items-center">
      {/* 1. Basic Spinner */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">1. Basic Sizes</h3>
        <div className="flex justify-center items-center gap-6">
          <Spinner className="w-4 h-4" />
          <Spinner className="w-6 h-6" />
          <Spinner className="w-8 h-8" />
        </div>
      </div>

      {/* 2. In Buttons */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">2. Inside Elements</h3>
        <div className="flex justify-center items-center gap-4">
          <Button disabled>
            <Spinner className="w-4 h-4 mr-2" />
            Saving...
          </Button>
          <Button variant="secondary" disabled>
            <Spinner className="w-4 h-4 mr-2" />
            Loading Data
          </Button>
        </div>
      </div>
    </div>
  )
}
