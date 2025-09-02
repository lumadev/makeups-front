import { api } from "@/services/api"

const listStudents = () => {
  return api.get('/students')
}

const saveStudent = (data) => {
  return api.post('/students', data)
}

const editStudent = (id, data) => {
  return api.put(`/students/${id}`, data)
}

const deleteStudent = (id) => {
  return api.delete(`/students/${id}`)
}

const getStudentById = (id) => {
  return api.get(`/students/${id}`)
}

export { 
  listStudents,
  saveStudent,
  editStudent,
  deleteStudent,
  getStudentById
}