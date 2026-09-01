import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from './features/menu/Sidebar'

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) return savedTheme === 'dark'

  return document.documentElement.classList.contains('dark')
}

function Layout({ hasMinWidth = false }) {
  const [isDark, setIsDark] = useState(getInitialDarkMode)

  useEffect(() => {
    // Função para verificar se o tema dark está ativo
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark'
      setIsDark(isDarkMode)
    }

    // Verifica ao montar o componente
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`flex flex-col md:flex-row min-h-screen md:h-screen transition-colors 
      duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
      
      {/* Sidebar */}
      <aside className={`w-full md:w-64 flex-shrink-0 transition-colors duration-300`}
      >
        <Sidebar />
      </aside>

      {/* Conteúdo Principal */}
      <main className={`md:flex-1 overflow-auto transition-colors duration-300 
          ${isDark ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
        <div className="pt-12 px-6 md:p-2">
          {hasMinWidth ? (
            <div className="min-w-[1200px]">
              <Outlet context={{ isDark }} />
            </div>
          ) : (
            <div className="max-w-[1600px] mx-auto">
              <Outlet context={{ isDark }} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Layout