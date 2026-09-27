"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { LogoMark } from "@/components/brand/logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--primary-glow)_0%,transparent_62%)] opacity-35 blur-3xl"
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="relative w-full max-w-[420px]"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <LogoMark className="size-14 rounded-2xl" />
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.34em] text-muted-foreground">BzCheats</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-gradient">BzAimDDT</p>
        </motion.div>

        <motion.section
          variants={{ hidden: { opacity: 0, y: 16, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent"
          />
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </motion.section>

        {footer && (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            {footer}
          </motion.div>
        )}

        <motion.p
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70"
        >
          <ShieldCheck className="size-3.5" aria-hidden />
          Conexão protegida com criptografia TLS
        </motion.p>
      </motion.div>
    </main>
  )
}
