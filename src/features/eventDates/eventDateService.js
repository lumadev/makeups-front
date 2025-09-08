import { api } from "@/services/api"

const listEventDates = () => {
  return api.get('/event-dates')
}

const listDoneEventDates = () => {
  return api.get(`/event-dates/events-done`)
}

const listNotDoneEventDates = () => {
  return api.get(`/event-dates/events-not-done`)
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
  listDoneEventDates,
  listNotDoneEventDates,
  saveEventDate,
  editEventDate,
  deleteEventDate,
}