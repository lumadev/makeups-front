import { useState } from 'react'

import StudentSongListAll from './list/StudentSongListAll'
// import StudentSongNew from './StudentSongNew'
// import StudentSongSearch  from './list/StudentSongSearch'

function StudentSongIndex() {
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
      <StudentSongListAll 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        // onCountChange={setStudentSongCount}
      />
    </>
  )
}

export default StudentSongIndex