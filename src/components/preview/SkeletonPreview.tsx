"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic / User Profile */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. User Profile Loader</h3>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* 2. Card Loader */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Card Loader</h3>
        <div className="flex flex-col space-y-3 w-full max-w-sm">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* 3. List Loader */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. List Loader</h3>
        <div className="space-y-4 w-full max-w-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Text Block Loader */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Article / Text Loader</h3>
        <div className="space-y-2 w-full max-w-lg">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>

    </div>
  )
}
