import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginFooter, LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = { title: "Entrar" }

export default function LoginPage() {
  return (
    <AuthShell title="Entrar na sua conta" subtitle="Acesse seu painel e gerencie sua licença." footer={<LoginFooter />}>
      <LoginForm />
    </AuthShell>
  )
}
