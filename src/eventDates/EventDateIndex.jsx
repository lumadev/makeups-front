import { useState } from 'react'

import EventDateList from './EventDateList'
// import EventDateNew from './EventDateNew'
import EventDateSearch from './EventDateSearch'

function EventDateIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  // const [reloadFlag, setReloadFlag] = useState(false)
  const [dateEventCount, setDateEventCount] = useState(0)

  // const reloadDateEvents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new dateEvent */}
      {/* <div className="flex my-4">
        <EventDateNew onAfterSave={reloadDateEvents} />
      </div> */}

      {/* dateEvents search */}
      {dateEventCount > 0 && (
        <EventDateSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* dateEvents list */}
      <EventDateList
        searchTerm={searchTerm}
        onCountChange={setDateEventCount}
      />
    </>
  )
}

export default EventDateIndex