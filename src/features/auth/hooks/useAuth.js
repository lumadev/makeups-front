import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { STORAGE_KEYS } from "@/constants/storageKeys"
import { login as loginService } from "../services/authService"

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const saveUserData = ({ name, type }) => {
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "true")
    localStorage.setItem(STORAGE_KEYS.NAME, name)
    localStorage.setItem(STORAGE_KEYS.USER_TYPE, type)
    localStorage.setItem(STORAGE_KEYS.LAST_REQUEST_HOUR, new Date().toISOString())
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

  return {
    login,
    loading,
  }
}
