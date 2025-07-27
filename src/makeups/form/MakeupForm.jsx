import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { listStudents } from "../../services/studentService";

import CheckboxInput from "../../components/CheckboxInput";
import DateInput from "../../components/DateInput";
import StudentAutocomplete from './StudentAutocomplete';

function MakeupForm({
  isEdit = false,
  setFormData,
  makeupEdit = null
}) {
  const [students, setStudents] = useState([]);
  const [isOpenDate, setIsOpenDate] = useState(false);

  // get students to show in autocomplete field
  const getStudents = async () => {
    try {
      const response = await listStudents()
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

  const setDateReplacement = (dateReplacement) => {
    setFormData((prev) => ({ ...prev, dateReplacement }));
  };

  const setDateOld = (dateOld) => {
    setFormData((prev) => ({ ...prev, dateOld }));
  };

  const handleCheckboxChange = (checked) => {
    setIsOpenDate(checked);

    // clear replacement date
    if (checked) {
      setFormData((prev) => ({ 
        ...prev, 
        dateReplacement: "",
      }));
    }
    // set isOpenDate based on checkbox
    setFormData((prev) => ({ 
      ...prev, 
      isOpenDate: checked
    }));
  };

  useEffect(() => {
    getStudents()
  }, []);

  // set isOpenDate based on makeupEdit
  useEffect(() => {
    if (!makeupEdit) return;

    const isOpenDate = makeupEdit.isOpenDate
    setIsOpenDate(isOpenDate)
  }, [makeupEdit]);

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 grid-cols-[1fr_2fr]">
          <StudentAutocomplete
            isEdit={isEdit}
            makeupEdit={makeupEdit}
            students={students}
            onSelect={(student) => handleSelectStudent(student.id)}
          />
          <DateInput 
            isEdit={isEdit}
            makeupEdit={makeupEdit}
            onChange={setDateOld}
            title="Data e horário da aula antiga"
            fieldName="dateOld"
          />
        </div>
        <div className="grid gap-6 mb-6 grid-cols-[2fr_1fr]">
          <DateInput 
            isEdit={isEdit}
            makeupEdit={makeupEdit}
            isOpenDate={isOpenDate}
            onChange={setDateReplacement}
            title="Data e horário da reposição"
            fieldName="dateReplacement"
          />
          <div className="mt-9">
            <CheckboxInput
              label="Em Aberto"
              checked={isOpenDate}
              onChange={handleCheckboxChange}
              name="isOpenDate"
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default MakeupForm