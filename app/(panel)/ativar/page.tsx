import type { Metadata } from "next"
import { ActivateView } from "@/components/panel/views/activate-view"

export const metadata: Metadata = { title: "Ativar Key" }

export default function ActivatePage() {
  return <ActivateView />
}
