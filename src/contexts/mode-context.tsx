"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

type AppMode = "vendor" | "customer"

interface ModeContextType {
  mode: AppMode
  setMode: (mode: AppMode) => void
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

const MODE_STORAGE_KEY = "app-mode"

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>("vendor")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MODE_STORAGE_KEY)
      if (stored === "vendor" || stored === "customer") {
        setModeState(stored)
      }
    } catch {}
  }, [])

  const setMode = useCallback((newMode: AppMode) => {
    setModeState(newMode)
    try {
      localStorage.setItem(MODE_STORAGE_KEY, newMode)
    } catch {}
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === "vendor" ? "customer" : "vendor"
      try {
        localStorage.setItem(MODE_STORAGE_KEY, next)
      } catch {}
      return next
    })
  }, [])

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (!context) {
    return {
      mode: "vendor" as AppMode,
      setMode: () => {},
      toggleMode: () => {},
    }
  }
  return context
}
