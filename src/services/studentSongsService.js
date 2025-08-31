import { api } from "./api"

const listStudentSongs = (studentId) => {
  return api.get(`/students/${studentId}/songs`)
}

const saveStudentSong = (studentId, data) => {
  return api.post(`/students/${studentId}/songs`, data)
}

const editStudentSong = (studentId, songId, data) => {
  return api.put(`/students/${studentId}/songs/${songId}`, data)
}

const deleteStudentSong = (studentId, songId) => {
  return api.delete(`/students/${studentId}/songs/${songId}`)
}

export { 
  listStudentSongs,
  saveStudentSong,
  editStudentSong,
  deleteStudentSong,
}
