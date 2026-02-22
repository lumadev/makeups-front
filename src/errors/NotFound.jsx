import { useNavigate, useOutletContext } from "react-router-dom"
import { IconArrowLeft, IconGhost, IconHome } from '@tabler/icons-react'

function NotFound() {
  const navigate = useNavigate()
  const { isDark } = useOutletContext() || {}

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center">
      {/* Elemento Visual */}
      <div className="relative mb-12">
        <IconGhost 
          size={120} 
          stroke={1.2}
          className={`${isDark ? 'text-slate-700' : 'text-slate-200'} animate-pulse`} 
        />
        <h1 className={`absolute inset-0 flex items-center justify-center text-6xl font-black opacity-40
          ${isDark ? 'text-blue-500' : 'text-slate-400'}`}>
          404
        </h1>
      </div>

      {/* Texto Minimalista */}
      <h2 className={`text-xl font-medium mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Oops! Essa página não existe ou foi movida.
      </h2>
      
      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95
            ${isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm'}`}
        >
          <IconArrowLeft size={20} />
          Voltar anterior
        </button>

        <button
          onClick={() => navigate('/')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95
            ${isDark 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-slate-900 hover:bg-black text-white'}`}
        >
          <IconHome size={20} />
          Início do Sistema
        </button>
      </div>
    </div>
  )
}

export default NotFound