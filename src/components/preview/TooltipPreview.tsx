"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Plus, Settings, HelpCircle } from "lucide-react"

export const TooltipPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      <TooltipProvider>
        
        {/* 1. Basic Tooltip */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-fit">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* 2. Directions */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Placement Directions</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip on top</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip on right</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip on left</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* 3. Icon Buttons */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. On Icon Buttons</h3>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new project</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* 4. Rich Content */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Rich Content</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
                <HelpCircle className="h-4 w-4" />
                What is this?
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-3">
              <p className="font-semibold mb-1">Rich Tooltips</p>
              <p className="text-xs text-zinc-400">
                Tooltips can contain any React nodes, making them perfect for displaying shortcuts, helper text, or even small forms.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

      </TooltipProvider>
    </div>
  )
}
