"use client"

import { FileCheck2, ListChecks, ScrollText } from "lucide-react"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { CopyButton, PageHeader } from "@/components/bz/primitives"
import { StatusBadge } from "@/components/bz/status-badge"
import { ProductCard } from "@/components/panel/product-card"
import { changelog, product } from "@/lib/mock-data"
import { formatDate } from "@/lib/format"

const steps = [
  "Desative temporariamente o antivírus ou adicione uma exceção para a pasta.",
  "Extraia o arquivo baixado em uma pasta de sua preferência.",
  "Execute o BzAimDDT como administrador.",
  "Faça login com sua conta — o HWID será vinculado automaticamente.",
]

export function DownloadsView() {
  return (
    <>
      <PageHeader eyebrow="Produtos" title="Downloads" description="Baixe a versão mais recente dos seus produtos." />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProductCard product={product} detailed delay={0.04} />

          <GlassCard delay={0.08} className="flex flex-col gap-3 p-6">
            <CardHeading icon={FileCheck2} title="Checksum SHA-256" />
            <div className="flex items-center gap-1 rounded-xl border border-border bg-black/30 py-1 pl-3.5 pr-1">
              <code className="flex-1 truncate font-mono text-xs text-muted-foreground">{product.checksum}</code>
              <CopyButton value={product.checksum} label="Copiar checksum" />
            </div>
            <p className="text-xs text-muted-foreground">Compare o hash para garantir a integridade do arquivo.</p>
          </GlassCard>

          <GlassCard delay={0.12} className="flex flex-col gap-4 p-6">
            <CardHeading icon={ListChecks} title="Instalação" />
            <ol className="flex flex-col gap-3 text-sm text-muted-foreground">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-neon">
                    {i + 1}
                  </span>
                  <span className="text-pretty">{step}</span>
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>

        <GlassCard delay={0.06} className="h-fit p-6 lg:col-span-3">
          <CardHeading icon={ScrollText} title="Changelog" />
          <ol className="mt-6 flex flex-col gap-6">
            {changelog.map((entry, i) => (
              <li key={entry.version} className="flex flex-col gap-3 border-b border-border/60 pb-6 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-base font-semibold">{entry.version}</span>
                  <StatusBadge tone={entry.channel === "Beta" ? "warning" : "primary"}>{entry.channel}</StatusBadge>
                  {i === 0 && <StatusBadge tone="success">Mais recente</StatusBadge>}
                  <span className="ml-auto text-xs text-muted-foreground">{formatDate(entry.date)}</span>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {entry.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-neon" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>
    </>
  )
}
