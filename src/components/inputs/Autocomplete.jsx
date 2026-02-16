import { useState, useEffect } from "react"

function Autocomplete({ id, label, value, options = [], placeholder, onChange, disabled = false }) {
  const [searchTerm, setSearchTerm] = useState(value || "")
  const [filtered, setFiltered] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    setSearchTerm(value || "")
  }, [value])

  const handleChange = (e) => {
    const input = e.target.value
    setSearchTerm(input)

    const filteredOptions = options.filter((opt) =>
      opt.toLowerCase().includes(input.toLowerCase())
    )
    setFiltered(filteredOptions)
    setShowSuggestions(true)

    onChange(input)
  }

  const handleClick = (option) => {
    setSearchTerm(option)
    onChange(option)
    setShowSuggestions(false)
  }

  const handleFocus = (e) => {
    e.stopPropagation()
    if (!searchTerm) {
      setFiltered(options)
    }
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150)
  }

  return (
    <div className="flex flex-col w-full max-w-md relative">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-400 px-3 py-2"
        placeholder={placeholder}
      />
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg z-[9999]">
          <ul>
            {filtered.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-orange-50"
                onClick={(e) => {
                  e.stopPropagation() 
                  handleClick(option)
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Autocomplete
