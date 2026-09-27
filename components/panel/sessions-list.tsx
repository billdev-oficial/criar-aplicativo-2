"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Monitor, Smartphone, X } from "lucide-react"
import { toast } from "sonner"
import { StatusBadge } from "@/components/bz/status-badge"
import { sessions as initialSessions } from "@/lib/mock-data"
import { revokeSession } from "@/lib/services"

export function SessionsList() {
  const [sessions, setSessions] = useState(initialSessions)
  const [pending, setPending] = useState<string | null>(null)

  async function revoke(id: string) {
    setPending(id)
    await revokeSession(id)
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setPending(null)
    toast.success("Sessão encerrada")
  }

  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {sessions.map((session) => {
          const Icon = session.kind === "mobile" ? Smartphone : Monitor
          return (
            <motion.li
              key={session.id}
              layout
              exit={{ opacity: 0, x: 16, height: 0, marginTop: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted-foreground">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  {session.device}
                  {session.current && <StatusBadge tone="success">Este dispositivo</StatusBadge>}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {session.location} · {session.ip} · {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <button
                  type="button"
                  onClick={() => revoke(session.id)}
                  disabled={pending === session.id}
                  aria-label={`Encerrar sessão ${session.device}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  {pending === session.id ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                </button>
              )}
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}
