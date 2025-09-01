import { useState } from 'react'

import StudentSongsList from './list/StudentSongsList'
import StudentSongNew from './StudentSongNew'
import StudentSongsSearch from './list/StudentSongsSearch'

function StudentSongsIndex({ student }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [studentSongCount, setStudentSongCount] = useState(0)

  // Toggle reload flag to force list refresh
  const reloadStudentSongs = () => setReloadFlag(prev => !prev)

  return (
    <>
      {/* Button and modal of new studentSong */}
      <div className="flex my-4">
        <StudentSongNew 
          student={student}
          onAfterSave={reloadStudentSongs}
        />
      </div>

      {/* studentSongs search */}
      {studentSongCount > 0 && (
        <StudentSongsSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* studentSongs list */}
      <StudentSongsList
        student={student}
        searchTerm={searchTerm}
        reloadFlag={reloadFlag}
        onCountChange={setStudentSongCount}
      />
    </>
  )
}

export default StudentSongsIndex
