import { currentLicense, currentUser } from "./mock-data"
import type { ActivationResult, Ticket, TicketPriority, User } from "./types"

/**
 * Mock service layer. Each function mirrors the shape of a future API call,
 * so swapping to real endpoints only requires changing these bodies.
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const LICENSE_KEY_PATTERN = /^[A-Z0-9]{4}(-[A-Z0-9]{4}){3}$/

export async function signIn(input: { identifier: string; password: string; remember: boolean }): Promise<User> {
  await wait(1200)
  if (input.password.length < 6) throw new Error("Usuário ou senha incorretos.")
  return currentUser
}

export async function signUp(input: { username: string; email: string; password: string }): Promise<User> {
  await wait(1400)
  if (input.username.toLowerCase() === "admin") throw new Error("Este nome de usuário já está em uso.")
  return { ...currentUser, username: input.username, email: input.email }
}

export async function signOut() {
  await wait(300)
}

export async function requestPasswordReset(email: string) {
  await wait(1000)
  return { sentTo: email }
}

export async function activateLicenseKey(key: string): Promise<ActivationResult> {
  await wait(1800)
  if (!LICENSE_KEY_PATTERN.test(key)) {
    return { ok: false, code: "invalid_format", message: "O formato da key é inválido. Use XXXX-XXXX-XXXX-XXXX." }
  }
  if (key.startsWith("USED")) {
    return { ok: false, code: "already_used", message: "Esta key já foi utilizada em outra conta." }
  }
  if (!key.startsWith("BZ")) {
    return { ok: false, code: "not_found", message: "Key não encontrada. Verifique se digitou corretamente." }
  }
  return {
    ok: true,
    product: currentLicense.product,
    plan: currentLicense.plan,
    durationDays: 30,
    expiresAt: "2026-10-27T18:40:00Z",
  }
}

export async function requestHwidReset() {
  await wait(1500)
  return { resetsRemaining: 0 }
}

export async function changePassword(input: { current: string; next: string }) {
  await wait(1200)
  if (input.current.length < 6) throw new Error("Senha atual incorreta.")
}

export async function updateAccount(input: { username: string; email: string }) {
  await wait(1000)
  return input
}

export async function revokeSession(id: string) {
  await wait(700)
  return id
}

export async function downloadProduct() {
  await wait(1600)
}

export async function createTicket(input: {
  subject: string
  category: string
  priority: TicketPriority
  message: string
}): Promise<Ticket> {
  await wait(1200)
  const now = new Date().toISOString()
  return {
    id: `TK-${1043 + Math.floor(Math.random() * 50)}`,
    subject: input.subject,
    category: input.category,
    priority: input.priority,
    status: "open",
    createdAt: now,
    updatedAt: now,
    messages: [{ id: "m1", author: "user", name: currentUser.username, content: input.message, date: now }],
  }
}

export async function replyToTicket(ticketId: string, content: string) {
  await wait(800)
  return { id: `${ticketId}-${Date.now()}`, content, date: new Date().toISOString() }
}
