import { useEffect, useState } from "react"

const THEME_KEY = "theme"
const THEME_EVENT = "themechange"

const getIsDark = () => {
  if (typeof window === "undefined") return false

  const saved = localStorage.getItem(THEME_KEY)
  if (saved) return saved === "dark"

  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark)
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light")
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: isDark }))
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getIsDark)

  useEffect(() => {
    const handleThemeChange = (e) => setIsDark(e.detail)
    const handleStorage = (e) => {
      if (e.key === THEME_KEY) setIsDark(e.newValue === "dark")
    }

    window.addEventListener(THEME_EVENT, handleThemeChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener(THEME_EVENT, handleThemeChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const toggleDarkMode = () => applyTheme(!isDark)

  return [isDark, toggleDarkMode]
}
