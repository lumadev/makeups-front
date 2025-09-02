import { api } from "@/services/api"

const saveJoke = (data) => {
  return api.post('/jokes', data)
}

const getAllJokes = () => {
  return api.get('/jokes')
}

const deleteJoke = (id) => {
  return api.delete(`/jokes/${id}`)
}

export { 
  saveJoke,
  getAllJokes,
  deleteJoke
}