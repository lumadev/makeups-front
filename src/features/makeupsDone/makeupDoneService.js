import { api } from "@/services/api"

const basePath = '/makeups-done'

const listMakeupsDone = () => {
  return api.get(basePath)
}

const deleteMakeupDone = (id) => {
  return api.delete(`${basePath}/${id}`)
}


export { 
  listMakeupsDone,
  deleteMakeupDone
}