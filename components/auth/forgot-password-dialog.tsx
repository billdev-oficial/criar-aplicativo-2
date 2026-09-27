"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { dialogClassName } from "@/components/bz/primitives"
import { requestPasswordReset } from "@/lib/services"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  defaultEmail,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultEmail: string
}) {
  const [email, setEmail] = useState(defaultEmail)
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email)) {
      setError("Informe um email válido.")
      return
    }
    setLoading(true)
    await requestPasswordReset(email)
    setLoading(false)
    onOpenChange(false)
    toast.success("Link de recuperação enviado", { description: `Verifique a caixa de entrada de ${email}.` })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) {
          setEmail(defaultEmail)
          setError(undefined)
        }
        onOpenChange(value)
      }}
    >
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>Recuperar senha</DialogTitle>
          <DialogDescription>Enviaremos um link seguro para você redefinir sua senha.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <Field
            label="Email"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(undefined)
            }}
            error={error}
            disabled={loading}
          />
          <GlowButton type="submit" loading={loading} loadingText="Enviando..." className="w-full">
            Enviar link
          </GlowButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
