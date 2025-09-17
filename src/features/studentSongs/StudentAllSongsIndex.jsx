import { useState } from 'react'

import StudentAllSongsList from './list/StudentAllSongsList'
// import StudentSongNew from './StudentSongNew'
// import StudentSongSearch  from './list/StudentSongSearch'

function StudentAllSongsIndex() {
  const [searchTerm] = useState('')
  const [reloadFlag] = useState(false)
  // const [studentSongCount, setStudentSongCount] = useState(0)

  // const reloadStudentSongs = () => setReloadFlag((prev) => !prev)

  return (
    <>
      {/* Button and modal of new student song */}
      {/* <div className="flex my-4">
        <StudentSongNew onAfterSave={reloadStudentSongs} />
      </div> */}

      {/* Students search */}
      {/* {studentSongCount > 0 && (
        <StudentSongSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )} */}

      {/* Students list */}
      <StudentAllSongsList 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        // onCountChange={setStudentSongCount}
      />
    </>
  )
}

export default StudentAllSongsIndex