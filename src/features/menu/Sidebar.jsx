import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"

import {
  IconSchool,
  IconUser,
  IconCheck,
  IconMenu2,
  IconX,
  IconCalendarEvent
} from '@tabler/icons-react'

import ItemMenu from './ItemMenu'
import musicImg from '../../assets/musica.jpg'
import { IconJoker } from '@tabler/icons-react'
import { IconMusic } from '@tabler/icons-react'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState("")

  useEffect(() => {
    const storedName = localStorage.getItem("name")
    const storedUserType = localStorage.getItem("userType")

    if (storedName) {
      setUserName(storedName)
    }
    if (storedUserType) {
      setUserType(storedUserType)
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    
    navigate('/login')
  }

  const menuItems = [
    { title: "Reposições", path: "/reposicoes", icon: <IconSchool size={20} />, evenodd: "true" },
    { title: "Concluídas", path: "/reposicoes-concluidas", icon: <IconCheck size={20} />, evenodd: "true" },
    { title: "Alunos", path: "/alunos", icon: <IconUser size={20} /> },
    { title: "Músicas de Alunos", path: "/musicas-alunos", icon: <IconMusic size={20} /> },
    { title: "Datas de Evento", path: "/datas-de-evento", icon: <IconCalendarEvent size={20} /> },
    { title: "Piadas", path: "/piadas", icon: <IconJoker size={20} /> },
  ]

  // filter items by user type
  const filteredMenu = menuItems.filter(item => {
    if (item.title === "Piadas") return true // always visible
    
    return userType === "admin" || userType === "full"
  })

  return (
    <>
      {/* hamburger button on mobile */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white shadow-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      )}

      {/* sidebar */}
      <div
        id="sidebar"
        className={`
          fixed top-0 left-0 bg-gray-900 min-h-screen shadow-2xl border-r border-gray-800 px-5
          transition-all duration-300 ease-in-out
          ${isMobile ? 'w-60' : 'w-60 md:w-60 lg:w-60'}
          ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          overflow-x-hidden
          z-40
          ${!isMobile ? 'opacity-100 translate-x-0' : ''}
          ${isMobile ? 'transition-transform transition-opacity' : ''}
        `}
      >
        <div className="md:space-y-10 mt-10">
          <Link to="/reposicoes">
            <h1 className="hidden md:block font-bold text-xl mb-6 text-center text-white">
              Reposições
            </h1>
          </Link>

          {/* profile */}
          <div id="profile">
            <div>
              <img
                src={musicImg}
                alt="Music"
                className="rounded-full mx-auto opacity-50 border-2 ring-1 ring-teal-400"
              />
              <div className="flex justify-center items-center mt-4">
                <h2 className="font-medium text-sm md:text-base text-center text-teal-400">
                  {userName || "Usuário"}
                </h2>
                <a 
                  href="#" 
                  onClick={handleLogout} 
                  className="ml-2 text-white hover:underline"
                >
                  Sair
                </a>
              </div>
              { userType === 'admin' && (
                <p className="text-sm text-gray-500 text-center">Administrador</p>
              )}
            </div>
          </div>

          {/* menu */}
          <div id="menu" className="flex flex-col space-y-2">
            {filteredMenu.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="group"
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <ItemMenu
                  title={item.title}
                  icon={item.icon}
                  evenodd={item.evenodd}
                  active={location.pathname === item.path}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* opacity mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Sidebar
