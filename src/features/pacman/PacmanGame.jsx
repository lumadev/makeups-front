import { useNavigate, useOutletContext } from "react-router-dom"
import { IconArrowLeft, IconHome } from '@tabler/icons-react'

import MiniPacman from "@/errors/MiniPacman.jsx"

function PacmanGame() {
  const navigate = useNavigate()
  const { isDark } = useOutletContext() || {}

  return (
    <div
      className="flex flex-col items-center justify-center 
      min-h-[80vh] px-6 text-center my-10"
    >
      {/* Jogo */}
      <MiniPacman isDark={isDark} />

      {/* Título */}
      <h1
        className={`text-2xl font-bold mt-10 mb-4 ${
          isDark ? "text-yellow-400" : "text-yellow-600"
        }`}
      >
        Jogo do Pacman
      </h1>

      <p
        className={`text-sm mb-8 ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Divirta-se jogando enquanto faz uma pausa no sistema 🎮
      </p>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition transform duration-150
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${
              isDark
                ? "bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-300"
                : "bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-300"
            }
            active:scale-95`}
        >
          <IconHome size={20} />
          Voltar ao Sistema
        </button>
      </div>
    </div>
  )
}

export default PacmanGame