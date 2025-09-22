import { api } from "@/services/api"

const basePath = '/spotify'

const listSongsInfo = (songName, artist) => {
  return api.get(`${basePath}/search-song?songName=${songName}&artist=${artist}`)
}

export { 
  listSongsInfo
}
