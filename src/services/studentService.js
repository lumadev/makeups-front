import { api } from "./api";

const listStudents = () => {
  return api.get('/students');
};

const saveStudent = (data) => {
  return api.post('/students', data);
};

const editStudent = (id, data) => {
  return api.put(`/students/${id}`, data);
};

export { listStudents, saveStudent, editStudent }