import { useState } from "react"
import { ToastContainer } from 'react-toastify'

import { useAuth } from "@/features/auth/hooks/useAuth"
import { inspirationalPhrases } from './inspirationalPhrases.js'

import TextInput from "@/components/inputs/TextInput"
import PasswordInput from "@/components/inputs/PasswordInput"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ username, password }, inspirationalPhrases)
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
                loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
              onClick={handleSubmit}
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
