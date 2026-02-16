import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { menuItems } from './constants/menuItems'
import { useMediaQuery } from './hooks/useMediaQuery'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { IconMenu2, IconX } from '@tabler/icons-react'

import ItemMenu from './ItemMenu'
import musicImg from '../../assets/musica.jpg'

const MOBILE_BREAKPOINT = '(max-width: 767px)'

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

  // handle escape key to close sidebar on mobile
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
    'fixed top-0 left-0 bg-gray-900 min-h-screen shadow-2xl border-r border-gray-800 px-5',
    'transition-all duration-300 ease-in-out w-60 overflow-x-hidden z-40',
    sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
    !isMobile && 'opacity-100 translate-x-0',
  ].filter(Boolean).join(' ')

  return (
    <>
      {isMobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white shadow-md"
          aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      )}

      <div id="sidebar" className={sidebarClasses}>
        <div className="md:space-y-10 mt-10">
          <Link to="/reposicoes">
            <h1 className="hidden md:block font-bold text-xl mb-6 text-center text-white">
              Reposições
            </h1>
          </Link>

          <div id="profile">
            <div>
              <img
                src={musicImg}
                alt="Música"
                className="rounded-full mx-auto opacity-50 border-2 ring-1 ring-teal-400"
              />
              <div className="flex justify-center items-center mt-4">
                <h2 className="font-medium text-sm md:text-base text-center text-teal-400">
                  {userName || 'Usuário'}
                </h2>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-2 text-white hover:underline bg-transparent border-none cursor-pointer p-0 font-inherit"
                >
                  Sair
                </button>
              </div>
              {userType === 'admin' && (
                <p className="text-sm text-gray-500 text-center">Administrador</p>
              )}
            </div>
          </div>

          <nav id="menu" className="flex flex-col space-y-2" aria-label="Menu principal">
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
                  highlight={item.highlight}
                  active={location.pathname === item.path}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Sidebar
