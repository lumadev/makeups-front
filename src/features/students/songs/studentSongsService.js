import { api } from "@/services/api"

const listStudentSongs = (studentId) => {
  return api.get(`/student-songs/${studentId}/songs`)
}

const listDoneStudentSongs = (studentId) => {
  return api.get(`/student-songs/${studentId}/songs-done`)
}

const listNotDoneStudentSongs = (studentId) => {
  return api.get(`/student-songs/${studentId}/songs-not-done`)
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
  listDoneStudentSongs,
  listNotDoneStudentSongs,
  saveStudentSong,
  editStudentSong,
  deleteStudentSong,
}
