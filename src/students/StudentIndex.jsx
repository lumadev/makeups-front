import { useState } from 'react'

import StudentList from './StudentList'
import StudentNew from './StudentNew'
import StudentSearch  from './StudentSearch'

function StudentIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)

  const reloadStudents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      <div className="flex my-4">
        <StudentNew onStudentSaved={reloadStudents} />
      </div>

      {/* Busca de alunos */}
      <StudentSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      <StudentList searchTerm={searchTerm} reloadFlag={reloadFlag} />
    </>
  )
}

export default StudentIndex