import { useState } from 'react'

import DateInput from "../../components/inputs/DateInput"
import TextArea from "../../components/inputs/TextArea"
import TextInput from "../../components/inputs/TextInput"

function EventDateForm({
  isEdit = false,
  formData,
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

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <form className="w-full">
      <div className="mb-4">
        <TextInput
          id="description"
          value={formData.description}
          onChange={handleChange}
          label="Descrição"
          placeholder="Digite a descrição do evento..."
        />
      </div>
      <div className="mb-4">
        <DateInput
          isEdit={isEdit}
          itemEdit={eventDateEdit}
          onChange={handleInitialDateChange}
          title="Data inicial"
          fieldName="initialDate"
        />
      </div>
      <div className="mb-4">
        <DateInput
          isEdit={isEdit}
          itemEdit={eventDateEdit}
          onChange={handleFinalDateChange}
          title="Data final"
          fieldName="finalDate"
        />
      </div>
      <div className="mb-4">
        <TextArea
          id="observations"
          value={formData.observations}
          onChange={handleChange}
          title="Observações"
          fieldName="observations"
          placeholder="Digite observações adicionais sobre o evento..."
        />
      </div>
    </form>
  )
}

export default EventDateForm