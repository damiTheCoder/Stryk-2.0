"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  disableTransitionOnChange?: boolean
  attribute?: string
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: Theme
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored
    }
  } catch {}
  return null
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  disableTransitionOnChange = false,
  attribute = "class",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return getStoredTheme(storageKey) ?? defaultTheme
  })

  const resolvedTheme = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme
  }, [theme])

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (newTheme: Theme) => {
      const resolved = newTheme === "system" ? getSystemTheme() : newTheme

      if (attribute === "class") {
        root.classList.remove("light", "dark")
        root.classList.add(resolved)
      } else if (attribute.startsWith("data-")) {
        if (resolved) {
          root.setAttribute(attribute, resolved)
        } else {
          root.removeAttribute(attribute)
        }
      }

      root.style.colorScheme = resolved

      if (disableTransitionOnChange) {
        const style = document.createElement("style")
        style.setAttribute("data-next-theme", "")
        style.textContent = ",*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
        document.head.appendChild(style)
        requestAnimationFrame(() => {
          document.head.removeChild(style)
        })
      }
    }

    applyTheme(theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        const newResolved = getSystemTheme()
        if (attribute === "class") {
          root.classList.remove("light", "dark")
          root.classList.add(newResolved)
        } else if (attribute.startsWith("data-")) {
          root.setAttribute(attribute, newResolved)
        }
        root.style.colorScheme = newResolved
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, attribute, disableTransitionOnChange])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch {}
  }

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
