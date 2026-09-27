"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Eye, EyeOff, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FieldProps extends React.ComponentProps<"input"> {
  label: string
  icon?: LucideIcon
  error?: string
  valid?: boolean
  hint?: string
  trailing?: React.ReactNode
  labelAction?: React.ReactNode
}

export function Field({ label, icon: Icon, error, valid, hint, trailing, labelAction, id, className, disabled, ...props }: FieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground/90">
          {label}
        </label>
        {labelAction}
      </div>
      <div
        className={cn(
          "group relative flex items-center rounded-xl border border-input bg-[#0b0813]/70 transition-[border-color,box-shadow] duration-200",
          "hover:border-primary/30 focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
          error &&
            "border-destructive/60 hover:border-destructive/60 focus-within:border-destructive/70 focus-within:shadow-[0_0_0_4px_rgb(240_71_106/0.14)]",
          valid && !error && "border-success/35",
          disabled && "opacity-50",
        )}
      >
        {Icon && (
          <Icon
            aria-hidden
            className={cn(
              "ml-3.5 size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-neon",
              error && "text-destructive group-focus-within:text-destructive",
            )}
          />
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            "h-12 w-full min-w-0 bg-transparent px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/55 disabled:cursor-not-allowed",
            Icon && "pl-3",
            className,
          )}
          {...props}
        />
        {valid && !error && !trailing && (
          <Check aria-hidden className="mr-3.5 size-4 shrink-0 text-success" />
        )}
        {trailing}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="error"
            id={messageId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-xs text-destructive"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" id={messageId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function PasswordField(props: Omit<FieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false)
  return (
    <Field
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="mr-1.5 flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-white/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  )
}
