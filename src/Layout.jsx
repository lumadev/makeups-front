import { Outlet } from "react-router-dom"
import Sidebar from './features/menu/Sidebar'

function Layout() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-52 flex-shrink-0 bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Conteúdo com scroll horizontal */}
      <main className="flex-1 p-4 md:ml-10 overflow-x-auto overflow-y-auto pt-16 md:pt-0">
        <div className="min-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
