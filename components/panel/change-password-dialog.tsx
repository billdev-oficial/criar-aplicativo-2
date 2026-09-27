"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
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
import { PasswordField } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { dialogClassName } from "@/components/bz/primitives"
import { PasswordStrength } from "@/components/auth/password-strength"
import { changePassword } from "@/lib/services"

export function ChangePasswordDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mismatch = confirm.length > 0 && confirm !== next
  const tooShort = next.length > 0 && next.length < 8
  const canSubmit = current && next.length >= 8 && confirm === next

  function reset() {
    setCurrent("")
    setNext("")
    setConfirm("")
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError(null)
    try {
      await changePassword({ current, next })
      toast.success("Senha alterada com sucesso")
      setOpen(false)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao alterar senha.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (loading) return
        setOpen(v)
        if (!v) reset()
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>Use pelo menos 8 caracteres, combinando letras, números e símbolos.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <PasswordField
            label="Senha atual"
            icon={Lock}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            error={error ?? undefined}
            autoComplete="current-password"
          />
          <div className="flex flex-col gap-2">
            <PasswordField
              label="Nova senha"
              icon={Lock}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              error={tooShort ? "Mínimo de 8 caracteres." : undefined}
              autoComplete="new-password"
            />
            <PasswordStrength password={next} />
          </div>
          <PasswordField
            label="Confirmar nova senha"
            icon={Lock}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={mismatch ? "As senhas não coincidem." : undefined}
            valid={confirm.length > 0 && !mismatch && next.length >= 8}
            autoComplete="new-password"
          />
          <DialogFooter className="mt-2 gap-2">
            <GlowButton variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </GlowButton>
            <GlowButton type="submit" disabled={!canSubmit} loading={loading} loadingText="Salvando...">
              Salvar nova senha
            </GlowButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
