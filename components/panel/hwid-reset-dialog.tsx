"use client"

import { useState } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
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
import { GlowButton } from "@/components/bz/glow-button"
import { dialogClassName } from "@/components/bz/primitives"
import { requestHwidReset } from "@/lib/services"

export function HwidResetDialog({
  disabled,
  onReset,
  trigger,
}: {
  disabled?: boolean
  onReset?: () => void
  trigger?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function confirm() {
    setLoading(true)
    await requestHwidReset()
    setLoading(false)
    setOpen(false)
    onReset?.()
    toast.success("HWID resetado com sucesso", {
      description: "Abra o BzAimDDT no novo dispositivo para vincular automaticamente.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <DialogTrigger asChild>
        {trigger ?? (
          <GlowButton variant="secondary" disabled={disabled}>
            <RotateCcw /> Resetar HWID
          </GlowButton>
        )}
      </DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <span className="mb-2 flex size-11 items-center justify-center rounded-xl border border-warning/25 bg-warning/10 text-warning">
            <AlertTriangle className="size-5" />
          </span>
          <DialogTitle>Resetar HWID?</DialogTitle>
          <DialogDescription>
            Seu dispositivo atual será desvinculado da licença. Você tem direito a 1 reset a cada 30 dias.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <GlowButton variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </GlowButton>
          <GlowButton onClick={confirm} loading={loading} loadingText="Resetando...">
            Confirmar reset
          </GlowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
