import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function InputPreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["input"]);
  const props = rawProps || {};

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-sm">
      {/* Interactive Main View */}
      <div className="flex flex-col gap-4 p-8 border border-border/50 rounded-xl bg-muted/20 w-full">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-2">
          Interactive Preview
        </span>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="interactive-email">Email</Label>
          <Input 
            type="email" 
            id="interactive-email" 
            placeholder={props.placeholder || "Enter your name..."} 
            disabled={props.disabled}
          />
        </div>
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All States Reference
        </div>
        
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="disabled">Disabled</Label>
          <Input disabled type="email" id="disabled" placeholder="Email" />
        </div>
      </div>
    </div>
  )
}