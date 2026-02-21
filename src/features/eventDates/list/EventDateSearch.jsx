import { useState } from "react"
import CheckboxInput from "@/components/inputs/CheckboxInput"

function EventDateSearch({ setOnlyConfirmed }) {
  const [onlyConfirmed, setInternalOnlyConfirmed] = useState(false)

  const handleCheckboxChange = (value) => {
    setInternalOnlyConfirmed(value)
    setOnlyConfirmed?.(value) // atualiza o estado no componente pai
  }

  return (
    <div className="my-8">
      {/* Checkbox Apenas Confirmados */}
      <CheckboxInput
        label="Apenas Confirmados"
        checked={onlyConfirmed}
        onChange={handleCheckboxChange}
        name="onlyConfirmed"
      />
    </div>
  )
}

export default EventDateSearch
