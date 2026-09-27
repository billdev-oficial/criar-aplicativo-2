import type { Metadata } from "next"
import { SupportView } from "@/components/panel/views/support-view"

export const metadata: Metadata = { title: "Suporte" }

export default function SupportPage() {
  return <SupportView />
}
