import { formatDate } from '@/common/utils/date'
import MakeupInfoSection from './MakeupInfoSection'

function MakeupInfo({ makeups = [] }) {
  const now = new Date()
  const todayFormatted = formatDate(now)

  const pastMakeups = []
  const upcomingMakeups = []

  makeups.forEach((makeup) => {
    if (!makeup.dateReplacement) return

    const makeupDate = new Date(makeup.dateReplacement)
    const dateFormatted = formatDate(makeupDate)

    if (dateFormatted !== todayFormatted) return

    if (makeupDate <= now) {
      pastMakeups.push(makeup)
    } else {
      upcomingMakeups.push(makeup)
    }
  })

  return (
    <>
      <MakeupInfoSection
        title="Você terá as seguintes reposições para hoje:"
        makeups={upcomingMakeups}
      />

      <MakeupInfoSection
        title="Você teve as seguintes reposições para hoje:"
        makeups={pastMakeups}
      />
    </>
  )
}

export default MakeupInfo