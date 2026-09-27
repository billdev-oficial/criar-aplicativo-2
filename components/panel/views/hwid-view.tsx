"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cpu, History, Info, Link2, Unlink } from "lucide-react"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { CopyButton, InfoRow, PageHeader } from "@/components/bz/primitives"
import { StatusBadge } from "@/components/bz/status-badge"
import { HwidResetDialog } from "@/components/panel/hwid-reset-dialog"
import { currentUser, hwidHistory } from "@/lib/mock-data"
import { formatDateTime } from "@/lib/format"
import type { HwidEvent } from "@/lib/types"

export function HwidView() {
  const [linked, setLinked] = useState(currentUser.hwidStatus === "linked")
  const [resetsLeft, setResetsLeft] = useState(1)
  const [history, setHistory] = useState<HwidEvent[]>(hwidHistory)

  function handleReset() {
    setLinked(false)
    setResetsLeft(0)
    setHistory((prev) => [
      { id: `h-${Date.now()}`, action: "Reset solicitado", date: new Date().toISOString(), hwid: currentUser.hwid },
      ...prev,
    ])
  }

  return (
    <>
      <PageHeader eyebrow="Segurança" title="HWID" description="Gerencie o dispositivo vinculado à sua licença." />

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.04} className="flex flex-col gap-6 p-6 lg:col-span-2">
          <CardHeading
            icon={Cpu}
            title="Dispositivo vinculado"
            action={
              <AnimatePresence mode="wait">
                <motion.span key={String(linked)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  {linked ? <StatusBadge tone="success" pulse>Vinculado</StatusBadge> : <StatusBadge tone="warning">Não vinculado</StatusBadge>}
                </motion.span>
              </AnimatePresence>
            }
          />

          <div className="flex items-center gap-5 rounded-2xl border border-border bg-black/30 p-5">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-neon">
              {linked ? <Link2 className="size-6" /> : <Unlink className="size-6" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">HWID atual</p>
              <p className="truncate font-mono text-sm sm:text-base">{linked ? currentUser.hwid : "Aguardando novo dispositivo..."}</p>
            </div>
            {linked && <CopyButton value={currentUser.hwid} label="Copiar HWID" />}
          </div>

          <dl className="grid gap-3 sm:grid-cols-3">
            <InfoRow label="Status">{linked ? "Vinculado" : "Livre"}</InfoRow>
            <InfoRow label="Resets disponíveis">{resetsLeft} / 1</InfoRow>
            <InfoRow label="Próximo reset">{resetsLeft ? "Disponível agora" : "Em 30 dias"}</InfoRow>
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <HwidResetDialog disabled={!linked || resetsLeft === 0} onReset={handleReset} />
            {!resetsLeft && <p className="text-xs text-muted-foreground">Limite de resets atingido neste período.</p>}
          </div>
        </GlassCard>

        <GlassCard delay={0.08} className="flex h-fit flex-col gap-4 p-6">
          <CardHeading icon={Info} title="Como funciona" />
          <ol className="flex flex-col gap-3 text-sm text-muted-foreground">
            {[
              "Ao abrir o produto pela primeira vez, seu dispositivo é vinculado automaticamente.",
              "A licença funciona apenas no dispositivo vinculado.",
              "Trocou de PC ou formatou? Solicite um reset (1 a cada 30 dias).",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-neon">
                  {i + 1}
                </span>
                <span className="text-pretty">{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard delay={0.12} className="p-6 lg:col-span-3">
          <CardHeading icon={History} title="Histórico de HWID" />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-3 font-medium">Ação</th>
                  <th className="pb-3 font-medium">HWID</th>
                  <th className="pb-3 text-right font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {history.map((event) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, backgroundColor: "color-mix(in oklab, var(--primary) 15%, transparent)" }}
                      animate={{ opacity: 1, backgroundColor: "rgba(0,0,0,0)" }}
                      transition={{ duration: 0.8 }}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="py-3 font-medium">{event.action}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{event.hwid}</td>
                      <td className="py-3 text-right text-muted-foreground">{formatDateTime(event.date)}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
