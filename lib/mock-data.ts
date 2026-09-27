import type {
  AppNotification,
  ChangelogEntry,
  HwidEvent,
  License,
  Product,
  Session,
  Ticket,
  User,
} from "./types"

export const currentUser: User = {
  id: "usr_7f3a91",
  username: "Shadow",
  email: "shadow@bzcheats.gg",
  createdAt: "2026-03-04T14:22:00Z",
  status: "active",
  online: true,
  hwid: "7F3A-9C2E-B41D-E806",
  hwidStatus: "linked",
}

export const currentLicense: License = {
  key: "BZAI-7K2P-QX9M-4RTW",
  product: "BzAimDDT",
  plan: "Premium",
  status: "active",
  activatedAt: "2026-09-12T18:40:00Z",
  expiresAt: "2026-10-12T18:40:00Z",
  totalDays: 30,
  daysRemaining: 27,
  hwid: currentUser.hwid,
  timeline: [
    {
      id: "ev1",
      title: "Compra confirmada",
      description: "Plano Premium de 30 dias adquirido.",
      date: "2026-09-12T18:32:00Z",
      type: "purchase",
    },
    {
      id: "ev2",
      title: "Licença ativada",
      description: "License Key ativada na sua conta.",
      date: "2026-09-12T18:40:00Z",
      type: "activation",
    },
    {
      id: "ev3",
      title: "HWID vinculado",
      description: "Dispositivo principal vinculado à licença.",
      date: "2026-09-12T18:41:00Z",
      type: "hwid",
    },
    {
      id: "ev4",
      title: "Lembrete de renovação",
      description: "Você será notificado 3 dias antes da expiração.",
      date: "2026-10-09T18:40:00Z",
      type: "reminder",
      upcoming: true,
    },
    {
      id: "ev5",
      title: "Expiração",
      description: "Fim do período atual da licença.",
      date: "2026-10-12T18:40:00Z",
      type: "expiration",
      upcoming: true,
    },
  ],
}

export const product: Product = {
  name: "BzAimDDT",
  version: "v1.0.0",
  status: "operational",
  channel: "Stable",
  size: "48,2 MB",
  updatedAt: "2026-09-10T12:00:00Z",
  checksum: "a3f9c1e07b5d42e8f61c9a0b7d3e5f2184c6a9e0d7b1f3c5e8a2d4f6b9c0e1a7",
}

export const changelog: ChangelogEntry[] = [
  {
    version: "v1.0.0",
    date: "2026-09-10T12:00:00Z",
    channel: "Stable",
    items: ["Initial release", "Performance improvements", "UI improvements", "Bug fixes"],
  },
]

export const tickets: Ticket[] = [
  {
    id: "TK-1042",
    subject: "Dúvida sobre troca de HWID",
    category: "HWID",
    status: "open",
    priority: "medium",
    createdAt: "2026-09-25T20:14:00Z",
    updatedAt: "2026-09-26T09:02:00Z",
    messages: [
      {
        id: "m1",
        author: "user",
        name: "Shadow",
        content:
          "Olá! Vou trocar de placa-mãe na próxima semana. Preciso abrir um ticket para resetar o HWID ou consigo fazer pelo painel?",
        date: "2026-09-25T20:14:00Z",
      },
      {
        id: "m2",
        author: "support",
        name: "Equipe BzCheats",
        content:
          "Oi, Shadow! Você pode fazer o reset direto na página HWID do painel. Seu plano inclui 1 reset a cada 30 dias. Se precisar de outro, é só responder aqui.",
        date: "2026-09-26T09:02:00Z",
      },
    ],
  },
  {
    id: "TK-1037",
    subject: "Download interrompido na instalação",
    category: "Técnico",
    status: "pending",
    priority: "high",
    createdAt: "2026-09-20T15:40:00Z",
    updatedAt: "2026-09-21T11:18:00Z",
    messages: [
      {
        id: "m1",
        author: "user",
        name: "Shadow",
        content: "O download para em 80% e o instalador fecha sozinho.",
        date: "2026-09-20T15:40:00Z",
      },
      {
        id: "m2",
        author: "support",
        name: "Equipe BzCheats",
        content:
          "Pode verificar se o antivírus está colocando o arquivo em quarentena? Envie também o checksum SHA-256 do arquivo baixado.",
        date: "2026-09-21T11:18:00Z",
      },
    ],
  },
  {
    id: "TK-1021",
    subject: "Confirmação de pagamento",
    category: "Financeiro",
    status: "resolved",
    priority: "low",
    createdAt: "2026-09-12T18:50:00Z",
    updatedAt: "2026-09-12T19:30:00Z",
    messages: [
      {
        id: "m1",
        author: "user",
        name: "Shadow",
        content: "Paguei o plano Premium, mas ainda não recebi a key por email.",
        date: "2026-09-12T18:50:00Z",
      },
      {
        id: "m2",
        author: "support",
        name: "Equipe BzCheats",
        content: "Pagamento confirmado e key reenviada. Ela já aparece ativa no seu painel.",
        date: "2026-09-12T19:30:00Z",
      },
    ],
  },
]

export const sessions: Session[] = [
  {
    id: "s1",
    device: "Windows 11 · Chrome",
    location: "São Paulo, BR",
    ip: "189.44.•••.12",
    lastActive: "Agora",
    current: true,
    kind: "desktop",
  },
  {
    id: "s2",
    device: "iPhone · Safari",
    location: "São Paulo, BR",
    ip: "177.12.•••.88",
    lastActive: "Há 3 horas",
    current: false,
    kind: "mobile",
  },
  {
    id: "s3",
    device: "Windows 10 · Edge",
    location: "Campinas, BR",
    ip: "201.83.•••.40",
    lastActive: "Há 2 dias",
    current: false,
    kind: "desktop",
  },
]

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "Resposta no ticket TK-1042",
    description: "A equipe respondeu sua dúvida sobre HWID.",
    time: "Há 2 horas",
    read: false,
    type: "support",
  },
  {
    id: "n2",
    title: "BzAimDDT v1.0.0 disponível",
    description: "Nova versão estável pronta para download.",
    time: "Há 1 dia",
    read: false,
    type: "update",
  },
  {
    id: "n3",
    title: "Novo login detectado",
    description: "iPhone · Safari em São Paulo, BR.",
    time: "Há 3 horas",
    read: true,
    type: "security",
  },
  {
    id: "n4",
    title: "Licença ativada",
    description: "BzAimDDT Premium ativo por 30 dias.",
    time: "12/09/2026",
    read: true,
    type: "license",
  },
]

export const hwidHistory: HwidEvent[] = [
  { id: "h1", action: "HWID vinculado", date: "2026-09-12T18:41:00Z", hwid: "7F3A-9C2E-B41D-E806" },
  { id: "h2", action: "Reset solicitado", date: "2026-06-02T10:15:00Z", hwid: "2B8D-41FA-C07E-993A" },
  { id: "h3", action: "HWID vinculado", date: "2026-03-04T14:30:00Z", hwid: "2B8D-41FA-C07E-993A" },
]
