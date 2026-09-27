"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, ArrowRight, Lock, User } from "lucide-react"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, PasswordField } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { signIn } from "@/lib/services"
import { ForgotPasswordDialog } from "./forgot-password-dialog"

type Errors = { identifier?: string; password?: string; form?: string }

export function LoginForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [forgotOpen, setForgotOpen] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next: Errors = {}
    if (!identifier.trim()) next.identifier = "Informe seu usuário ou email."
    if (password.length < 6) next.password = "A senha deve ter pelo menos 6 caracteres."
    setErrors(next)
    if (Object.keys(next).length) return

    setLoading(true)
    try {
      const user = await signIn({ identifier, password, remember })
      toast.success(`Bem-vindo de volta, ${user.username}.`)
      router.push("/dashboard")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível entrar."
      setErrors({ form: message })
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <AnimatePresence>
          {errors.form && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: [0, -8, 8, -4, 4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              {errors.form}
            </motion.div>
          )}
        </AnimatePresence>

        <Field
          label="Usuário ou Email"
          icon={User}
          name="identifier"
          autoComplete="username"
          placeholder="seu@email.com"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value)
            if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }))
          }}
          error={errors.identifier}
          disabled={loading}
        />

        <PasswordField
          label="Senha"
          icon={Lock}
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
          }}
          error={errors.password}
          disabled={loading}
          labelAction={
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="rounded text-xs font-medium text-neon/90 outline-none transition-colors hover:text-neon focus-visible:ring-2 focus-visible:ring-ring"
            >
              Esqueceu sua senha?
            </button>
          }
        />

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted-foreground select-none">
          <Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} disabled={loading} />
          Lembrar de mim
        </label>

        <GlowButton
          type="submit"
          size="lg"
          loading={loading}
          loadingText="Entrando..."
          disabled={!identifier || !password}
          className="group mt-1 w-full"
        >
          Entrar
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </GlowButton>
      </form>
      <ForgotPasswordDialog open={forgotOpen} onOpenChange={setForgotOpen} defaultEmail={identifier.includes("@") ? identifier : ""} />
    </>
  )
}

export function LoginFooter() {
  return (
    <>
      Ainda não tem uma conta?{" "}
      <Link href="/registro" className="font-medium text-neon outline-none hover:underline focus-visible:underline">
        Criar conta
      </Link>
    </>
  )
}
