"use client"

import type { LucideIcon } from "lucide-react"
import { GlassCard } from "./glass-card"

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  delay = 0,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  delay?: number
}) {
  return (
    <GlassCard delay={delay} interactive className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {hint && <p className="text-xs text-muted-foreground/80">{hint}</p>}
        </div>
        <span className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-neon">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
    </GlassCard>
  )
}
