import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function ButtonPreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["button"]);
  const props = rawProps || {};

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-2xl">
      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-4 p-8 border border-border/50 rounded-xl bg-muted/20 w-full">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          Interactive Preview
        </span>
        <Button 
          variant={props.variant as any || "default"} 
          size={props.size as any || "default"} 
          disabled={props.disabled}
        >
          Button
        </Button>
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All Variants Reference
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  )
}