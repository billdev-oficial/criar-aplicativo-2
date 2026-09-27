export type AccountStatus = "active" | "suspended"
export type LicenseStatus = "active" | "expired" | "inactive"
export type HwidStatus = "linked" | "unlinked"
export type ProductStatus = "operational" | "maintenance" | "offline"
export type TicketStatus = "open" | "pending" | "resolved"
export type TicketPriority = "low" | "medium" | "high"

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
  status: AccountStatus
  online: boolean
  hwid: string
  hwidStatus: HwidStatus
}

export interface LicenseEvent {
  id: string
  title: string
  description: string
  date: string
  type: "purchase" | "activation" | "hwid" | "reminder" | "expiration"
  upcoming?: boolean
}

export interface License {
  key: string
  product: string
  plan: string
  status: LicenseStatus
  activatedAt: string
  expiresAt: string
  totalDays: number
  daysRemaining: number
  hwid: string
  timeline: LicenseEvent[]
}

export interface Product {
  name: string
  version: string
  status: ProductStatus
  channel: "Stable" | "Beta"
  size: string
  updatedAt: string
  checksum: string
}

export interface ChangelogEntry {
  version: string
  date: string
  channel: "Stable" | "Beta"
  items: string[]
}

export interface TicketMessage {
  id: string
  author: "user" | "support"
  name: string
  content: string
  date: string
}

export interface Ticket {
  id: string
  subject: string
  category: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
  messages: TicketMessage[]
}

export interface Session {
  id: string
  device: string
  location: string
  ip: string
  lastActive: string
  current: boolean
  kind: "desktop" | "mobile"
}

export interface AppNotification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "license" | "update" | "security" | "support"
}

export interface HwidEvent {
  id: string
  action: string
  date: string
  hwid: string
}

export type ActivationResult =
  | { ok: true; product: string; plan: string; durationDays: number; expiresAt: string }
  | { ok: false; code: "invalid_format" | "not_found" | "already_used"; message: string }
