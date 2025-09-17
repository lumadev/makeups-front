import { api } from "@/services/api"


const basePath = '/student-songs'
const basePathStudent = (studentId) => `${basePath}/${studentId}/songs`

const listAllStudentSongs = () => {
  return api.get(basePath)
}

const listStudentSongs = (studentId) => {
  return api.get(basePathStudent(studentId))
}

const listDoneStudentSongs = (studentId) => {
  return api.get(`${basePathStudent(studentId)}-done`)
}

const listNotDoneStudentSongs = (studentId) => {
  return api.get(`${basePathStudent(studentId)}-not-done`)
}

const saveStudentSong = (studentId, data) => {
  return api.post(basePathStudent(studentId), data)
}

const editStudentSong = (studentId, songId, data) => {
  return api.put(`${basePathStudent(studentId)}/${songId}`, data)
}

const deleteStudentSong = (studentId, songId) => {
  return api.delete(`${basePathStudent(studentId)}/${songId}`)
}

export { 
  listAllStudentSongs,
  listStudentSongs,
  listDoneStudentSongs,
  listNotDoneStudentSongs,
  saveStudentSong,
  editStudentSong,
  deleteStudentSong,
}
