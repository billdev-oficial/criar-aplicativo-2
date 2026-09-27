"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function getPasswordStrength(password: string) {
  const checks = [
    { label: "8+ caracteres", ok: password.length >= 8 },
    { label: "Letra maiúscula", ok: /[A-Z]/.test(password) },
    { label: "Número", ok: /\d/.test(password) },
    { label: "Símbolo", ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter((c) => c.ok).length
  const label = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte"][score]
  return { score, checks, label }
}

const barTone = ["bg-white/10", "bg-destructive", "bg-warning", "bg-primary", "bg-success"]
const textTone = ["text-muted-foreground", "text-destructive", "text-warning", "text-neon", "text-success"]

export function PasswordStrength({ password }: { password: string }) {
  const { score, checks, label } = getPasswordStrength(password)
  if (!password) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="-mt-2 flex flex-col gap-2.5 overflow-hidden"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3, 4].map((step) => (
            <span key={step} className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.span
                className={cn("block h-full rounded-full", barTone[score])}
                initial={false}
                animate={{ width: score >= step ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          ))}
        </div>
        <span className={cn("text-xs font-medium", textTone[score])}>{label}</span>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {checks.map((check) => (
          <li
            key={check.label}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              check.ok ? "text-foreground/80" : "text-muted-foreground/70",
            )}
          >
            <Check className={cn("size-3", check.ok ? "text-success" : "opacity-30")} aria-hidden />
            {check.label}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
