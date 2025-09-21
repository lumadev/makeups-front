import { useState } from 'react'

import MakeupList from '../makeups/list/MakeupList'
import InputSearch from '@/components/inputs/InputSearch'

function MakeupDoneIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [makeupCount, setMakeupCount] = useState(0)

  return (
    <>
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
        title="Reposições Concluídas"
        screenType="makeups-done"
        searchTerm={searchTerm} 
        onCountChange={setMakeupCount}
      />
    </>
  )
}

export default MakeupDoneIndex