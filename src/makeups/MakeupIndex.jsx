import { useState } from 'react'

import MakeupList from './MakeupList'
import MakeupNew from './MakeupNew'
import MakeupSearch  from './MakeupSearch'

function MakeupIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)

  const reloadMakeups = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new makeup */}
      <div className="flex my-4">
        <MakeupNew onMakeupSaved={reloadMakeups} />
      </div>

      {/* Makeup search */}
      <MakeupSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* Makeups list */}
      <MakeupList searchTerm={searchTerm} reloadFlag={reloadFlag} />
    </>
  )
}

export default MakeupIndex