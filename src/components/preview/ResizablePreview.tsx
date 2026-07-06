"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export const ResizablePreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl items-center">
      <div className="space-y-4 w-full text-center">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Resizable Panels</h3>
        <div className="flex justify-center w-full">
          <ResizablePanelGroup
            // @ts-ignore
            direction="horizontal"
            className="max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-[200px] items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/50">
                <span className="font-semibold">Sidebar</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup
                // @ts-ignore
                direction="vertical"
              >
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/50">
                    <span className="font-semibold">Header</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/50">
                    <span className="font-semibold">Content</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
