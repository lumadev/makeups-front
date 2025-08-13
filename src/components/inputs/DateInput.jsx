import { useEffect, useState, useRef } from "react"

function DateInput({ 
  isEdit = false,
  onChange, 
  title,
  itemEdit = null,
  isOpenDate,
  fieldName
}) {
  const [day, setDay] = useState("")

  // for registration, select default current month 
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return isEdit ? "" : (now.getMonth() + 1).toString()
  })

  // for registration, select default current year
  const [year, setYear] = useState(() => {
    const now = new Date()
    return isEdit ? "" : now.getFullYear().toString()
  })

  const [time, setTime] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const didInitialize = useRef(false)

  useEffect(() => {
    // runs only one time
    if (!isEdit || !itemEdit || didInitialize.current) return

    const dateValue = itemEdit?.[fieldName]

    if (isEdit && dateValue) {
      const date = new Date(dateValue)

      const d = date.getDate().toString()
      const m = (date.getMonth() + 1).toString()
      const y = date.getFullYear().toString()
      const hh = date.getHours().toString().padStart(2, "0")
      const mm = date.getMinutes().toString().padStart(2, "0")
      const t = `${hh}:${mm}`

      setDay(d)
      setMonth(m)
      setYear(y)
      setTime(t)

      onChange(date)
      didInitialize.current = true
      return
    }
  }, [isEdit, itemEdit, onChange, fieldName])

  useEffect(() => {
    setIsDisabled(isOpenDate === true)
  }, [isOpenDate])

  const handleChange = (newDay, newMonth, newYear, newTime) => {
    setDay(newDay)
    setMonth(newMonth)
    setYear(newYear)
    setTime(newTime)

    if (newDay && newMonth && newTime) {
      const [hours, minutes] = newTime.split(":")

      const date = new Date(newYear, newMonth - 1, newDay, hours, minutes)

      onChange(date)
    }
  }

  const inputBaseClasses = "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  const disabledClasses = isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        { title }
      </label>

      <div className="flex items-center">
        {/* day */}
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={(e) => handleChange(e.target.value, month, year, time)}
          placeholder="Dia"
          disabled={isDisabled}
          className={`w-24 mr-2 px-3 py-2 ${inputBaseClasses} ${disabledClasses}`}
        />

        {/* month */}
        <select
          value={month}
          onChange={(e) => handleChange(day, e.target.value, year, time)}
          disabled={isDisabled}
          className={`flex-grow px-3 mr-2 ${inputBaseClasses} ${disabledClasses}`}
        >
          <option value="">Mês</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>

        {/* hour */}
        <input
          type="time"
          value={time}
          onChange={(e) => handleChange(day, month, year, e.target.value)}
          disabled={isDisabled}
          className={`py-2 mr-2 ${inputBaseClasses} ${disabledClasses}`}
        />

        {/* year */}
        <input
          type="number"
          value={year}
          onChange={(e) => handleChange(day, month, e.target.value, time)}
          placeholder="Ano"
          disabled={isDisabled}
          className={`px-3 py-2 w-24 ${inputBaseClasses} ${disabledClasses}`}
        />
      </div>
    </div>
  )
}

export default DateInput