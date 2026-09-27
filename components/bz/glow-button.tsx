"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost" | "danger"
type Size = "sm" | "md" | "lg"

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap select-none outline-none transition-[background-color,border-color,color,box-shadow,filter,opacity] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0"

const variants: Record<Variant, string> = {
  primary: "btn-glow text-primary-foreground",
  secondary:
    "border border-input bg-white/[0.03] text-foreground hover:border-primary/40 hover:bg-primary/10 active:bg-primary/15",
  ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground active:bg-white/10",
  danger:
    "border border-destructive/30 bg-destructive/10 text-destructive hover:border-destructive/50 hover:bg-destructive/20",
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
}

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant
  size?: Size
  loading?: boolean
  loadingText?: string
  children?: React.ReactNode
}

export function GlowButton({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: GlowButtonProps) {
  const isDisabled = disabled || loading
  return (
    <motion.button
      type={type}
      whileTap={isDisabled ? undefined : { scale: 0.975 }}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" aria-hidden />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
