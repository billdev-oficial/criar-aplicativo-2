"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function GlowProgress({ value, label, className }: { value: number; label: string; className?: string }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]", className)}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full overflow-hidden rounded-full bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_60%,black),var(--primary),var(--neon))] shadow-[0_0_16px_var(--primary-glow)]"
      >
        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.35),transparent)] bg-[length:200%_100%]" />
      </motion.div>
    </div>
  )
}
