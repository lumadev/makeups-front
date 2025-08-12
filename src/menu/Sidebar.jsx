import { Link } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom'
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

import musicImg from '../assets/musica.jpg'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Detectar se é mobile baseado na largura da tela
  useEffect(() => {
    function handleResize() {
      const isNowMobile = window.innerWidth < 768
      setIsMobile(isNowMobile)
      setSidebarOpen(!isNowMobile) // aberto em desktop, fechado em mobile
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      {/* Botão hamburguer para abrir/fechar no mobile */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white shadow-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      )}

      <div
        id="sidebar"
        className={`
          fixed top-0 left-0 bg-gray-900 h-screen shadow-2xl border-r border-gray-800 px-5
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
          <h1 className="hidden md:block font-bold text-xl mb-6 text-center text-white">
            Reposições
          </h1>

          {/* Usuário logado e logout */}
          <div id="profile">
            <div>
              <img
                src={musicImg}
                alt="Music"
                className="rounded-full mx-auto opacity-50 border-2 ring-1 ring-teal-400"
              />

              <div className="flex justify-center items-center mt-4">
                <h2 className="font-medium text-sm md:text-base text-center text-teal-400">
                  Weslley Joanes
                </h2>
                <a 
                  href="#" 
                  onClick={handleLogout} 
                  className="ml-2 text-white hover:underline"
                >
                  Sair
                </a>
              </div>
              <p className="text-sm text-gray-500 text-center">Administrador</p>
            </div>
          </div>

          {/* Sidebar menu */}
          <div id="menu" className="flex flex-col space-y-2">
            <Link to="/reposicoes" className="group">
              <ItemMenu 
                title="Reposições"
                evenodd="true"
                icon={<IconSchool size={20} />}
                active={location.pathname === '/reposicoes'}
              />
            </Link>
            <Link to="/reposicoes-concluidas" className="group">
              <ItemMenu 
                title="Concluídas"
                evenodd="true"
                icon={<IconCheck size={20} />}
                active={location.pathname === '/reposicoes-concluidas'}
              />
            </Link>
            <Link to="/alunos" className="group">
              <ItemMenu 
                title="Alunos"
                icon={<IconUser size={20} />}
                active={location.pathname === '/alunos'}
              />
            </Link>
            <Link to="/datas-de-evento" className="group">
              <ItemMenu 
                title="Datas de Evento"
                icon={<IconCalendarEvent size={20} />}
                active={location.pathname === '/datas-de-evento'}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Fundo escuro semi-transparente no mobile quando o menu está aberto */}
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
