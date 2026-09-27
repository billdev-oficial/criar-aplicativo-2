import type { Metadata } from "next"
import { ProfileView } from "@/components/panel/views/profile-view"

export const metadata: Metadata = { title: "Meu Perfil" }

export default function ProfilePage() {
  return <ProfileView />
}
