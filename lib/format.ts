const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
})

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
})

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))
export const formatDateTime = (iso: string) => dateTimeFormatter.format(new Date(iso))

export const maskKey = (key: string) => key.replace(/[A-Z0-9]/g, "•")

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function formatLicenseKey(raw: string) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16)
  return clean.match(/.{1,4}/g)?.join("-") ?? ""
}
