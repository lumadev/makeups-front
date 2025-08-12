import { useState } from 'react'

import DateInput from "../../components/inputs/DateInput"
import TextArea from "../../components/inputs/TextArea"

function EventDateForm({
  isEdit = false,
  setFormData,
  eventDateEdit = null
}) {
  const [initialDate, setInitialDate] = useState(eventDateEdit?.initialDate || "")
  const [finalDate, setFinalDate] = useState(eventDateEdit?.finalDate || "")
  const [observations, setObservations] = useState(eventDateEdit?.observations || "")

  const handleInitialDateChange = (date) => {
    setInitialDate(date)
    setFormData((prev) => ({ ...prev, initialDate: date }))
  }

  const handleFinalDateChange = (date) => {
    setFinalDate(date)
    setFormData((prev) => ({ ...prev, finalDate: date }))
  }

  const handleObservationsChange = (text) => {
    setObservations(text)
    setFormData((prev) => ({ ...prev, observations: text }))
  }

  return (
    <form className="w-full">
      <div className="mb-4">
        <DateInput
          isEdit={isEdit}
          value={initialDate}
          onChange={handleInitialDateChange}
          title="Data inicial"
          fieldName="initialDate"
        />
      </div>
      <div className="mb-4">
        <DateInput
          isEdit={isEdit}
          value={finalDate}
          onChange={handleFinalDateChange}
          title="Data final"
          fieldName="finalDate"
        />
      </div>
      <div className="mb-4">
        <TextArea
          isEdit={isEdit}
          value={observations}
          onChange={handleObservationsChange}
          title="Observações"
          fieldName="description"
          placeholder="Digite observações sobre o evento..."
        />
      </div>
    </form>
  )
}

export default EventDateForm