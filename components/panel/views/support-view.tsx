"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Inbox, MessageSquarePlus, Send } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { GlassCard } from "@/components/bz/glass-card"
import { Field } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { PageHeader, UserAvatar, dialogClassName } from "@/components/bz/primitives"
import { StatusBadge, type BadgeTone } from "@/components/bz/status-badge"
import { tickets as initialTickets } from "@/lib/mock-data"
import { createTicket, replyToTicket } from "@/lib/services"
import { formatDateTime } from "@/lib/format"
import type { Ticket, TicketPriority, TicketStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const statusMap: Record<TicketStatus, { label: string; tone: BadgeTone }> = {
  open: { label: "Aberto", tone: "primary" },
  pending: { label: "Aguardando", tone: "warning" },
  resolved: { label: "Resolvido", tone: "success" },
}

const priorityLabel: Record<TicketPriority, string> = { low: "Baixa", medium: "Média", high: "Alta" }
const categories = ["Licença", "HWID", "Download", "Pagamento", "Outro"]
const textareaClass =
  "min-h-28 w-full resize-none rounded-xl border border-input bg-black/30 px-3.5 py-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/50 focus:border-primary/60 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
const selectTriggerClass = "h-11 w-full rounded-xl border-input bg-black/30"

export function SupportView() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [selectedId, setSelectedId] = useState<string | null>(initialTickets[0]?.id ?? null)
  const [filter, setFilter] = useState<TicketStatus | "all">("all")
  const selected = tickets.find((t) => t.id === selectedId) ?? null
  const visible = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)

  function addMessage(ticketId: string, content: string, id: string, date: string) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: "open", updatedAt: date, messages: [...t.messages, { id, author: "user", name: "Você", content, date }] }
          : t,
      ),
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Ajuda"
        title="Suporte"
        description="Abra tickets e converse com nossa equipe."
        actions={
          <NewTicketDialog
            onCreated={(ticket) => {
              setTickets((prev) => [ticket, ...prev])
              setSelectedId(ticket.id)
              setFilter("all")
            }}
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard delay={0.04} className={cn("flex flex-col p-3 lg:col-span-2", selected && "hidden lg:flex")}>
          <div className="flex gap-1 p-1" role="tablist" aria-label="Filtrar tickets">
            {(["all", "open", "pending", "resolved"] as const).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
                className={cn(
                  "flex-1 rounded-lg px-2 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  filter === key ? "bg-primary/15 text-neon" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {key === "all" ? "Todos" : statusMap[key].label}
              </button>
            ))}
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {visible.length === 0 && (
              <li className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
                <Inbox className="size-6" aria-hidden />
                Nenhum ticket aqui.
              </li>
            )}
            {visible.map((ticket) => (
              <li key={ticket.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(ticket.id)}
                  className={cn(
                    "flex w-full flex-col gap-1.5 rounded-xl border p-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    ticket.id === selectedId ? "border-primary/30 bg-primary/10" : "border-transparent hover:bg-white/[0.03]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                    <StatusBadge tone={statusMap[ticket.status].tone}>{statusMap[ticket.status].label}</StatusBadge>
                  </div>
                  <span className="line-clamp-1 text-sm font-medium">{ticket.subject}</span>
                  <span className="text-xs text-muted-foreground">
                    {ticket.category} · Prioridade {priorityLabel[ticket.priority]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard delay={0.08} className={cn("flex min-h-[520px] flex-col lg:col-span-3", !selected && "hidden lg:flex")}>
          {selected ? (
            <TicketThread
              key={selected.id}
              ticket={selected}
              onBack={() => setSelectedId(null)}
              onReply={(content, id, date) => addMessage(selected.id, content, id, date)}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <Inbox className="size-8" aria-hidden />
              Selecione um ticket para ver a conversa.
            </div>
          )}
        </GlassCard>
      </div>
    </>
  )
}

function TicketThread({
  ticket,
  onBack,
  onReply,
}: {
  ticket: Ticket
  onBack: () => void
  onReply: (content: string, id: string, date: string) => void
}) {
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const resolved = ticket.status === "resolved"

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const content = reply.trim()
    if (!content) return
    setSending(true)
    const result = await replyToTicket(ticket.id, content)
    onReply(content, result.id, result.date)
    setReply("")
    setSending(false)
  }

  return (
    <>
      <div className="flex items-start gap-3 border-b border-border p-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para lista"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs text-muted-foreground">{ticket.id}</p>
          <h2 className="font-semibold text-balance">{ticket.subject}</h2>
          <p className="text-xs text-muted-foreground">Aberto em {formatDateTime(ticket.createdAt)}</p>
        </div>
        <StatusBadge tone={statusMap[ticket.status].tone}>{statusMap[ticket.status].label}</StatusBadge>
      </div>

      <ol className="flex flex-1 flex-col gap-4 overflow-y-auto p-5" aria-live="polite">
        <AnimatePresence initial={false}>
          {ticket.messages.map((m) => {
            const mine = m.author === "user"
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", mine && "flex-row-reverse")}
              >
                <UserAvatar name={m.name} size="sm" />
                <div className={cn("flex max-w-[80%] flex-col gap-1", mine && "items-end")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm text-pretty",
                      mine ? "rounded-tr-sm bg-primary/20 text-foreground" : "rounded-tl-sm border border-border bg-white/[0.03]",
                    )}
                  >
                    {m.content}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {m.name} · {formatDateTime(m.date)}
                  </span>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>

      <form onSubmit={send} className="flex items-end gap-2 border-t border-border p-4">
        <label htmlFor="ticket-reply" className="sr-only">
          Responder
        </label>
        <textarea
          id="ticket-reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              e.preventDefault()
              e.currentTarget.form?.requestSubmit()
            }
          }}
          placeholder={resolved ? "Enviar mensagem reabrirá o ticket..." : "Escreva sua resposta..."}
          rows={1}
          className={cn(textareaClass, "min-h-11")}
        />
        <GlowButton type="submit" disabled={!reply.trim()} loading={sending} aria-label="Enviar" className="size-11 shrink-0 px-0">
          {!sending && <Send />}
        </GlowButton>
      </form>
    </>
  )
}

function NewTicketDialog({ onCreated }: { onCreated: (ticket: Ticket) => void }) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [priority, setPriority] = useState<TicketPriority>("medium")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const valid = subject.trim().length >= 5 && message.trim().length >= 10

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setLoading(true)
    const ticket = await createTicket({ subject: subject.trim(), category, priority, message: message.trim() })
    setLoading(false)
    setOpen(false)
    setSubject("")
    setMessage("")
    onCreated(ticket)
    toast.success(`Ticket ${ticket.id} criado`, { description: "Nossa equipe responderá em breve." })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <DialogTrigger asChild>
        <GlowButton size="sm">
          <MessageSquarePlus /> Novo ticket
        </GlowButton>
      </DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>Novo ticket</DialogTitle>
          <DialogDescription>Descreva seu problema com o máximo de detalhes possível.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <Field label="Assunto" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ex.: Erro ao iniciar o produto" />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ticket-category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="ticket-category" className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ticket-priority">Prioridade</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TicketPriority)}>
                <SelectTrigger id="ticket-priority" className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(priorityLabel) as TicketPriority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      {priorityLabel[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticket-message">Mensagem</Label>
            <textarea
              id="ticket-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Conte o que aconteceu..."
              className={textareaClass}
            />
          </div>
          <DialogFooter className="gap-2">
            <GlowButton variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </GlowButton>
            <GlowButton type="submit" disabled={!valid} loading={loading} loadingText="Enviando...">
              Criar ticket
            </GlowButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
