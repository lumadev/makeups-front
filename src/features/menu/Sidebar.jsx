import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { menuItems } from './constants/menuItems'
import { useMediaQuery } from './hooks/useMediaQuery'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { IconMenu2, IconX, IconMusic, IconLogout } from '@tabler/icons-react'

import ItemMenu from './ItemMenu'

const MOBILE_BREAKPOINT = '(max-width: 767px)'
const SIDEBAR_BG = '#1A1D24'
const PROFILE_BG = '#272A32'
const PRIMARY_ORANGE = '#FF8C00'

function getInitials(name) {
  if (!name || typeof name !== 'string') return '??'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    if (!isMobile) setSidebarOpen(true)
  }, [isMobile])

  useEffect(() => {
    const name = localStorage.getItem(STORAGE_KEYS.NAME)
    const type = localStorage.getItem(STORAGE_KEYS.USER_TYPE)

    if (name) setUserName(name)
    if (type) setUserType(type)
  }, [])

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return
    const onEscape = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [isMobile, sidebarOpen])

  const handleLogout = (e) => {
    if (e?.preventDefault) e.preventDefault()

    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.NAME)
    localStorage.removeItem(STORAGE_KEYS.USER_TYPE)
    localStorage.removeItem(STORAGE_KEYS.LAST_REQUEST_HOUR)

    navigate('/login')
  }

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.allowedRoles == null) return true
      return item.allowedRoles.includes(userType)
    })
  }, [userType])

  const sidebarClasses = [
    'fixed top-0 left-0 min-h-screen shadow-2xl border-r border-gray-800/50 px-5',
    'transition-all duration-300 ease-in-out w-60 overflow-x-hidden z-40',
    sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
    !isMobile && 'opacity-100 translate-x-0',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      {isMobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg text-white shadow-md"
          style={{ backgroundColor: SIDEBAR_BG }}
          aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      )}

      <div id="sidebar" className={sidebarClasses} style={{ backgroundColor: SIDEBAR_BG }}>
        <div className="flex flex-col h-full pt-8 pb-6">
          {/* Logo */}
          <Link
            to="/reposicoes"
            className="flex items-center gap-3 mb-8"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
              style={{ backgroundColor: PRIMARY_ORANGE }}
            >
              <IconMusic size={24} className="text-white" strokeWidth={2} />
            </div>
            <h1 className="hidden md:block font-bold text-xl text-white">Reposições</h1>
          </Link>

          {/* Perfil do usuário */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-6"
            style={{ backgroundColor: PROFILE_BG }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-white font-semibold text-sm"
              style={{ backgroundColor: PRIMARY_ORANGE }}
            >
              {getInitials(userName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white text-sm truncate">{userName || 'Usuário'}</p>
              {userType === 'admin' && (
                <p className="text-xs text-gray-400">Administrador</p>
              )}
            </div>
          </div>

          {/* Menu */}
          <nav id="menu" className="flex-1 flex flex-col gap-1" aria-label="Menu principal">
            {filteredMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group"
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <ItemMenu
                  title={item.title}
                  icon={item.icon}
                  active={location.pathname === item.path}
                />
              </Link>
            ))}

            {/* Sair */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-white hover:bg-white/5 transition-colors duration-200 mt-auto"
            >
              <IconLogout size={20} strokeWidth={2} />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </nav>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Sidebar
