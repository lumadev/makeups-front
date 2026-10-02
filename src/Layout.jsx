import { Outlet } from "react-router-dom"
import Sidebar from './features/menu/Sidebar'
import { useDarkMode } from "@/common/hooks/useDarkMode"

function Layout({ hasMinWidth = false }) {
  const [isDark] = useDarkMode()

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