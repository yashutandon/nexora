import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function SwitchPreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["switch"]);
  const props = rawProps || {};

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-sm">
      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-4 p-8 border border-border/50 rounded-xl bg-muted/20 w-full min-h-[150px] justify-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-4">
          Interactive Preview
        </span>
        <div className="flex items-center space-x-2">
          <Switch id="interactive-switch" disabled={props.disabled} />
          <Label htmlFor="interactive-switch" className={props.disabled ? "opacity-50" : ""}>
            Airplane Mode
          </Label>
        </div>
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All States Reference
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode-disabled" disabled />
            <Label htmlFor="airplane-mode-disabled" className="opacity-50">Disabled</Label>
          </div>
        </div>
      </div>
    </div>
  )
}
