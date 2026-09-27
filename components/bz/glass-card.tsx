"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  delay?: number
  interactive?: boolean
  children?: React.ReactNode
}

export function GlassCard({ delay = 0, interactive = false, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        interactive &&
          "transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-[0_0_48px_-16px_var(--primary-glow)]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      {children}
    </motion.div>
  )
}

export function CardHeading({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-neon">
          <Icon className="size-4" />
        </span>
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      </div>
      {action}
    </div>
  )
}
