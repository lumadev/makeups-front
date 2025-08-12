import { api } from "./api"

const listEventDates = () => {
  return api.get('/event-dates')
}

const saveEventDate = (data) => {
  return api.post('/event-dates', data)
}

const editEventDate = (id, data) => {
  return api.put(`/event-dates/${id}`, data)
}

const deleteEventDate = (id) => {
  return api.delete(`/event-dates/${id}`)
}

export { 
  listEventDates,
  saveEventDate,
  editEventDate,
  deleteEventDate,
}