import { Slider } from "@/components/ui/slider"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function SliderPreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["slider"]);
  const props = rawProps || {};

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-sm">
      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-6 p-8 border border-border/50 rounded-xl bg-muted/20 w-full min-h-[150px] justify-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center">
          Interactive Preview
        </span>
        <Slider 
          defaultValue={[50]} 
          max={Number(props.max) || 100} 
          step={Number(props.step) || 1} 
          disabled={Boolean(props.disabled)}
        />
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All States Reference
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Default</span>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Disabled</span>
            <Slider defaultValue={[25]} max={100} step={1} disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
