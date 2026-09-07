import { useState } from 'react'

import EventDateCloseInfo from './EventDateCloseInfo'
import EventDateList from './list/EventDateList'
import EventDateHeader from './EventDateHeader'
import EventDateListDoneModal from './list/EventDateListDoneModal'
import InputSearch from '@/components/inputs/InputSearch'

function EventDateIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [dateEventCount, setDateEventCount] = useState(0)
  const [eventDates, setEventDates] = useState([])

  const reloadDateEvents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      <EventDateHeader onAfterSave={reloadDateEvents} />

      {/* Separator */}
      <div className="border-b border-gray-300 dark:border-gray-700 my-4" />

      {/* Button do see done events modal */}
      <EventDateListDoneModal />
      
      {/* Closest event on this month */}
      {dateEventCount > 0 && (
        <div className="mt-4">
          <EventDateCloseInfo eventDates={eventDates} />
        </div>
      )}

      {/* dateEvents search */}
      {dateEventCount > 0 && (
        <>
          <InputSearch
            searchTerm={searchTerm}
            label="Buscar evento"
            placeholder="Digite o nome do evento"
            onSearch={setSearchTerm}
          />
        </>
      )}

      {/* dateEvents list */}
      <EventDateList
        searchTerm={searchTerm}
        reloadFlag={reloadFlag}
        setEventDatesList={setEventDates}
        onCountChange={setDateEventCount}
      />
    </>
  )
}

export default EventDateIndex