import { useState } from 'react'

import StudentSongsList from './list/StudentSongsList'
import StudentSongNew from './StudentSongNew'
import StudentSongsSearch from './list/StudentSongsSearch'
import StudentSongListDoneModal from './list/StudentSongListDoneModal'


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

      {/* Separator */}
      <div className="border-b border-gray-300 dark:border-gray-700 my-4" />

      {/* Botão para visualizar concluídas */}
      <StudentSongListDoneModal student={student} />

      {/* studentSongs search */}
      {studentSongCount > 0 && (
        <StudentSongsSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* studentSongs list */}
      <StudentSongsList
        student={student}
        screenType="songs-not-done"
        searchTerm={searchTerm}
        reloadFlag={reloadFlag}
        onCountChange={setStudentSongCount}
      />
    </>
  )
}

export default StudentSongsIndex
