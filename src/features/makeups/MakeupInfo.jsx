import { useMemo } from 'react'
import { formatDate } from '../../common/utils/date'

function MakeupInfo({ makeups = [] }) {
  const todaysCount = useMemo(() => {
    const makeupsToday = makeups.filter((makeup) => {
      const dateReplacement = makeup.dateReplacement

      if (!dateReplacement) return false

      const todayFormatted = formatDate(new Date())
      const dateFormatted = formatDate(dateReplacement)

      return dateFormatted === todayFormatted
    })
    return makeupsToday.length
  }, [makeups])

  const baseClasses = "bg-blue-50 text-blue-800 p-4 mb-4 rounded-lg shadow-sm"

  return (
    <div className={baseClasses}>
      {todaysCount > 0
        ? `Você tem ${todaysCount} reposição(ões) para hoje!`
        : "Você não tem reposições para hoje!"}
    </div>
  )
}

export default MakeupInfo