import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

import ItemMenu from './ItemMenu'

import musicImg from '../assets/musica.jpg';

const svgs = {
  class: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z',
  students: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'
}

function Sidebar() {
  const location = useLocation()

  return (
    <div
      id="sidebar"
      className="bg-gray-900 h-screen md:block shadow-2xl border-r border-gray-800 px-5 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
      x-show="sidenav"
    >
      <div className="md:space-y-10 mt-10">
        <h1 className="hidden md:block font-bold text-xl mb-6 text-center text-white">
          Reposições
        </h1>
        <div id="profile">
          <div>
            <img
              src={musicImg}
              alt="Music"
              className="rounded-full mx-auto opacity-50 border-2 ring-1 ring-teal-400"
            />

            <h2 className="mt-4 font-medium text-sm md:text-base text-center text-teal-400">
              Weslley Joanes
            </h2>
            <p className="text-sm text-gray-500 text-center">Administrador</p>
          </div>
        </div>

        {/* Sidebar menu */}
        <div id="menu" className="flex flex-col space-y-2">
          <Link to="/reposicoes" className="group">
            <ItemMenu 
              title="Reposições"
              evenodd="true"
              svg={svgs.class}
              active={location.pathname === '/reposicoes'}
            />
          </Link>
          <Link to="/alunos" className="group">
            <ItemMenu 
              title="Alunos"
              svg={svgs.students}
              active={location.pathname === '/alunos'}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar