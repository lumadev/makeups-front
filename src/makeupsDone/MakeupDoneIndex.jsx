import { useState } from 'react'

import MakeupList from '../makeups/list/MakeupList'
import MakeupSearch  from '../makeups/list/MakeupSearch'

function MakeupDoneIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [makeupCount, setMakeupCount] = useState(0)

  return (
    <>
      {/* Makeup search */}
      {makeupCount > 0 && (
        <MakeupSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* Makeups list */}
      <MakeupList 
        title="Reposições Concluídas"
        screenType="makeups-done"
        searchTerm={searchTerm} 
        onCountChange={setMakeupCount}
      />
    </>
  )
}

export default MakeupDoneIndex