import { useState } from 'react'

import MakeupInfo from './MakeupInfo'
import MakeupList from './list/MakeupList'
import MakeupHeader from './MakeupHeader'
import InputSearch from '@/components/inputs/InputSearch'

function MakeupIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [makeupCount, setMakeupCount] = useState(0)
  const [makeups, setMakeups] = useState([])

  const reloadMakeups = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new makeup */}
      <MakeupHeader onAfterSave={reloadMakeups} />

      {makeupCount > 0 && (
        <MakeupInfo makeups={makeups} />
      )}

      {/* Makeup search */}
      {makeupCount > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          label="Buscar reposição"
          placeholder="Digite a data da reposição ou nome do aluno"
          onSearch={setSearchTerm}
        />
      )}

      {/* Makeups list */}
      <MakeupList 
        title="Reposições"
        screenType="makeups"
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        onCountChange={setMakeupCount}
        setMakeupsList={setMakeups}
      />
    </>
  )
}

export default MakeupIndex