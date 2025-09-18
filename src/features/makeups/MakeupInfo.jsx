import { useMemo } from 'react'
import { formatDate, formatDateAndHour } from '@/common/utils/date'

function MakeupInfo({ makeups = [] }) {
  const { pastMakeups, upcomingMakeups } = useMemo(() => {
    const now = new Date() 
    const pastMakeups = []
    const upcomingMakeups = []

    makeups.forEach((makeup) => {
      if (!makeup.dateReplacement) return

      const makeupDate = new Date(makeup.dateReplacement)
      const todayFormatted = formatDate(now)
      const dateFormatted = formatDate(makeupDate)

      if (dateFormatted !== todayFormatted) return

      if (makeupDate <= now) {
        pastMakeups.push(makeup)
      } else {
        upcomingMakeups.push(makeup)
      }
    })

    return { pastMakeups, upcomingMakeups }
  }, [makeups])

  const baseClasses = "bg-blue-50 text-blue-800 p-4 mb-4 rounded-lg shadow-sm"
  const listItemClasses = "ml-4 list-disc"

  return (
    <>
      {upcomingMakeups.length > 0 && (
        <div className={baseClasses}>
          <div className="mb-2">
            Você terá as seguintes reposições para hoje:
          </div>
          <ul className={listItemClasses}>
            {upcomingMakeups.map((makeup, index) => (
              <li key={index}>
                {makeup.studentName} - {formatDateAndHour(makeup.dateReplacement)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pastMakeups.length > 0 && (
        <div className={baseClasses}>
          <div className="mb-2">
            Você teve as seguintes reposições para hoje:
          </div>
          <ul className={listItemClasses}>
            {pastMakeups.map((makeup, index) => (
              <li key={index}>
                {makeup.studentName} - {formatDateAndHour(makeup.dateReplacement)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default MakeupInfo
