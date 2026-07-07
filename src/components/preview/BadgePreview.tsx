import { Badge } from "@/components/ui/badge"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function BadgePreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["badge"]);
  const props = rawProps || {};

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-sm">
      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-4 p-8 border border-border/50 rounded-xl bg-muted/20 w-full min-h-[150px] justify-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-2">
          Interactive Preview
        </span>
        <Badge variant={props.variant as any || "default"}>
          {props.variant ? String(props.variant).charAt(0).toUpperCase() + String(props.variant).slice(1) : "Default"} Badge
        </Badge>
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All Variants Reference
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
    </div>
  )
}