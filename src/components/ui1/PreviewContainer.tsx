import { cn } from "@/lib/utils"

interface PreviewContainerProps {
  children: React.ReactNode
  className?: string
}

export const PreviewContainer = ({ children, className }: PreviewContainerProps) => (
  <div
    className={cn(
      "relative flex items-center justify-center min-h-80",
      "bg-zinc-50 dark:bg-zinc-950",
      "overflow-hidden p-10",
      className
    )}
  >
    {/* Dot grid */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgb(161 161 170 / 0.25) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
      aria-hidden
    />
    {/* Fade vignette on edges */}
    <div
      className="pointer-events-none absolute inset-0 dark:hidden"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgb(250 250 250 / 0.8) 100%)",
      }}
      aria-hidden
    />
    {/* Dark mode vignette */}
    <div
      className="pointer-events-none absolute inset-0 hidden dark:block"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgb(9 9 11 / 0.8) 100%)",
      }}
      aria-hidden
    />
    <div className="relative z-10 w-full flex items-center justify-center">
      {children}
    </div>
  </div>
)