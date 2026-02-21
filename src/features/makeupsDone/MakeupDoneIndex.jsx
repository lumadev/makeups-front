import { useState } from 'react'

import MakeupList from '../makeups/list/MakeupList'
import InputSearch from '@/components/inputs/InputSearch'
import MakeupDoneHeader from './MakeupDoneHeader'

function MakeupDoneIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [makeupCount, setMakeupCount] = useState(0)

  return (
    <>
      {/* Makeup done header */}
      <MakeupDoneHeader />

      {/* Makeup done search */}
      {makeupCount > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          label="Buscar reposição"
          placeholder="Digite a data da reposição ou nome do aluno"
          onSearch={setSearchTerm}
        />
      )}

      {/* Makeups done list */}
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