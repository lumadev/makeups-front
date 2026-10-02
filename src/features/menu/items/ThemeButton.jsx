import { IconSun, IconMoon } from '@tabler/icons-react'
import { useDarkMode } from '@/common/hooks/useDarkMode'

function ThemeButton({ className = "" }) {
  const [isDark, toggleDarkMode] = useDarkMode()

  return (
    <div
      onClick={toggleDarkMode}
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