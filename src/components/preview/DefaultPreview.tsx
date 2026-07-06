import { Construction } from "lucide-react"

export const DefaultPreview = ({ componentName }: { componentName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 w-full max-w-2xl mx-auto">
      <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 text-zinc-500">
        <Construction size={24} />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
        {componentName} Preview
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
        The interactive preview for this component is currently being built. However, the production-ready source code is fully available.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs font-medium text-zinc-500 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
        Click on the "Code" tab to view the source.
      </div>
    </div>
  )
}
