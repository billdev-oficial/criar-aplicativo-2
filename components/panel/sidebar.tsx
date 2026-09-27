"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, LogOut } from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/brand/logo"
import { UserAvatar } from "@/components/bz/primitives"
import { navItems } from "@/lib/navigation"
import { currentUser } from "@/lib/mock-data"
import { signOut } from "@/lib/services"
import { cn } from "@/lib/utils"

export function SidebarContent({ onNavigate, layoutId }: { onNavigate?: () => void; layoutId: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)

  async function handleSignOut() {
    setLeaving(true)
    await signOut()
    toast.success("Você saiu da sua conta.")
    router.push("/login")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-6">
        <Link href="/dashboard" onClick={onNavigate} className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo />
        </Link>
      </div>

      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">Menu</p>
        <ul className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * index, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    active ? "text-foreground" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={layoutId}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-xl border border-primary/25 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_22%,transparent),color-mix(in_oklab,var(--primary)_6%,transparent))] shadow-[0_0_24px_-10px_var(--primary-glow)]"
                    >
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-neon shadow-[0_0_10px_var(--neon)]" />
                    </motion.span>
                  )}
                  <Icon
                    aria-hidden
                    className={cn(
                      "relative size-[18px] transition-colors",
                      active ? "text-neon" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="relative font-medium">{item.label}</span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <div className="m-3 flex items-center gap-3 rounded-2xl border border-border bg-white/[0.02] p-3">
        <UserAvatar name={currentUser.username} online={currentUser.online} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{currentUser.username}</p>
          <p className="flex items-center gap-1.5 text-xs text-success">
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
            Online
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={leaving}
          aria-label="Sair da conta"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {leaving ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
        </button>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] border-r border-border bg-[#07050c]/70 backdrop-blur-xl lg:block">
      <SidebarContent layoutId="nav-active-desktop" />
    </aside>
  )
}
