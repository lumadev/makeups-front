import { useState, useEffect } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'

// Função utilitária para pegar o tema inicial
const getInitialTheme = () => {
  if (typeof window === 'undefined') return false // SSR fallback
  const saved = localStorage.getItem('theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function ThemeButton({ className = "" }) {
  const [isDark, setIsDark] = useState(getInitialTheme)

  // Aplica o tema no <html> sempre que mudar
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div
      onClick={() => setIsDark(!isDark)}
      className={`flex items-center gap-2 pl-3 py-3 rounded-md w-full text-white text-sm font-medium transition-colors duration-200 hover:bg-white/10 cursor-pointer ${className}`}
      role="button"
    >
      {isDark ? (
        <>
          <IconSun size={20} strokeWidth={2} />
          <span className="text-sm font-normal">Tema Claro</span>
        </>
      ) : (
        <>
          <IconMoon size={20} strokeWidth={2} />
          <span className="text-sm font-normal">Tema Escuro</span>
        </>
      )}
    </div>
  )
}

export default ThemeButton