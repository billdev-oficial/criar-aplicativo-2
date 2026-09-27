"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, Clock, Cpu, KeyRound, ShoppingBag, Sparkles, TimerOff } from "lucide-react"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { buttonStyles } from "@/components/bz/glow-button"
import { GlowProgress } from "@/components/bz/glow-progress"
import { InfoRow, PageHeader } from "@/components/bz/primitives"
import { StatusBadge } from "@/components/bz/status-badge"
import { MaskedKey } from "@/components/panel/license-card"
import { currentLicense } from "@/lib/mock-data"
import { formatDate, formatDateTime } from "@/lib/format"
import type { LicenseEvent } from "@/lib/types"
import { cn } from "@/lib/utils"

const eventIcons: Record<LicenseEvent["type"], React.ComponentType<{ className?: string }>> = {
  purchase: ShoppingBag,
  activation: KeyRound,
  hwid: Cpu,
  reminder: Bell,
  expiration: TimerOff,
}

export function LicenseView() {
  const license = currentLicense
  const usedPercent = Math.round(((license.totalDays - license.daysRemaining) / license.totalDays) * 100)

  return (
    <>
      <PageHeader
        eyebrow="Licenças"
        title="Minha Licença"
        description="Detalhes completos, tempo restante e histórico da sua licença."
        actions={
          <Link href="/ativar" className={buttonStyles({ size: "sm" })}>
            <Sparkles /> Estender licença
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <GlassCard delay={0.04} className="p-6">
            <CardHeading icon={KeyRound} title="Detalhes da licença" action={<StatusBadge tone="success" pulse>Ativa</StatusBadge>} />
            <div className="mt-5 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">License Key</p>
              <MaskedKey value={license.key} />
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoRow label="Produto">{license.product}</InfoRow>
              <InfoRow label="Plano">{license.plan}</InfoRow>
              <InfoRow label="Ativada em">{formatDateTime(license.activatedAt)}</InfoRow>
              <InfoRow label="Expira em">{formatDateTime(license.expiresAt)}</InfoRow>
              <InfoRow label="HWID vinculado" className="sm:col-span-2">
                <code className="truncate font-mono text-xs">{license.hwid}</code>
              </InfoRow>
            </dl>
          </GlassCard>

          <GlassCard delay={0.08} className="p-6">
            <CardHeading icon={Clock} title="Histórico" />
            <ol className="relative mt-6 flex flex-col gap-6 pl-2">
              <span aria-hidden className="absolute bottom-2 left-[25px] top-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
              {license.timeline.map((event, i) => {
                const Icon = eventIcons[event.type]
                return (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                    className="relative flex gap-4"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border bg-background",
                        event.upcoming ? "border-dashed border-border text-muted-foreground" : "border-primary/40 text-neon shadow-[0_0_16px_-4px_var(--primary-glow)]",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className={cn("pt-1", event.upcoming && "opacity-70")}>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                        {event.title}
                        {event.upcoming && <StatusBadge tone="neutral">Futuro</StatusBadge>}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground/70">{formatDate(event.date)}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </GlassCard>
        </div>

        <GlassCard delay={0.06} className="flex h-fit flex-col items-center gap-6 p-8 text-center">
          <CountdownRing daysRemaining={license.daysRemaining} totalDays={license.totalDays} />
          <div>
            <p className="text-sm text-muted-foreground">Sua licença expira em</p>
            <p className="font-medium">{formatDate(license.expiresAt)}</p>
          </div>
          <GlowProgress value={usedPercent} label={`${usedPercent}% utilizado`} className="w-full" />
          <Link href="/ativar" className={buttonStyles({ variant: "secondary", className: "w-full" })}>
            Adicionar tempo
          </Link>
        </GlassCard>
      </div>
    </>
  )
}

function CountdownRing({ daysRemaining, totalDays }: { daysRemaining: number; totalDays: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const ratio = daysRemaining / totalDays
  return (
    <div className="relative size-44">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--neon)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - ratio) }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 8px var(--primary-glow))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold tracking-tight">{daysRemaining}</span>
        <span className="text-xs text-muted-foreground">de {totalDays} dias</span>
      </div>
    </div>
  )
}
