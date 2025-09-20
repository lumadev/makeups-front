import DateInput from "@/components/inputs/DateInput"
import TextArea from "@/components/inputs/TextArea"
import TextInput from "@/components/inputs/TextInput"

function EventDateForm({
  isEdit = false,
  formData,
  setFormData,
  eventDateEdit = null
}) {
  const handleEventDateChange = (date) => {
    setFormData((prev) => ({ ...prev, eventDate: date }))
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
          onChange={handleEventDateChange}
          title="Data e hora do evento"
          fieldName="eventDate"
        />
      </div>
      <div className="mb-4">
        <TextInput
          id="link"
          label="Link do Evento"
          value={formData.link || ''}
          onChange={handleChange}
          placeholder="Cole o link do evento"
          maxLength="500"
          type="url"
        />
      </div>
      <div className="mb-4">
        <TextArea
          id="observations"
          value={formData.observations}
          onChange={handleChange}
          title="Observações"
          fieldName="observations"
          maxLength="5000"
          placeholder="Digite observações adicionais sobre o evento..."
        />
      </div>
    </form>
  )
}

export default EventDateForm