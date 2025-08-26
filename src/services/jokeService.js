import { api } from "./api"

const getAllJokes = () => {
  return api.get('/jokes')
}

const deleteJoke = (id) => {
  return api.delete(`/jokes/${id}`)
}

export { 
  getAllJokes,
  deleteJoke
}