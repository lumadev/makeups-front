import { api } from "@/services/api"

const basePath = '/event-dates'

const listEventDates = () => {
  return api.get(basePath)
}

const listDoneEventDates = () => {
  return api.get(`${basePath}/events-done`)
}

const listNotDoneEventDates = () => {
  return api.get(`${basePath}/events-not-done`)
}

const saveEventDate = (data) => {
  return api.post(basePath, data)
}

const editEventDate = (id, data) => {
  return api.put(`${basePath}/${id}`, data)
}

const deleteEventDate = (id) => {
  return api.delete(`${basePath}/${id}`)
}

export { 
  listEventDates,
  listDoneEventDates,
  listNotDoneEventDates,
  saveEventDate,
  editEventDate,
  deleteEventDate,
}
