import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

// request interceptor to save last request hour
api.interceptors.request.use(
  (config) => {
    const now = new Date()

    const lastRequest = localStorage.getItem("lastRequestHour")

    if (lastRequest) {
      const lastRequestDate = new Date(lastRequest)
      const diffInMs = now.getTime() - lastRequestDate.getTime()
      const diffInHours = diffInMs / (1000 * 60 * 60)

      // if last request was more than 8 hours ago
      if (diffInHours > 8) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login"
        }
        return Promise.reject(new Error("Sessão expirada por inatividade."))
      }
    }
    // save last hour as lastRequestHour
    if (window.location.pathname !== "/login") {
      localStorage.setItem("lastRequestHour", now.toISOString())
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor to check token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message

    const tokenNotProvided = message === "Token não fornecido."
    const tokenInvalidOrExpired = message === "Token inválido ou expirado."
    const is401Status = error?.response?.status === 401

    if (
      error.response &&
      (is401Status || tokenNotProvided || tokenInvalidOrExpired)
    ) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)


export { api }