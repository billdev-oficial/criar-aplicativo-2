"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Download, KeyRound, LifeBuoy, LogOut, Menu, Settings, ShieldAlert, UserRound } from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { UserAvatar } from "@/components/bz/primitives"
import { currentUser, notifications as initialNotifications } from "@/lib/mock-data"
import type { AppNotification } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SidebarContent } from "./sidebar"

const notificationIcons: Record<AppNotification["type"], React.ComponentType<{ className?: string }>> = {
  license: KeyRound,
  update: Download,
  security: ShieldAlert,
  support: LifeBuoy,
}

const menuClass = "rounded-xl border-border bg-popover/95 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgb(0_0_0/0.9)]"

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}

export function Header() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [items, setItems] = useState(initialNotifications)
  const unread = items.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium sm:text-base">
            <span suppressHydrationWarning>{greeting()}</span>, bem-vindo de volta,{" "}
            <span className="text-gradient font-semibold">{currentUser.username}</span>.
          </p>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">Gerencie sua licença e seus produtos.</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Notificações${unread ? `, ${unread} não lidas` : ""}`}
            className="relative flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground outline-none transition-colors hover:border-primary/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:border-primary/40 data-[state=open]:text-foreground"
          >
            <Bell className="size-[18px]" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground shadow-[0_0_12px_var(--primary-glow)]">
                {unread}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className={cn(menuClass, "w-[340px] p-0")}>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm font-semibold">Notificações</p>
              <button
                type="button"
                disabled={!unread}
                onClick={() => {
                  setItems((prev) => prev.map((n) => ({ ...n, read: true })))
                  toast.success("Todas as notificações foram marcadas como lidas.")
                }}
                className="rounded text-xs text-neon outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring disabled:text-muted-foreground disabled:no-underline"
              >
                Marcar todas como lidas
              </button>
            </div>
            <DropdownMenuSeparator className="m-0" />
            <div className="max-h-[360px] overflow-y-auto p-1.5">
              {items.map((n) => {
                const Icon = notificationIcons[n.type]
                return (
                  <DropdownMenuItem
                    key={n.id}
                    onSelect={(e) => {
                      e.preventDefault()
                      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
                    }}
                    className="flex items-start gap-3 rounded-lg p-3"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-neon">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-sm", n.read ? "text-muted-foreground" : "font-medium")}>{n.title}</span>
                      <span className="block text-xs text-muted-foreground">{n.description}</span>
                      <span className="mt-1 block text-[11px] text-muted-foreground/70">{n.time}</span>
                    </span>
                    {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-neon" aria-label="Não lida" />}
                  </DropdownMenuItem>
                )
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Menu do usuário"
            className="flex items-center gap-2.5 rounded-xl p-1 outline-none transition-colors hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-ring sm:pr-3"
          >
            <UserAvatar name={currentUser.username} size="sm" online={currentUser.online} />
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight">{currentUser.username}</span>
              <span className="block text-[11px] text-neon">Premium</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className={cn(menuClass, "w-56")}>
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{currentUser.username}</p>
              <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/perfil">
                <UserRound /> Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/licenca">
                <KeyRound /> Minha Licença
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/configuracoes">
                <Settings /> Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => {
                toast.success("Você saiu da sua conta.")
                router.push("/login")
              }}
            >
              <LogOut /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[284px] border-border bg-[#07050c]/95 p-0 backdrop-blur-xl">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SidebarContent layoutId="nav-active-mobile" onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  )
}
