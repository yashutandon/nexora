"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export const AvatarPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Avatar */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Image & Fallback</h3>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <Avatar>
            <AvatarFallback className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 2. Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Sizes</h3>
        <div className="flex flex-wrap items-end gap-6">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://i.pravatar.cc/150?u=1" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.pravatar.cc/150?u=2" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://i.pravatar.cc/150?u=3" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://i.pravatar.cc/150?u=4" />
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 3. Shapes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Shapes</h3>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar className="rounded-full">
            <AvatarImage src="https://i.pravatar.cc/150?u=5" />
          </Avatar>
          
          <Avatar className="rounded-md">
            <AvatarImage src="https://i.pravatar.cc/150?u=6" />
          </Avatar>
          
          <Avatar className="rounded-xl">
            <AvatarImage src="https://i.pravatar.cc/150?u=7" />
          </Avatar>
        </div>
      </div>

      {/* 4. Avatar Group (Stack) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Avatar Stack</h3>
        <div className="flex items-center -space-x-4">
          <Avatar className="border-2 border-white dark:border-zinc-950">
            <AvatarImage src="https://i.pravatar.cc/150?u=8" />
          </Avatar>
          <Avatar className="border-2 border-white dark:border-zinc-950">
            <AvatarImage src="https://i.pravatar.cc/150?u=9" />
          </Avatar>
          <Avatar className="border-2 border-white dark:border-zinc-950">
            <AvatarImage src="https://i.pravatar.cc/150?u=10" />
          </Avatar>
          <Avatar className="border-2 border-white dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800">
            <AvatarFallback className="text-xs font-medium text-zinc-600 dark:text-zinc-300">+3</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 5. With Status Indicator */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. With Status Indicator</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=11" />
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950"></span>
          </div>
          
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=12" />
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-950"></span>
          </div>
          
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=13" />
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600 border-2 border-white dark:border-zinc-950"></span>
          </div>
        </div>
      </div>
      
      {/* 6. Profile Card Layout */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">6. Profile Layout</h3>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 w-full max-w-sm shadow-sm">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://i.pravatar.cc/150?u=14" />
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Olivia Martin</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">olivia.martin@email.com</p>
          </div>
        </div>
      </div>

    </div>
  )
}
