import { useNavigate, useOutletContext } from "react-router-dom"
import { IconArrowLeft, IconHome } from '@tabler/icons-react'
import MiniPacman from "./MiniPacman"

function NotFound() {
  const navigate = useNavigate()
  const { isDark } = useOutletContext() || {}

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] 
      px-6 text-center my-10"
    >
      <MiniPacman isDark={isDark} />
      
      {/* Texto Minimalista */}
      <h2 className={`text-xl font-medium mt-10 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Oops! Essa página não existe ou foi movida.
      </h2>
      
      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition transform duration-150
            focus:outline-none focus:ring-2 focus:ring-offset-1 
            ${isDark 
              ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 focus:ring-slate-500' 
              : 'bg-white text-slate-700 border border-slate-300 shadow-sm hover:bg-slate-50 focus:ring-slate-300'}
            active:scale-95`}
        >
          <IconArrowLeft size={20} />
          Voltar anterior
        </button>

        <button
          onClick={() => navigate('/')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition transform duration-150
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${isDark
              ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400'
              : 'bg-white text-slate-900 border border-slate-300 shadow-sm hover:bg-slate-50 focus:ring-slate-300'}
            active:scale-95`}
        >
          <IconHome size={20} />
          Início do Sistema
        </button>
      </div>
    </div>
  )
}

export default NotFound