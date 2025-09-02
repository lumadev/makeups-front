import { useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login } from '@/features/auth/authService'
import { ToastContainer } from 'react-toastify'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onClickLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    // shows warning if login takes more than 5s
    const warningInterval = setInterval(() => {
      toast.warn("O login está demorando mais do que o normal...")
    }, 5000)

    try {
      const formData = { username, password }
      const res = await login(formData)

      const { token, name, type } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("name", name)
      localStorage.setItem("userType", type) 

      toast("Login feito com sucesso", { 
        type: 'success'
      })

      // reboot lastRequestHour
      const now = new Date()
      localStorage.setItem("lastRequestHour", now.toISOString())

      // redirect by user permission
      if (type === 'restricted') {
        navigate('/piadas')
      } else {
        navigate('/reposicoes')
      }
    } catch {
      toast("Credenciais inválidas", { 
        type: 'error'
      })
    } finally {
      clearInterval(warningInterval)
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
                name="username"
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
    </div>
  )
}

export default Login
