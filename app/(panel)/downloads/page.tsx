import type { Metadata } from "next"
import { DownloadsView } from "@/components/panel/views/downloads-view"

export const metadata: Metadata = { title: "Downloads" }

export default function DownloadsPage() {
  return <DownloadsView />
}
