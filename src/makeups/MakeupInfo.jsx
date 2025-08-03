import { useMemo } from 'react'
import { formatDate } from '../utils/date'

function MakeupInfo({ makeups = [] }) {
  const todaysCount = useMemo(() => {
    
    const makeupsToday = makeups.filter((makeup) => {
      const dateReplacement = makeup.dateReplacement
      
      // in caso of the date to be empty
      if (!dateReplacement) return false
      
      const todayFormatted = formatDate(new Date())
      const dateFormatted = formatDate(dateReplacement)

      return dateFormatted === todayFormatted
    })
    return makeupsToday.length
  }, [makeups])

  // Renderiza o aviso **apenas se** houver reposições para hoje
  if (todaysCount > 0) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
        Você tem {todaysCount} reposição(ões) para hoje!
      </div>
    )
  } else {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
        Você não tem reposições para hoje!
      </div>
    )
  }
}

export default MakeupInfo
