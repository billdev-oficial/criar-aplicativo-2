"use client"

import Link from "next/link"
import { ArrowUpRight, CalendarClock, Cpu, Crown, LifeBuoy, ShieldCheck, Sparkles } from "lucide-react"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { buttonStyles } from "@/components/bz/glow-button"
import { GlowProgress } from "@/components/bz/glow-progress"
import { CopyButton, PageHeader } from "@/components/bz/primitives"
import { StatCard } from "@/components/bz/stat-card"
import { StatusBadge } from "@/components/bz/status-badge"
import { LicenseCard } from "@/components/panel/license-card"
import { ProductCard } from "@/components/panel/product-card"
import { changelog, currentLicense, currentUser, product } from "@/lib/mock-data"
import { formatDate } from "@/lib/format"

export function DashboardView() {
  const license = currentLicense
  const usedPercent = Math.round(((license.totalDays - license.daysRemaining) / license.totalDays) * 100)
  const latest = changelog[0]

  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard"
        description="Acompanhe o status da sua licença, do seu dispositivo e dos seus produtos."
        actions={
          <Link href="/ativar" className={buttonStyles({ size: "sm" })}>
            <Sparkles /> Ativar nova key
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Crown} label="Plano" value={license.plan} hint="VIP ativo" delay={0.02} />
        <StatCard icon={CalendarClock} label="Dias restantes" value={`${license.daysRemaining} dias`} hint={`Expira em ${formatDate(license.expiresAt)}`} delay={0.06} />
        <StatCard icon={ShieldCheck} label="Status da conta" value="Ativa" hint="Nenhuma restrição" delay={0.1} />
        <StatCard icon={Cpu} label="HWID" value="Vinculado" hint="1 dispositivo" delay={0.14} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <GlassCard delay={0.12} className="relative flex flex-col gap-6 p-6 lg:col-span-3">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/25 blur-3xl"
          />
          <CardHeading icon={Crown} title="VIP Status" action={<StatusBadge tone="success" pulse>Ativo</StatusBadge>} />
          <div className="relative flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{license.product}</p>
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">{license.daysRemaining}</span>
              <span className="ml-2 text-lg font-normal text-muted-foreground">dias restantes</span>
            </p>
          </div>
          <GlowProgress value={usedPercent} label={`${usedPercent}% do período utilizado`} />
          <dl className="relative grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted-foreground">Ativado em</dt>
              <dd className="font-medium">{formatDate(license.activatedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Expira em</dt>
              <dd className="font-medium">{formatDate(license.expiresAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Plano</dt>
              <dd className="font-medium">{license.plan}</dd>
            </div>
          </dl>
        </GlassCard>

        <GlassCard delay={0.16} interactive className="flex flex-col gap-5 p-6 lg:col-span-2">
          <CardHeading icon={Cpu} title="HWID Status" action={<StatusBadge tone="success">Vinculado</StatusBadge>} />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Identificador do dispositivo</p>
            <div className="flex items-center gap-1 rounded-xl border border-border bg-black/30 py-1 pl-3.5 pr-1">
              <code className="flex-1 truncate font-mono text-sm">{currentUser.hwid}</code>
              <CopyButton value={currentUser.hwid} label="Copiar HWID" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">
            Sua licença está vinculada a este dispositivo. Trocou de PC? Solicite um reset.
          </p>
          <Link href="/hwid" className={buttonStyles({ variant: "secondary", className: "mt-auto w-full" })}>
            Gerenciar HWID
          </Link>
        </GlassCard>

        <div className="lg:col-span-2">
          <LicenseCard license={license} delay={0.2} />
        </div>

        <div className="lg:col-span-3">
          <ProductCard product={product} delay={0.24} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard delay={0.28} className="flex flex-col gap-4 p-6">
          <CardHeading
            icon={Sparkles}
            title="Última atualização"
            action={
              <Link href="/downloads" className="flex items-center gap-1 rounded text-xs text-neon outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring">
                Changelog <ArrowUpRight className="size-3.5" />
              </Link>
            }
          />
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold">{latest.version}</span>
            <StatusBadge tone="primary">{latest.channel}</StatusBadge>
            <span className="text-xs text-muted-foreground">{formatDate(latest.date)}</span>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {latest.items.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-neon" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard delay={0.32} className="flex flex-col gap-4 p-6">
          <CardHeading icon={LifeBuoy} title="Precisa de ajuda?" />
          <p className="text-sm text-muted-foreground text-pretty">
            Nossa equipe de suporte responde em média em menos de 2 horas. Abra um ticket e acompanhe tudo por aqui.
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <Link href="/suporte" className={buttonStyles({ variant: "secondary", size: "sm" })}>
              Abrir ticket
            </Link>
            <Link href="/downloads" className={buttonStyles({ variant: "ghost", size: "sm" })}>
              Guia de instalação
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
