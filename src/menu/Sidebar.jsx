import { Link } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom'

import {
  IconSchool,
  IconUser,
  IconCheck
} from '@tabler/icons-react'

import ItemMenu from './ItemMenu'

import musicImg from '../assets/musica.jpg'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div
      id="sidebar"
      className="fixed top-0 left-0 bg-gray-900 h-screen md:block shadow-2xl border-r border-gray-800 px-5 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
      x-show="sidenav"
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
        </div>
      </div>
    </div>
  )
}

export default Sidebar