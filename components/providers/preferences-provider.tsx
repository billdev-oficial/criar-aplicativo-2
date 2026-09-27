"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { MotionConfig } from "framer-motion"

export type ThemeName = "aizen" | "void"

interface Preferences {
  theme: ThemeName
  animations: boolean
  effects: boolean
  setTheme: (theme: ThemeName) => void
  setAnimations: (value: boolean) => void
  setEffects: (value: boolean) => void
}

const PreferencesContext = createContext<Preferences | null>(null)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("aizen")
  const [animations, setAnimations] = useState(true)
  const [effects, setEffects] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.motion = animations ? "on" : "off"
    root.dataset.effects = effects ? "on" : "off"
  }, [theme, animations, effects])

  const value = useMemo(
    () => ({ theme, animations, effects, setTheme, setAnimations, setEffects }),
    [theme, animations, effects],
  )

  return (
    <PreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion={animations ? "user" : "always"}>{children}</MotionConfig>
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error("usePreferences must be used within PreferencesProvider")
  return context
}
