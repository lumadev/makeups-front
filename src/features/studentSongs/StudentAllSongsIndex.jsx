import { useState } from 'react'

import StudentAllSongsList from './list/StudentAllSongsList'
import InputSearch from '@/components/inputs/InputSearch'

function StudentAllSongsIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag] = useState(false)
  const [studentSongCount, setStudentSongCount] = useState(0)

  return (
    <>
      {/* Students search */}
      {studentSongCount > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          label="Buscar música"
          placeholder="Digite o nome da música"
          onSearch={setSearchTerm}
        />
      )}

      {/* Students list */}
      <StudentAllSongsList 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        onCountChange={setStudentSongCount}
      />
    </>
  )
}

export default StudentAllSongsIndex