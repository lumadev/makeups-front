// import { inputClass, inputLabelClass } from '../../utils/classes';

import axios from 'axios'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import StudentAutocomplete from './StudentAutocomplete'

// function MakeupForm({ formData, setFormData }) {
function MakeupForm() {
  const [students, setStudents] = useState([]);
  const [setStudentSelected] = useState([]);

  // get students to show in autocomplete field
  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students')
      const students = response.data

      // sort alphabetically
      students.sort((a, b) => a.name.localeCompare(b.name));

      setStudents(students)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    }
  }

  // const handleChange = (event) => {
  //   const { id, value } = event.target
  //   setFormData(prev => ({ ...prev, [id]: value }));
  // }
  
  useEffect(() => {
    getStudents()
  }, []);

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <StudentAutocomplete
            students={students}
            onSelect={(student) => setStudentSelected(student)}
          />
          {/* <div>
            <label 
              htmlFor="name" 
              className={inputLabelClass}
            >
              Nome
            </label>
            <input 
              type="text" 
              id="name" 
              className={inputClass}
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div> */}
        </div>
      </form>
    </>
  )
}

export default MakeupForm