import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { listStudents } from "@/features/students/studentService"

import CheckboxInput from "@/components/inputs/CheckboxInput"
import DateInput from "@/components/inputs/DateInput"
import StudentAutocomplete from './StudentAutocomplete'

function MakeupForm({
  isEdit = false,
  setFormData,
  makeupEdit = null
}) {
  const [isOpenDate, setIsOpenDate] = useState(false)

  const handleSelectStudent = (studentId) => {
    setFormData((prev) => ({ ...prev, studentId }))
  }

  const setDateReplacement = (dateReplacement) => {
    setFormData((prev) => ({ ...prev, dateReplacement }))
  }

  const setDateOld = (dateOld) => {
    setFormData((prev) => ({ ...prev, dateOld }))
  }

  const handleCheckboxChange = (checked) => {
    setIsOpenDate(checked)

    // clear replacement date
    if (checked) {
      setFormData((prev) => ({ 
        ...prev, 
        dateReplacement: "",
      }))
    }
    // set isOpenDate based on checkbox
    setFormData((prev) => ({ 
      ...prev, 
      isOpenDate: checked
    }))
  }

  // set isOpenDate based on makeupEdit
  useEffect(() => {
    if (!makeupEdit) return

    const isOpenDate = makeupEdit.isOpenDate
    setIsOpenDate(isOpenDate)
  }, [makeupEdit])

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-[1fr_2fr]">
          <StudentAutocomplete
            isEdit={isEdit}
            makeupEdit={makeupEdit}
            onSelect={(student) => handleSelectStudent(student.id)}
          />
          <DateInput 
            isEdit={isEdit}
            itemEdit={makeupEdit}
            onChange={setDateOld}
            title="Data e horário da aula antiga"
            fieldName="dateOld"
          />
        </div>

        <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <DateInput 
            isEdit={isEdit}
            itemEdit={makeupEdit}
            isOpenDate={isOpenDate}
            onChange={setDateReplacement}
            title="Data e horário da reposição"
            fieldName="dateReplacement"
          />
          <div className="flex items-center md:mt-2">
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