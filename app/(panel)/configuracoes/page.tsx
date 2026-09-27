import type { Metadata } from "next"
import { SettingsView } from "@/components/panel/views/settings-view"

export const metadata: Metadata = { title: "Configurações" }

export default function SettingsPage() {
  return <SettingsView />
}
