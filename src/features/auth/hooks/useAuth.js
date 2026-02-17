import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login as loginService } from "../authService"

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const saveUserData = ({ token, name, type }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("name", name)
    localStorage.setItem("userType", type)
    localStorage.setItem("lastRequestHour", new Date().toISOString())
  }

  const login = async ({ username, password }, inspirationalPhrases = []) => {
    if (loading) return

    setLoading(true)

    const warningInterval = setInterval(() => {
      if (inspirationalPhrases.length > 0) {
        const randomPhrase =
          inspirationalPhrases[
            Math.floor(Math.random() * inspirationalPhrases.length)
          ]

        toast.warn(randomPhrase, {
          toastId: "login-warning",
          autoClose: false,
        })
      }
    }, 4000)

    try {
      const { data } = await loginService({ username, password })

      saveUserData(data)

      toast.success("Login feito com sucesso")

      navigate(data.type === "restricted" ? "/piadas" : "/home")

      return data
    } catch (error) {
      toast.error("Credenciais inválidas")
      throw error
    } finally {
      clearInterval(warningInterval)
      toast.dismiss("login-warning")
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return {
    login,
    logout,
    loading,
  }
}
