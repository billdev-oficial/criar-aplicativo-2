import { Header } from "@/components/panel/header"
import { PageTransition } from "@/components/panel/page-transition"
import { Sidebar } from "@/components/panel/sidebar"

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <Sidebar />
      <div className="lg:pl-[264px]">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
