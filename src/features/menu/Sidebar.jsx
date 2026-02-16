import { useState, useEffect, useMemo } from 'react'
import { menuItems } from './constants/menuItems'
import { useMediaQuery } from './hooks/useMediaQuery'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { IconMenu2, IconX } from '@tabler/icons-react'

import MenuItems from './items/MenuItems'
import SidebarHeader from './header/SidebarHeader'
import UserProfile from './header/UserProfile'

const MOBILE_BREAKPOINT = '(max-width: 767px)'
const SIDEBAR_BG = '#1A1D24'

function Sidebar() {
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

      <div id="sidebar" className={sidebarClasses} style={{ backgroundColor: SIDEBAR_BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="flex flex-col h-full pt-8 pb-6">
          <SidebarHeader onNavigate={() => isMobile && setSidebarOpen(false)} />

          <UserProfile userName={userName} userType={userType} />

          <MenuItems
            items={filteredMenu}
            onItemClick={() => isMobile && setSidebarOpen(false)}
          />
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
