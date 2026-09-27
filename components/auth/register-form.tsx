"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AtSign, Lock, User } from "lucide-react"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, PasswordField } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { signUp } from "@/lib/services"
import { PasswordStrength, getPasswordStrength } from "./password-strength"

type Values = { username: string; email: string; password: string; confirm: string }
type FieldName = keyof Values

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {}
  if (!USERNAME_PATTERN.test(values.username)) errors.username = "Use 3 a 20 caracteres: letras, números ou _."
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Informe um email válido."
  if (getPasswordStrength(values.password).score < 3) errors.password = "Sua senha precisa ser pelo menos “Boa”."
  if (!values.confirm || values.confirm !== values.password) errors.confirm = "As senhas não coincidem."
  return errors
}

export function RegisterForm() {
  const router = useRouter()
  const [values, setValues] = useState<Values>({ username: "", email: "", password: "", confirm: "" })
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string>()

  const errors = validate(values)
  const show = (name: FieldName) => (touched[name] ? errors[name] : undefined)
  const isValid = (name: FieldName) => touched[name] && !errors[name]

  const bind = (name: FieldName) => ({
    name,
    value: values[name],
    disabled: loading,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }))
      if (name === "username") setServerError(undefined)
    },
    onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),
  })

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setTouched({ username: true, email: true, password: true, confirm: true })
    if (Object.keys(errors).length || !terms) return

    setLoading(true)
    try {
      const user = await signUp(values)
      toast.success("Conta criada com sucesso", { description: `Bem-vindo à BzCheats, ${user.username}.` })
      router.push("/dashboard")
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Não foi possível criar a conta.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field
        label="Nome de usuário"
        icon={User}
        autoComplete="username"
        placeholder="seu_usuario"
        error={serverError ?? show("username")}
        valid={isValid("username") && !serverError}
        {...bind("username")}
      />
      <Field
        label="Email"
        icon={AtSign}
        type="email"
        autoComplete="email"
        placeholder="seu@email.com"
        error={show("email")}
        valid={isValid("email")}
        {...bind("email")}
      />
      <PasswordField
        label="Senha"
        icon={Lock}
        autoComplete="new-password"
        placeholder="Crie uma senha forte"
        error={show("password")}
        valid={isValid("password")}
        {...bind("password")}
      />
      <PasswordStrength password={values.password} />
      <PasswordField
        label="Confirmar senha"
        icon={Lock}
        autoComplete="new-password"
        placeholder="Repita a senha"
        error={show("confirm")}
        valid={isValid("confirm")}
        {...bind("confirm")}
      />

      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted-foreground select-none">
        <Checkbox
          checked={terms}
          onCheckedChange={(v) => setTerms(v === true)}
          disabled={loading}
          className="mt-0.5"
          aria-describedby="terms-text"
        />
        <span id="terms-text">
          Li e aceito os{" "}
          <a href="#" className="text-neon hover:underline">
            Termos de Uso
          </a>{" "}
          e a{" "}
          <a href="#" className="text-neon hover:underline">
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      <GlowButton
        type="submit"
        size="lg"
        loading={loading}
        loadingText="Criando conta..."
        disabled={!terms}
        className="mt-1 w-full"
      >
        Criar conta
      </GlowButton>
    </form>
  )
}

export function RegisterFooter() {
  return (
    <>
      Já possui uma conta?{" "}
      <Link href="/login" className="font-medium text-neon outline-none hover:underline focus-visible:underline">
        Voltar ao login
      </Link>
    </>
  )
}
