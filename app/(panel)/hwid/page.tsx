import type { Metadata } from "next"
import { HwidView } from "@/components/panel/views/hwid-view"

export const metadata: Metadata = { title: "HWID" }

export default function HwidPage() {
  return <HwidView />
}
