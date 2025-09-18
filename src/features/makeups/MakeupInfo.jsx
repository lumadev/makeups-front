import { useMemo } from 'react'
import { formatDate, formatDateAndHour } from '@/common/utils/date'

function MakeupInfo({ makeups = [] }) {
  const todaysMakeups = useMemo(() => {
    return makeups.filter((makeup) => {
      if (!makeup.dateReplacement) return false
      const todayFormatted = formatDate(new Date())
      const dateFormatted = formatDate(makeup.dateReplacement)
      return dateFormatted === todayFormatted
    })
  }, [makeups])

  const baseClasses = "bg-blue-50 text-blue-800 p-4 mb-4 rounded-lg shadow-sm"
  const listItemClasses = "ml-4 list-disc"
  const count = todaysMakeups.length
  const plural = count === 1 ? "reposição" : "reposições"

  return (
    <div className={baseClasses}>
      {count > 0 ? (
        <>
          <div>
            Você tem {count} {plural} para hoje:
          </div>
          <ul className={listItemClasses}>
            {todaysMakeups.map((makeup, index) => (
              <li key={index}>
                {makeup.studentName} - {formatDateAndHour(makeup.dateReplacement)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        "Você não tem reposições para hoje!"
      )}
    </div>
  )
}

export default MakeupInfo
