import { api } from "@/services/api"

const basePath = '/jokes'

const saveJoke = (data) => {
  return api.post(basePath, data)
}

const getAllJokes = () => {
  return api.get(basePath)
}

const deleteJoke = (id) => {
  return api.delete(`${basePath}/${id}`)
}

export { 
  saveJoke,
  getAllJokes,
  deleteJoke
}
