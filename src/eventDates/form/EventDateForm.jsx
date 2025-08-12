import { useState } from 'react'
import DateInput from "../../components/inputs/DateInput"

function EventDateForm({
  isEdit = false,
  setFormData,
  eventDateEdit = null
}) {
  const [initialDate, setInitialDate] = useState(eventDateEdit?.initialDate || "")
  const [finalDate, setFinalDate] = useState(eventDateEdit?.finalDate || "")

  const handleInitialDateChange = (date) => {
    setInitialDate(date)
    setFormData((prev) => ({ ...prev, initialDate: date }))
  }

  const handleFinalDateChange = (date) => {
    setFinalDate(date)
    setFormData((prev) => ({ ...prev, finalDate: date }))
  }

  return (
    <form>
      <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
        <DateInput
          isEdit={isEdit}
          value={initialDate}
          onChange={handleInitialDateChange}
          title="Data inicial"
          fieldName="initialDate"
        />
        <DateInput
          isEdit={isEdit}
          value={finalDate}
          onChange={handleFinalDateChange}
          title="Data final"
          fieldName="finalDate"
        />
      </div>
    </form>
  )
}

export default EventDateForm