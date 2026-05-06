import { cn } from "@/lib/utils"

interface PreviewContainerProps {
  children: React.ReactNode
  className?: string
}

export const PreviewContainer = ({ children, className }: PreviewContainerProps) => (
  <div
    className={cn(
      "relative flex items-center justify-center min-h-80 rounded-2xl",
      "border border-black/8 dark:border-white/8",
      "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]",
      "bg-zinc-50 dark:bg-zinc-950",
      "overflow-hidden p-10",
      className
    )}
  >
    {/* Grid dots */}
    <div
      className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle,#a1a1aa 1px,transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </div>
)