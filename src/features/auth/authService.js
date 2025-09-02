import { api } from "@/services/api"

const login = (formData) => {
  return api.post("/auth/login", formData)
}

export { login }