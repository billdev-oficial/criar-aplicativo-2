"use client"

import { useState } from "react"
import { Crosshair, Download } from "lucide-react"
import { toast } from "sonner"
import { GlassCard } from "@/components/bz/glass-card"
import { GlowButton } from "@/components/bz/glow-button"
import { StatusBadge } from "@/components/bz/status-badge"
import { downloadProduct } from "@/lib/services"
import { formatDate } from "@/lib/format"
import type { Product } from "@/lib/types"

const statusLabel: Record<Product["status"], { label: string; tone: "success" | "warning" | "danger" }> = {
  operational: { label: "Online · Operational", tone: "success" },
  maintenance: { label: "Em manutenção", tone: "warning" },
  offline: { label: "Offline", tone: "danger" },
}

export function useProductDownload(name: string) {
  const [downloading, setDownloading] = useState(false)
  async function start() {
    setDownloading(true)
    await downloadProduct()
    setDownloading(false)
    toast.success(`Download de ${name} iniciado`, { description: "O arquivo será salvo na sua pasta de downloads." })
  }
  return { downloading, start }
}

export function ProductCard({ product, delay = 0, detailed = false }: { product: Product; delay?: number; detailed?: boolean }) {
  const { downloading, start } = useProductDownload(product.name)
  const status = statusLabel[product.status]

  return (
    <GlassCard delay={delay} interactive className="flex flex-col gap-5 p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_70%)] text-neon">
          <Crosshair className="size-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">Produto</p>
          <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StatusBadge tone={status.tone} pulse={product.status === "operational"}>
              {status.label}
            </StatusBadge>
            <StatusBadge tone="neutral">{product.channel}</StatusBadge>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Versão</dt>
          <dd className="font-mono font-medium">{product.version}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Tamanho</dt>
          <dd className="font-medium">{product.size}</dd>
        </div>
        {detailed && (
          <>
            <div>
              <dt className="text-xs text-muted-foreground">Atualizado em</dt>
              <dd className="font-medium">{formatDate(product.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Plataforma</dt>
              <dd className="font-medium">Windows 10 / 11 · x64</dd>
            </div>
          </>
        )}
      </dl>

      <GlowButton onClick={start} loading={downloading} loadingText="Preparando download..." className="mt-auto w-full">
        <Download /> Download
      </GlowButton>
    </GlassCard>
  )
}
