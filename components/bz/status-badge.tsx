import { cn } from "@/lib/utils"

export type BadgeTone = "success" | "primary" | "warning" | "danger" | "neutral"

const tones: Record<BadgeTone, string> = {
  success: "border-success/25 bg-success/10 text-success",
  primary: "border-primary/30 bg-primary/10 text-neon",
  warning: "border-warning/25 bg-warning/10 text-warning",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
  neutral: "border-white/10 bg-white/5 text-muted-foreground",
}

export function StatusBadge({
  tone = "primary",
  pulse = false,
  className,
  children,
}: {
  tone?: BadgeTone
  pulse?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex size-1.5" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
