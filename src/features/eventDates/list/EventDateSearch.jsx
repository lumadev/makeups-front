import { useState } from "react"
import CheckboxInput from "@/components/inputs/CheckboxInput"

function EventDateSearch({ searchTerm, onSearch, setOnlyConfirmed }) {
  const [onlyConfirmed, setInternalOnlyConfirmed] = useState(false)

  const handleCheckboxChange = (value) => {
    setInternalOnlyConfirmed(value)
    setOnlyConfirmed?.(value) // atualiza o estado no componente pai
  }

  return (
    <div className="my-8">
      {/* Campo de busca */}
      <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
        Buscar evento:
      </label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Digite o nome do evento"
        className="border border-gray-300 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 mb-4"
      />

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
