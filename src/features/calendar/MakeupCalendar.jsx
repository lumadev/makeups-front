import { useMemo, useState } from "react"

function MakeupCalendar({ makeups = [], isDark = false }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Apenas eventos com dateReplacement válido
  const events = useMemo(() => {
    return makeups
      .filter(m => m.dateReplacement && m.dateReplacement.trim() !== "")
      .map(m => ({
        ...m,
        dateObj: new Date(m.dateReplacement)
      }))
  }, [makeups])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startDay = firstDayOfMonth.getDay()
  const totalDays = lastDayOfMonth.getDate()

  const days = []

  for (let i = 0; i < startDay; i++) {
    days.push(null)
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day)
  }

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1))
  }

  const getEventsForDay = (day) => {
    return events.filter(event => {
      return (
        event.dateObj.getDate() === day &&
        event.dateObj.getMonth() === month &&
        event.dateObj.getFullYear() === year
      )
    })
  }

  return (
    <div
      className={`w-full min-h-screen p-4 transition-colors duration-300
        ${isDark ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-slate-900"}
      `}
    >
      <div className="w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className={`px-4 py-2 rounded-xl font-semibold transition
              ${isDark
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white hover:bg-gray-200 shadow-sm"
              }
            `}
          >
            ←
          </button>

          <h2 className="text-2xl font-bold capitalize">
            {currentDate.toLocaleString("pt-BR", {
              month: "long",
              year: "numeric"
            })}
          </h2>

          <button
            onClick={() => changeMonth(1)}
            className={`px-4 py-2 rounded-xl font-semibold transition
              ${isDark
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white hover:bg-gray-200 shadow-sm"
              }
            `}
          >
            →
          </button>
        </div>

        {/* Dias da semana */}
        <div className={`grid grid-cols-7 text-center font-medium mb-3
          ${isDark ? "text-slate-400" : "text-gray-500"}
        `}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-3">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index}></div>
            }

            const dayEvents = getEventsForDay(day)
            const hasEvents = dayEvents.length > 0

            return (
              <div
                key={index}
                className={`min-h-[110px] p-3 rounded-2xl border transition flex flex-col
                  ${isDark
                    ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-sm font-semibold mb-2">
                  {day}
                </span>

                <div className="flex flex-col gap-1 overflow-hidden">
                  {hasEvents &&
                    dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-2 py-1 rounded-lg truncate font-medium
                          ${isDark
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          }
                        `}
                      >
                        {event.studentName} –{" "}
                        {event.dateObj.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default MakeupCalendar