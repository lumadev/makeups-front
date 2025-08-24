import { api } from "./api"

const getAllJokes = () => {
  return api.get('/jokes')
}

const getRandomJoke = () => {
  return api.get('/jokes/random/random-joke')
}

export { 
  getRandomJoke,
  getAllJokes
}