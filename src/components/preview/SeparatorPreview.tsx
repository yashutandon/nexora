"use client"

import { Separator } from "@/components/ui/separator"

export const SeparatorPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic (Horizontal) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic (Horizontal)</h3>
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-zinc-500">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </div>

      {/* 2. With Text */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. With Text (Or)</h3>
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <button className="flex items-center justify-center w-full h-10 bg-zinc-900 text-zinc-50 rounded-md text-sm font-medium dark:bg-zinc-50 dark:text-zinc-900">
            Continue with Email
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 dark:bg-zinc-950 px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <button className="flex items-center justify-center w-full h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-md text-sm font-medium">
            GitHub
          </button>
        </div>
      </div>

    </div>
  )
}
