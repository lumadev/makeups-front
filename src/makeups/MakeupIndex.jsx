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
      <div className="flex my-4">
        <MakeupNew onMakeupSaved={reloadMakeups} />
      </div>

      {/* Busca de alunos */}
      <MakeupSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      <MakeupList searchTerm={searchTerm} reloadFlag={reloadFlag} />
    </>
  )
}

export default MakeupIndex