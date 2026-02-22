import { useState } from "react"
import { IconLogin2 } from "@tabler/icons-react"

import { backgroundStyle } from '@/common/utils/classes'
import { useAuth } from "@/features/auth/hooks/useAuth"
import { inspirationalPhrases } from "./inspirationalPhrases.js"

import TextInput from "@/components/inputs/TextInput"
import PasswordInput from "@/components/inputs/PasswordInput"
import LeftSideLogin from "./LeftSideLogin"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ username, password }, inspirationalPhrases)
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen w-full dark:bg-gray-900">
      
      {/* LEFT SIDE */}
      <LeftSideLogin />

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-6">
        <div className="w-full max-w-md">
          
          <h2 className="text-3xl font-serif font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Bem-vindo
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mb-8">
            Faça login para acessar o sistema
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextInput
              id="username"
              label="Usuário"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />

            <PasswordInput
              id="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />

            <button
              type="submit"
              disabled={loading}
              style={backgroundStyle}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition-all duration-200 shadow-md ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:brightness-110 hover:shadow-lg"
              }`}
            >
              <IconLogin2 size={18} />
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10">
            © 2026 Sistema de Reposições by darkangel
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login