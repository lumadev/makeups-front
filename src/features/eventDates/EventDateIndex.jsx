import { useState } from 'react'

import EventDateCloseInfo from './EventDateCloseInfo'
import EventDateList from './list/EventDateList'
import EventDateNew from './EventDateNew'
import EventDateSearch from './list/EventDateSearch'
import EventDateListDoneModal from './list/EventDateListDoneModal'

function EventDateIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [dateEventCount, setDateEventCount] = useState(0)
  const [eventDates, setEventDates] = useState([])
  const [onlyConfirmed, setOnlyConfirmed] = useState(false)

  const reloadDateEvents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new dateEvent */}
      <div className="flex my-4">
        <EventDateNew onAfterSave={reloadDateEvents} />
      </div>

      {/* Separator */}
      <div className="border-b border-gray-300 dark:border-gray-700 my-4" />

      {/* Button do see done events modal */}
      <EventDateListDoneModal />
      
      {/* Closest event on this month */}
      {dateEventCount > 0 && (
        <div class="mt-4">
          <EventDateCloseInfo eventDates={eventDates} />
        </div>
      )}

      {/* dateEvents search */}
      {dateEventCount > 0 && (
        <EventDateSearch 
          searchTerm={searchTerm}
          setOnlyConfirmed={setOnlyConfirmed}
          onSearch={setSearchTerm}
        />
      )}

      {/* dateEvents list */}
      <EventDateList
        searchTerm={searchTerm}
        reloadFlag={reloadFlag}
        setEventDatesList={setEventDates}
        onCountChange={setDateEventCount}
        onlyConfirmed={onlyConfirmed}
      />
    </>
  )
}

export default EventDateIndex