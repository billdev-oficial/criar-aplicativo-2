import type { Metadata } from "next"
import { DashboardView } from "@/components/panel/views/dashboard-view"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardPage() {
  return <DashboardView />
}
