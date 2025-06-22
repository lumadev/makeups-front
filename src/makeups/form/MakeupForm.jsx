import axios from 'axios';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import DateInput from "../../components/DateInput";
import StudentAutocomplete from './StudentAutocomplete';

function MakeupForm({ setFormData }) {
  const [students, setStudents] = useState([]);

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

  const handleSelectStudent = (studentId) => {
    setFormData((prev) => ({ ...prev, studentId }));
  };

  const setDateReposition = (dateReposition) => {
    setFormData((prev) => ({ ...prev, dateReposition }));
  }

  const setDateOld = (dateOld) => {
    setFormData((prev) => ({ ...prev, dateOld }));
  }

  useEffect(() => {
    getStudents()
  }, []);

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 grid-cols-[1fr_2fr]">
          <StudentAutocomplete
            students={students}
            onSelect={(student) => handleSelectStudent(student.id)}
          />
          <DateInput 
            onChange={setDateReposition}
            title="Data e horário da reposição"
          />
        </div>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <DateInput 
            onChange={setDateOld}
            title="Data e horário da aula antiga"
          />
        </div>
      </form>
    </>
  )
}

export default MakeupForm