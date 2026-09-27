import { Crosshair } from "lucide-react"
import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/15",
        "bg-[linear-gradient(145deg,color-mix(in_oklab,var(--primary)_75%,white_25%),var(--primary)_45%,#2e1065)]",
        "shadow-[0_0_28px_-6px_var(--primary-glow)]",
        className,
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
      <Crosshair className="relative size-[55%] text-white" strokeWidth={2.2} aria-hidden />
    </div>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">BzCheats</span>
        <span className="text-base font-semibold tracking-tight text-gradient">BzAimDDT</span>
      </div>
    </div>
  )
}
