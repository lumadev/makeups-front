import { useEffect, useState } from "react"
import { getUniqueTypes } from "@/common/utils/jokeUtils"

import TextInput from "@/components/inputs/TextInput"
import Autocomplete from "@/components/inputs/Autocomplete"

function JokeForm({ formData, setFormData, jokes }) {
  const [types, setTypes] = useState([])

  useEffect(() => {
    setTypes(getUniqueTypes(jokes))
  }, [jokes])

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleTypeChange = (value) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  return (
    <form className="w-full">
      <div className="mb-4">
        <TextInput
          id="description"
          value={formData.description}
          onChange={handleChange}
          label="Descrição da piada"
          placeholder="Digite a descrição da piada..."
        />
      </div>
      <div className="mb-4">
        <Autocomplete
          id="type"
          value={formData.type}
          onChange={handleTypeChange}
          options={types}
          label="Tipo de piada"
          placeholder="Selecione ou digite o tipo da piada..."
        />
      </div>
    </form>
  )
}

export default JokeForm