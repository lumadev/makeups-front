import { api } from "@/services/api"

const basePath = '/makeups'

const listMakeups = () => {
  return api.get(basePath)
}

const saveMakeup = (data) => {
  return api.post(basePath, data)
}

const editMakeup = (id, data) => {
  return api.put(`${basePath}/${id}`, data)
}

const deleteMakeup = (id) => {
  return api.delete(`${basePath}/${id}`)
}

const markMakeupAsDone = (id) => {
  return api.put(`${basePath}/${id}/mark-as-done`)
}

export { 
  listMakeups,
  saveMakeup,
  editMakeup,
  deleteMakeup,
  markMakeupAsDone
}
