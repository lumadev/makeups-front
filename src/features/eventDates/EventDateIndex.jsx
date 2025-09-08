import { useState } from 'react'

import EventDateList from './list/EventDateList'
import EventDateNew from './EventDateNew'
import EventDateSearch from './list/EventDateSearch'
import EventDateListDoneModal from './list/EventDateListDoneModal'

function EventDateIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [dateEventCount, setDateEventCount] = useState(0)

  const reloadDateEvents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new dateEvent */}
      <div className="flex my-4">
        <EventDateNew onAfterSave={reloadDateEvents} />
      </div>

      {/* Separator */}
      <div className="border-b border-gray-300 dark:border-gray-700 my-4" />

      {/* Botão para visualizar concluídas */}
      <EventDateListDoneModal />

      {/* dateEvents search */}
      {dateEventCount > 0 && (
        <EventDateSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* dateEvents list */}
      <EventDateList
        searchTerm={searchTerm}
        reloadFlag={reloadFlag}
        onCountChange={setDateEventCount}
      />
    </>
  )
}

export default EventDateIndex