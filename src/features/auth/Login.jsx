import { useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login } from '@/features/auth/authService'
import { ToastContainer } from 'react-toastify'

import TextInput from "@/components/inputs/TextInput"
import PasswordInput from "@/components/inputs/PasswordInput"

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
      toast.warn("O login está demorando, o que acha de pegar um cafézinho enquanto espera?", {
        toastId: "login-warning",
        autoClose: false
      })
    }, 5000)

    try {
      const formData = { username, password }
      const res = await login(formData)

      onAfterLogin(res.data)
    } catch {
      toast("Credenciais inválidas", { 
        type: 'error'
      })
    } finally {
      clearInterval(warningInterval)
      setLoading(false)
    }
  }

  const onAfterLogin = (data) => {
    const { token, name, type } = data

    // salvar dados no localStorage
    localStorage.setItem("token", token)
    localStorage.setItem("name", name)
    localStorage.setItem("userType", type)

    toast("Login feito com sucesso", { type: "success" })

    // reboot lastRequestHour
    const now = new Date()
    localStorage.setItem("lastRequestHour", now.toISOString())

    // redirect por permissão
    if (type === "restricted") {
      navigate("/piadas")
    } else {
      navigate("/home")
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
            <TextInput
              id="username"
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              id="password"
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
