import { useNavigate, useOutletContext } from "react-router-dom"
import { MoveLeft, Ghost } from "lucide-react"

function NotFound() {
  const navigate = useNavigate()
  // Pegamos o contexto do dark mode direto do seu Layout, se necessário
  const { isDark } = useOutletContext() || {}

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Ícone Decorativo */}
      <div className="relative mb-6">
        <Ghost size={80} className={`${isDark ? 'text-slate-700' : 'text-slate-200'} animate-bounce`} />
        <span className={`absolute -bottom-2 -right-2 text-6xl font-bold opacity-20 
          ${isDark ? 'text-white' : 'text-slate-900'}`}>
          404
        </span>
      </div>

      {/* Texto de Erro */}
      <h1 className={`text-3xl md:text-4xl font-bold mb-4 
        ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
        Oops! Página não encontrada.
      </h1>

      {/* Atalho para Home */}
      <button 
        onClick={() => navigate('/home')}
        className={`mt-4 text-sm underline underline-offset-4 
          ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
      >
        Ir para a página inicial
      </button>
    </div>
  )
}

export default NotFound