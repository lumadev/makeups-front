import { api } from "@/services/api"

const basePath = '/spotify'

const listSongsInfo = (songName, artist) => {
  return api.get(`${basePath}/search-song?songName=${songName}&artist=${artist}`)
}

const getTrackDetails = (spotifyId) => {
  return api.get(`${basePath}/track-details?spotifyId=${spotifyId}`)
}

export { 
  listSongsInfo,
  getTrackDetails
}
