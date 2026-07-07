import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, AlertCircle } from "lucide-react"
import { useBuilderStore } from "@/hooks/use-builder-store"

export function AlertPreview() {
  const rawProps = useBuilderStore((state) => state.componentProps["alert"]);
  const props = rawProps || {};
  const activeVariant = props.variant as any || "default";

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full max-w-lg">
      {/* Interactive Main View */}
      <div className="flex flex-col items-center gap-4 p-8 border border-border/50 rounded-xl bg-muted/20 w-full min-h-[150px] justify-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-2">
          Interactive Preview
        </span>
        <Alert variant={activeVariant}>
          {activeVariant === "destructive" ? <AlertCircle className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
          <AlertTitle>{activeVariant === "destructive" ? "Error" : "Heads up!"}</AlertTitle>
          <AlertDescription>
            {activeVariant === "destructive" 
              ? "Your session has expired. Please log in again." 
              : "You can add components to your app using the cli."}
          </AlertDescription>
        </Alert>
      </div>

      {/* Static Grid for Reference */}
      <div className="w-full space-y-6 opacity-70 grayscale-[30%] pointer-events-none hover:opacity-100 hover:grayscale-0 hover:pointer-events-auto transition-all duration-300">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center border-b border-border/50 pb-2">
          All Variants Reference
        </div>
        <div className="flex flex-col gap-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
