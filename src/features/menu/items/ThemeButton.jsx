import { useState, useEffect } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'

function ThemeButton({ className = "" }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div
      onClick={() => setIsDark(!isDark)}
      // Removido mt-auto e pb-3 para ficar colado no Logout
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