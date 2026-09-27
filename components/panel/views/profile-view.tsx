"use client"

import { useState } from "react"
import { AtSign, KeyRound, Lock, Mail, MonitorSmartphone, UserRound } from "lucide-react"
import { toast } from "sonner"
import { CardHeading, GlassCard } from "@/components/bz/glass-card"
import { Field } from "@/components/bz/field"
import { GlowButton } from "@/components/bz/glow-button"
import { CopyButton, InfoRow, PageHeader, UserAvatar } from "@/components/bz/primitives"
import { StatusBadge } from "@/components/bz/status-badge"
import { ChangePasswordDialog } from "@/components/panel/change-password-dialog"
import { SessionsList } from "@/components/panel/sessions-list"
import { currentLicense, currentUser } from "@/lib/mock-data"
import { updateAccount } from "@/lib/services"
import { formatDate } from "@/lib/format"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ProfileView() {
  const [saved, setSaved] = useState({ username: currentUser.username, email: currentUser.email })
  const [username, setUsername] = useState(saved.username)
  const [email, setEmail] = useState(saved.email)
  const [saving, setSaving] = useState(false)

  const usernameError = username.trim().length < 3 ? "Mínimo de 3 caracteres." : undefined
  const emailError = !EMAIL_PATTERN.test(email) ? "Informe um e-mail válido." : undefined
  const dirty = username !== saved.username || email !== saved.email

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (usernameError || emailError || !dirty) return
    setSaving(true)
    const result = await updateAccount({ username: username.trim(), email })
    setSaved(result)
    setSaving(false)
    toast.success("Perfil atualizado com sucesso")
  }

  return (
    <>
      <PageHeader eyebrow="Conta" title="Meu Perfil" description="Suas informações pessoais e dados da conta." />

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.02} className="flex flex-col items-center gap-4 p-8 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_70%)]" />
          <UserAvatar name={saved.username} size="xl" online={currentUser.online} className="relative" />
          <div className="relative">
            <h2 className="text-xl font-semibold">{saved.username}</h2>
            <p className="text-sm text-muted-foreground">{saved.email}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <StatusBadge tone="success" pulse>Online</StatusBadge>
            <StatusBadge tone="primary">{currentLicense.plan}</StatusBadge>
          </div>
          <dl className="mt-2 grid w-full grid-cols-2 gap-3 text-left">
            <InfoRow label="Membro desde">{formatDate(currentUser.createdAt)}</InfoRow>
            <InfoRow label="Status">
              <span className="text-success">Ativa</span>
            </InfoRow>
          </dl>
        </GlassCard>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <GlassCard delay={0.06} className="p-6">
            <CardHeading icon={UserRound} title="Informações da conta" />
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoRow label="ID do usuário">
                <code className="font-mono">{currentUser.id}</code>
                <CopyButton value={currentUser.id} label="Copiar ID" />
              </InfoRow>
              <InfoRow label="Data de criação">{formatDate(currentUser.createdAt)}</InfoRow>
              <InfoRow label="Status da conta">
                <StatusBadge tone="success">Ativa</StatusBadge>
              </InfoRow>
              <InfoRow label="HWID vinculado">
                <code className="truncate font-mono text-xs">{currentUser.hwid}</code>
              </InfoRow>
            </dl>
          </GlassCard>

          <GlassCard delay={0.1} className="p-6">
            <CardHeading icon={AtSign} title="Editar dados" />
            <form onSubmit={handleSave} className="mt-5 flex flex-col gap-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nome de usuário"
                  icon={UserRound}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={usernameError}
                  autoComplete="username"
                />
                <Field
                  label="E-mail"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ChangePasswordDialog
                  trigger={
                    <GlowButton variant="ghost" size="sm">
                      <Lock /> Alterar senha
                    </GlowButton>
                  }
                />
                <div className="flex gap-2">
                  <GlowButton
                    variant="ghost"
                    size="sm"
                    disabled={!dirty || saving}
                    onClick={() => {
                      setUsername(saved.username)
                      setEmail(saved.email)
                    }}
                  >
                    Descartar
                  </GlowButton>
                  <GlowButton type="submit" size="sm" disabled={!dirty || !!usernameError || !!emailError} loading={saving} loadingText="Salvando...">
                    Salvar alterações
                  </GlowButton>
                </div>
              </div>
            </form>
          </GlassCard>

          <GlassCard delay={0.14} className="p-6">
            <CardHeading icon={MonitorSmartphone} title="Sessões ativas" action={<KeyRound className="size-4 text-muted-foreground" aria-hidden />} />
            <div className="mt-5">
              <SessionsList />
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
