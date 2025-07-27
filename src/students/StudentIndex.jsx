import { useState } from 'react'

import StudentList from './StudentList'
import StudentNew from './StudentNew'
import StudentSearch  from './StudentSearch'

function StudentIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [studentCount, setStudentCount] = useState(0);

  const reloadStudents = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new student */}
      <div className="flex my-4">
        <StudentNew onAfterSave={reloadStudents} />
      </div>

      {/* Students search */}
      {studentCount > 0 && (
        <StudentSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
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