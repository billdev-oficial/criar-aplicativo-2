import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { AmbientBackground } from "@/components/effects/ambient-background"
import { PreferencesProvider } from "@/components/providers/preferences-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: { default: "BzAimDDT — BzCheats", template: "%s · BzAimDDT" },
  description:
    "Painel premium da BzCheats para gerenciar sua licença BzAimDDT, HWID, downloads e suporte.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#08060d",
  colorScheme: "dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${geist.variable} ${geistMono.variable} bg-background`}
      data-motion="on"
      data-effects="on"
      data-theme="aizen"
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <PreferencesProvider>
          <AmbientBackground />
          {children}
          <Toaster theme="dark" position="top-right" closeButton />
        </PreferencesProvider>
      </body>
    </html>
  )
}
