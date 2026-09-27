"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex flex-col gap-1.5">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neon/80">{eyebrow}</p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
        {description && <p className="max-w-xl text-sm text-muted-foreground text-pretty">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.div>
  )
}

export function UserAvatar({
  name,
  size = "md",
  online,
  className,
}: {
  name: string
  size?: "sm" | "md" | "lg" | "xl"
  online?: boolean
  className?: string
}) {
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-lg",
    xl: "size-24 text-3xl",
  }
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white ring-1 ring-white/15",
          "bg-[linear-gradient(145deg,var(--primary),#2e1065)] shadow-[0_0_24px_-8px_var(--primary-glow)]",
          sizes[size],
        )}
      >
        {initials(name)}
      </span>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            size === "xl" ? "size-5" : "size-3",
            online ? "bg-success" : "bg-muted-foreground",
          )}
        >
          <span className="sr-only">{online ? "Online" : "Offline"}</span>
        </span>
      )}
    </span>
  )
}

export function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success("Copiado para a área de transferência")
      setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Não foi possível copiar")
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-white/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
    </button>
  )
}

export function InfoRow({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 rounded-xl border border-border bg-white/[0.02] p-4", className)}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="flex min-h-6 items-center gap-2 text-sm font-medium">{children}</dd>
    </div>
  )
}

export const dialogClassName = "rounded-2xl border-border bg-popover/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
