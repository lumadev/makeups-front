import { useEffect, useState, useRef } from "react"

function DateInput({ 
  isEdit = false,
  onChange, 
  title,
  itemEdit = null,
  isOpenDate,
  fieldName,
  error
}) {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return isEdit ? "" : (now.getMonth() + 1).toString()
  })
  const [year, setYear] = useState(() => {
    const now = new Date()
    return isEdit ? "" : now.getFullYear().toString()
  })
  const [time, setTime] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const didInitialize = useRef(false)

  useEffect(() => {
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

  const getMaxDays = (selectedMonth, selectedYear) => {
    if (!selectedMonth) return 31

    const monthNumber = Number(selectedMonth)
    if (monthNumber === 2) {
      const yearNumber = Number(selectedYear)
      return selectedYear && yearNumber % 4 === 0 && (yearNumber % 100 !== 0 || yearNumber % 400 === 0) ? 29 : 28
    }

    return [4, 6, 9, 11].includes(monthNumber) ? 30 : 31
  }

  const handleChange = (newDay, newMonth, newYear, newTime) => {
    const maxDays = getMaxDays(newMonth, newYear)
    const validDay = newDay ? Math.min(Number(newDay), maxDays).toString() : ""

    setDay(validDay)
    setMonth(newMonth)
    setYear(newYear)
    setTime(newTime)

    const yearNumber = Number(newYear)
    const monthNumber = Number(newMonth)
    const dayNumber = Number(validDay)
    const [hours, minutes] = newTime.split(":").map(Number)

    if (
      !validDay ||
      !newMonth ||
      !/^\d{4}$/.test(newYear) ||
      !newTime ||
      !Number.isInteger(yearNumber) ||
      yearNumber < 1 ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      dayNumber < 1 ||
      !Number.isInteger(hours) ||
      hours > 23 ||
      !Number.isInteger(minutes) ||
      minutes < 0 ||
      minutes > 59
    ) {
      onChange(null)
      return
    }

    const date = new Date(0)
    date.setFullYear(yearNumber, monthNumber - 1, dayNumber)
    date.setHours(hours, minutes, 0, 0)
    const isValidDate = date.getFullYear() === yearNumber &&
      date.getMonth() === monthNumber - 1 &&
      date.getDate() === dayNumber &&
      date.getHours() === hours &&
      date.getMinutes() === minutes

    onChange(isValidDate ? date : null)
  }

  const inputBaseClasses = "border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none dark:focus:ring-orange-400"
  const enabledClasses = "bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
  const disabledClasses = "bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
  const maxDays = getMaxDays(month, year)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        { title }
      </label>

      <div className="flex items-center">
        {/* day */}
        <input
          type="number"
          min="1"
          max={maxDays}
          value={day}
          onChange={(e) => {
            const value = e.target.value
            if (value.length <= 2) handleChange(value, month, year, time)
          }}
          placeholder="Dia"
          disabled={isDisabled}
          className={`w-24 mr-2 px-3 py-2 ${inputBaseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        />

        {/* month */}
        <select
          value={month}
          onChange={(e) => handleChange(day, e.target.value, year, time)}
          disabled={isDisabled}
          className={`flex-grow px-3 mr-2 py-2 ${inputBaseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
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
          className={`py-2 mr-2 ${inputBaseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        />

        {/* year */}
        <input
          type="number"
          value={year}
          onChange={(e) => handleChange(day, month, e.target.value, time)}
          placeholder="Ano"
          disabled={isDisabled}
          className={`px-3 py-2 w-24 ${inputBaseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default DateInput