import { api } from "./api"

const listMakeups = () => {
  return api.get('/makeups')
}

const saveMakeup = (data) => {
  return api.post('/makeups', data)
}

const editMakeup = (id, data) => {
  return api.put(`/makeups/${id}`, data)
}

const deleteMakeup = (id) => {
  return api.delete(`/makeups/${id}`)
}

const markMakeupAsDone = (id) => {
  return api.put(`/makeups/${id}/mark-as-done`)
}

export { 
  listMakeups,
  saveMakeup,
  editMakeup,
  deleteMakeup,
  markMakeupAsDone
}