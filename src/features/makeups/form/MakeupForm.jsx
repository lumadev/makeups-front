import { useState } from 'react'

import CheckboxInput from "@/components/inputs/CheckboxInput"
import DateInput from "@/components/inputs/DateInput"
import StudentAutocomplete from './StudentAutocomplete'

function MakeupForm({
  isEdit = false,
  setFormData,
  makeupEdit = null,
  validationErrors = {},
  setValidationErrors
}) {
  const [isOpenDate, setIsOpenDate] = useState(
  makeupEdit?.isOpenDate ?? false
)

  const handleSelectStudent = (studentId) => {
    setFormData((prev) => ({ ...prev, studentId }))
    setValidationErrors((prev) => ({ ...prev, studentId: undefined }))
  }

  const setDateReplacement = (dateReplacement) => {
    setFormData((prev) => ({ ...prev, dateReplacement }))
    setValidationErrors((prev) => ({ ...prev, dateReplacement: undefined }))
  }

  const setDateOld = (dateOld) => {
    setFormData((prev) => ({ ...prev, dateOld }))
    setValidationErrors((prev) => ({ ...prev, dateOld: undefined }))
  }

  const handleCheckboxChange = (checked) => {
    setIsOpenDate(checked)

    if (checked) {
      setValidationErrors((prev) => ({ ...prev, dateReplacement: undefined }))
    }

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

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-[1fr_2fr]">
          <StudentAutocomplete
            isEdit={isEdit}
            makeupEdit={makeupEdit}
            error={validationErrors.studentId}
            onSelect={(student) => handleSelectStudent(student.id)}
          />
          <DateInput 
            isEdit={isEdit}
            itemEdit={makeupEdit}
            onChange={setDateOld}
            title="Data e horário da aula antiga"
            fieldName="dateOld"
            error={validationErrors.dateOld}
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
            error={validationErrors.dateReplacement}
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