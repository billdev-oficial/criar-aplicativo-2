"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, ClipboardPaste, KeyRound, Loader2, XCircle } from "lucide-react"
import { toast } from "sonner"
import { GlassCard } from "@/components/bz/glass-card"
import { GlowButton, buttonStyles } from "@/components/bz/glow-button"
import { PageHeader } from "@/components/bz/primitives"
import { activateLicenseKey, LICENSE_KEY_PATTERN } from "@/lib/services"
import { formatDate, formatLicenseKey } from "@/lib/format"
import type { ActivationResult } from "@/lib/types"
import { cn } from "@/lib/utils"

type State = { phase: "idle" } | { phase: "loading" } | { phase: "done"; result: ActivationResult }

const tips = [
  "A key tem o formato XXXX-XXXX-XXXX-XXXX.",
  "Cada key pode ser ativada apenas uma vez.",
  "O tempo é somado à sua licença atual.",
]

export function ActivateView() {
  const [key, setKey] = useState("")
  const [state, setState] = useState<State>({ phase: "idle" })
  const complete = LICENSE_KEY_PATTERN.test(key)
  const loading = state.phase === "loading"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!complete || loading) return
    setState({ phase: "loading" })
    const result = await activateLicenseKey(key)
    setState({ phase: "done", result })
    if (result.ok) toast.success("Key ativada com sucesso!")
    else toast.error(result.message)
  }

  async function paste() {
    try {
      const text = await navigator.clipboard.readText()
      setKey(formatLicenseKey(text))
    } catch {
      toast.error("Não foi possível acessar a área de transferência.")
    }
  }

  const result = state.phase === "done" ? state.result : null

  return (
    <>
      <PageHeader eyebrow="Licenças" title="Ativar Key" description="Insira sua license key para ativar ou estender seu acesso." />

      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <GlassCard delay={0.04} className="p-6 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-40 w-3/4 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
          <form onSubmit={handleSubmit} className="relative flex flex-col items-center gap-6 text-center" noValidate>
            <motion.span
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={loading ? { repeat: Infinity, duration: 2.4, ease: "linear" } : { duration: 0.4 }}
              className="flex size-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-neon shadow-[0_0_40px_-10px_var(--primary-glow)]"
            >
              <KeyRound className="size-7" aria-hidden />
            </motion.span>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="license-key" className="text-sm font-medium">
                License Key
              </label>
              <div
                className={cn(
                  "flex items-center rounded-2xl border bg-black/30 p-1.5 transition-[border-color,box-shadow]",
                  "focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent),0_0_32px_-8px_var(--primary-glow)]",
                  result && !result.ok ? "border-destructive/50" : result?.ok ? "border-success/50" : "border-input",
                )}
              >
                <input
                  id="license-key"
                  value={key}
                  onChange={(e) => {
                    setKey(formatLicenseKey(e.target.value))
                    if (state.phase === "done") setState({ phase: "idle" })
                  }}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  disabled={loading}
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="license-key-hint"
                  className="h-12 min-w-0 flex-1 bg-transparent px-3 text-center font-mono text-lg tracking-[0.2em] uppercase outline-none placeholder:text-muted-foreground/40 sm:text-xl"
                />
                <button
                  type="button"
                  onClick={paste}
                  disabled={loading}
                  aria-label="Colar key"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground outline-none transition-colors hover:bg-white/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ClipboardPaste className="size-4" />
                </button>
              </div>
              <p id="license-key-hint" className="text-xs text-muted-foreground">
                Teste: <code className="font-mono text-neon">BZ12-3456-7890-ABCD</code> (válida) ·{" "}
                <code className="font-mono">USED-0000-0000-0000</code> (já usada)
              </p>
            </div>

            <GlowButton type="submit" size="lg" disabled={!complete} loading={loading} loadingText="Validando key..." className="w-full">
              Ativar
            </GlowButton>
          </form>
        </GlassCard>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <GlassCard className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin text-neon" aria-hidden />
                Verificando key nos nossos servidores...
              </GlassCard>
            </motion.div>
          )}
          {result && (
            <motion.div
              key={result.ok ? "ok" : "err"}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
            >
              {result.ok ? (
                <GlassCard className="border-success/30 p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="size-6 shrink-0 text-success" aria-hidden />
                    <div className="flex-1">
                      <h2 className="font-semibold">Key ativada com sucesso!</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {result.plan} de {result.product} — +{result.durationDays} dias adicionados.
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Nova data de expiração: <span className="font-medium text-foreground">{formatDate(result.expiresAt)}</span>
                      </p>
                      <Link href="/licenca" className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-4" })}>
                        Ver minha licença
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ) : (
                <GlassCard className="border-destructive/30 p-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="size-6 shrink-0 text-destructive" aria-hidden />
                    <div>
                      <h2 className="font-semibold">Não foi possível ativar</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
                    </div>
                  </div>
                </GlassCard>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="grid gap-3 sm:grid-cols-3">
          {tips.map((tip, i) => (
            <motion.li
              key={tip}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-xl border border-border bg-white/[0.02] p-4 text-xs text-muted-foreground"
            >
              {tip}
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  )
}
