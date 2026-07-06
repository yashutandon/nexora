"use client"

import { useState } from "react"
import { Bell, Plane, Moon, Sun, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

// Helper Switch for Preview (simulating Radix/Shadcn switch behavior for pure UI showcase)
const SwitchPlaceholder = ({ 
  defaultChecked = false, 
  disabled = false,
  className = "",
  size = "default" 
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => setChecked(!checked)}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950",
        size === "default" ? "h-[24px] w-[44px]" : "h-[20px] w-[36px]",
        "bg-zinc-200 dark:bg-zinc-800 data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-50",
        className
      )}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform dark:bg-zinc-950",
          size === "default" ? "h-5 w-5" : "h-4 w-4",
          size === "default" 
            ? "translate-x-0 data-[state=checked]:translate-x-5" 
            : "translate-x-0 data-[state=checked]:translate-x-4"
        )}
      />
    </button>
  )
}

export const SwitchPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Switch */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic</h3>
        <div className="flex items-center gap-6">
          <SwitchPlaceholder />
          <SwitchPlaceholder defaultChecked />
        </div>
      </div>

      {/* 2. Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Sizes</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <SwitchPlaceholder size="small" />
            <label className="text-sm font-medium">Small</label>
          </div>
          <div className="flex items-center space-x-2">
            <SwitchPlaceholder size="default" />
            <label className="text-sm font-medium">Default</label>
          </div>
        </div>
      </div>

      {/* 3. With Label */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Label & Description</h3>
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 w-full max-w-sm bg-white dark:bg-zinc-950">
          <div className="space-y-0.5">
            <label className="text-base font-medium text-zinc-900 dark:text-zinc-50">Marketing emails</label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Receive emails about new products.</p>
          </div>
          <SwitchPlaceholder defaultChecked />
        </div>
      </div>

      {/* 4. Disabled State */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Disabled</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <SwitchPlaceholder disabled />
            <label className="text-sm font-medium opacity-50">Off (Disabled)</label>
          </div>
          <div className="flex items-center space-x-2">
            <SwitchPlaceholder disabled defaultChecked />
            <label className="text-sm font-medium opacity-50">On (Disabled)</label>
          </div>
        </div>
      </div>

      {/* 5. Colored Variants (Success/Danger) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. Colored (Semantic)</h3>
        <div className="flex items-center gap-6">
          <SwitchPlaceholder defaultChecked className="data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:bg-emerald-500" />
          <SwitchPlaceholder defaultChecked className="data-[state=checked]:bg-red-500 dark:data-[state=checked]:bg-red-500" />
          <SwitchPlaceholder defaultChecked className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500" />
        </div>
      </div>

      {/* 6. Settings Group */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">6. Settings Group</h3>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden w-full max-w-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Plane className="text-zinc-500" size={20} />
              <label className="text-sm font-medium">Airplane Mode</label>
            </div>
            <SwitchPlaceholder />
          </div>
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="text-zinc-500" size={20} />
              <label className="text-sm font-medium">Notifications</label>
            </div>
            <SwitchPlaceholder defaultChecked />
          </div>
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Lock className="text-zinc-500" size={20} />
              <label className="text-sm font-medium">Private Account</label>
            </div>
            <SwitchPlaceholder />
          </div>
        </div>
      </div>

    </div>
  )
}
