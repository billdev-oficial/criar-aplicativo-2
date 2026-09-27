"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, KeyRound } from "lucide-react"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { buttonStyles } from "@/components/bz/glow-button"
import { CopyButton } from "@/components/bz/primitives"
import { StatusBadge } from "@/components/bz/status-badge"
import { formatDate, maskKey } from "@/lib/format"
import type { License } from "@/lib/types"

export function MaskedKey({ value }: { value: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-black/30 py-1 pl-3.5 pr-1">
      <code className="flex-1 truncate font-mono text-sm tracking-[0.14em]">{visible ? value : maskKey(value)}</code>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar key" : "Mostrar key"}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-white/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
      <CopyButton value={value} label="Copiar License Key" />
    </div>
  )
}

export function LicenseCard({ license, delay = 0 }: { license: License; delay?: number }) {
  return (
    <GlassCard delay={delay} interactive className="flex flex-col gap-5 p-6">
      <CardHeading icon={KeyRound} title="Licença" action={<StatusBadge tone="success" pulse>Ativa</StatusBadge>} />
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">License Key</p>
        <MaskedKey value={license.key} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Data de ativação</span>
        <span className="font-mono font-medium">{formatDate(license.activatedAt)}</span>
      </div>
      <Link href="/licenca" className={buttonStyles({ variant: "secondary", className: "mt-auto w-full" })}>
        Ver detalhes da licença
      </Link>
    </GlassCard>
  )
}
