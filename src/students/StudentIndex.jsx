import { useState } from 'react'

import StudentList from './StudentList'
import StudentNew from './StudentNew'
import StudentSearch  from './StudentSearch'

function StudentIndex() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <div className="flex my-4">
        <StudentNew />
      </div>

      {/* Busca de alunos */}
      <StudentSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      <StudentList searchTerm={searchTerm} />
    </>
  )
}

export default StudentIndex