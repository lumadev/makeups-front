import { useNavigate, useOutletContext } from "react-router-dom"
import { IconArrowLeft, IconGhost, IconHome } from '@tabler/icons-react'

function NotFound() {
  const navigate = useNavigate()
  const { isDark } = useOutletContext() || {}

  return (
    <div className={`flex flex-col items-center justify-center h-full min-h-[70vh] px-6 text-center transition-colors duration-300
      ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* Elemento Visual */}
      <div className="relative mb-10">
        <IconGhost 
          size={140} 
          stroke={1}
          className={`${isDark ? 'text-slate-700' : 'text-slate-200'} animate-pulse`} 
        />
        <h1 className={`absolute inset-0 flex items-center justify-center text-7xl font-black tracking-tighter
          ${isDark ? 'text-blue-500/20' : 'text-slate-900/10'}`}>
          404
        </h1>
      </div>

      {/* Mensagem */}
      <div className="space-y-2 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold italic">
          Página não encontrada
        </h2>
        <p className={`text-base max-w-sm mx-auto font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          O recurso que você procura não existe ou foi removido do sistema de reposições.
        </p>
      </div>
      
      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
        {/* Botão Voltar - Estilo Outline/Ghost */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 border-2
            ${isDark 
              ? 'bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800' 
              : 'bg-transparent border-slate-300 text-slate-600 hover:bg-slate-100'}`}
        >
          <IconArrowLeft size={22} />
          Voltar anterior
        </button>

        {/* Botão Início - Estilo Sólido (Corrigido para não sumir no Light Mode) */}
        <button
          onClick={() => navigate('/home')}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 shadow-md
            ${isDark 
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
              : 'bg-[#0f172a] hover:bg-slate-800 text-white shadow-slate-300'}`}
        >
          <IconHome size={22} />
          Início do Sistema
        </button>
      </div>
    </div>
  )
}

export default NotFound