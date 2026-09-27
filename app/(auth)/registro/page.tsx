import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterFooter, RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = { title: "Criar conta" }

export default function RegisterPage() {
  return (
    <AuthShell
      title="Criar sua conta"
      subtitle="Junte-se à BzCheats e ative o BzAimDDT."
      footer={<RegisterFooter />}
    >
      <RegisterForm />
    </AuthShell>
  )
}
