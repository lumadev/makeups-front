import { api } from "@/services/api"

const basePath = (studentId) => `/student-songs/${studentId}/songs`

const listStudentSongs = (studentId) => {
  return api.get(basePath(studentId))
}

const listDoneStudentSongs = (studentId) => {
  return api.get(`${basePath(studentId)}-done`)
}

const listNotDoneStudentSongs = (studentId) => {
  return api.get(`${basePath(studentId)}-not-done`)
}

const saveStudentSong = (studentId, data) => {
  return api.post(basePath(studentId), data)
}

const editStudentSong = (studentId, songId, data) => {
  return api.put(`${basePath(studentId)}/${songId}`, data)
}

const deleteStudentSong = (studentId, songId) => {
  return api.delete(`${basePath(studentId)}/${songId}`)
}

export { 
  listStudentSongs,
  listDoneStudentSongs,
  listNotDoneStudentSongs,
  saveStudentSong,
  editStudentSong,
  deleteStudentSong,
}
