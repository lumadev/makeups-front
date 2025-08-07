import { useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { ToastContainer } from 'react-toastify'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onClickLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = { username, password }
      const res = await login(formData)
      const token = res.data.token

      localStorage.setItem("token", token) 

      toast("Login feito com sucesso", { 
        type: 'success'
      })

      // reboot lastRequestHour
      const now = new Date()
      localStorage.setItem("lastRequestHour", now.toISOString())

      navigate('/reposicoes')
    } catch {
      toast("Credenciais inválidas", { 
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen dark:bg-gray-900">
      <div className="w-full max-w-md px-6 flex flex-col justify-center min-h-screen">
        <div className="mt-12 mx-auto w-full max-w-sm">
          <h1 className="text-4xl font-bold text-zinc-950 mb-6">
            Sistema de Reposições
          </h1>

          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-zinc-950 mb-1">
                Usuário
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white dark:bg-transparent dark:border-zinc-800 px-4 py-3 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-zinc-950 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white dark:bg-transparent dark:border-zinc-800 px-4 py-3 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3 text-sm font-medium text-white rounded-lg transition-colors ${
                loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500"
              }`}
              onClick={onClickLogin}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        </div>

        <ToastContainer autoClose={3000} />
      </div>

      <p className="mt-16 text-sm text-zinc-950 dark:text-white text-center">
        Formulário de autenticação inspirado no&nbsp;
        <a
          href="https://horizon-ui.com/shadcn-ui?ref=twcomponents"
          target="_blank"
          className="text-teal-500 font-bold"
          rel="noreferrer"
        >
          Horizon UI Boilerplate
        </a>
      </p>
    </div>
  )
}

export default Login
