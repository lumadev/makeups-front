import { api } from "@/services/api"

const basePath = '/students'

const listStudents = () => {
  return api.get(basePath)
}

const saveStudent = (data) => {
  return api.post(basePath, data)
}

const editStudent = (id, data) => {
  return api.put(`${basePath}/${id}`, data)
}

const deleteStudent = (id) => {
  return api.delete(`${basePath}/${id}`)
}

const getStudentById = (id) => {
  return api.get(`${basePath}/${id}`)
}

export { 
  listStudents,
  saveStudent,
  editStudent,
  deleteStudent,
  getStudentById
}
