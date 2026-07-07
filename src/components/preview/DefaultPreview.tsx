import { Construction } from "lucide-react"

export const DefaultPreview = ({ componentName }: { componentName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-muted/30 w-full max-w-2xl mx-auto">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
        <Construction size={24} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {componentName} Preview
      </h3>
      <p className="text-sm text-muted-foreground max-w-md">
        The interactive preview for this component is currently being built. However, the production-ready source code is fully available.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card px-3 py-1.5 rounded-md border border-border shadow-sm">
        Click on the &quot;Code&quot; tab to view the source.
      </div>
    </div>
  )
}
