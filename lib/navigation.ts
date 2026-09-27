import {
  Cpu,
  Download,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/perfil", label: "Meu Perfil", icon: UserRound },
  { href: "/ativar", label: "Ativar Key", icon: KeyRound },
  { href: "/licenca", label: "Minha Licença", icon: ShieldCheck },
  { href: "/hwid", label: "HWID", icon: Cpu },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/suporte", label: "Suporte", icon: LifeBuoy },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
]
