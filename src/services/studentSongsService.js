import { api } from "./api"

const listStudentSongs = (studentId) => {
  return api.get(`/student-songs/${studentId}/songs`)
}

const saveStudentSong = (studentId, data) => {
  return api.post(`/student-songs/${studentId}/songs`, data)
}

const editStudentSong = (studentId, songId, data) => {
  return api.put(`/student-songs/${studentId}/songs/${songId}`, data)
}

const deleteStudentSong = (studentId, songId) => {
  return api.delete(`/student-songs/${studentId}/songs/${songId}`)
}

export { 
  listStudentSongs,
  saveStudentSong,
  editStudentSong,
  deleteStudentSong,
}
