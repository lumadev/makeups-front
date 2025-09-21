import { useState } from 'react'

import StudentList from './list/StudentList'
import StudentNew from './StudentNew'
import StudentSearch  from './list/StudentSearch'
import InputSearch from '@/components/inputs/InputSearch'

function StudentIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [studentCount, setStudentCount] = useState(0)

  const reloadStudents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new student */}
      <div className="flex my-4">
        <StudentNew onAfterSave={reloadStudents} />
      </div>

      {/* Students search */}
      {studentCount > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          label="Buscar aluno"
          placeholder="Digite o nome do aluno"
          onSearch={setSearchTerm}
        />
      )}

      {/* Students list */}
      <StudentList 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        onCountChange={setStudentCount}
      />
    </>
  )
}

export default StudentIndex