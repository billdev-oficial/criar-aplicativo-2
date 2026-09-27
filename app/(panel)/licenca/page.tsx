import type { Metadata } from "next"
import { LicenseView } from "@/components/panel/views/license-view"

export const metadata: Metadata = { title: "Minha Licença" }

export default function LicensePage() {
  return <LicenseView />
}
