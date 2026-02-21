import { useState } from 'react'
import { btnClass } from '@/common/utils/classes'

import StudentAllSongsList from './list/StudentAllSongsList'
import StudentAllSongsHeader from './StudentAllSongsHeader'

// import StudentSongNew from '@/features/students/songs/StudentSongNew'
import InputSearch from '@/components/inputs/InputSearch'
import SpotifyModalSearchVersions from '@/features/spotify/searchVersion/SpotifyModalSearchVersions.jsx'

function StudentAllSongsIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)
  const [studentSongCount, setStudentSongCount] = useState(0)

  const [showSpotifyModal, setShowSpotifyModal] = useState(false)

  // Toggle reload flag to force list refresh
  const reloadStudentSongs = () => setReloadFlag(prev => !prev)

  return (
    <>
      {/* Button and modal of new student song */}
      <StudentAllSongsHeader reloadStudentSongs={reloadStudentSongs} />

      {/* Students search */}
      {studentSongCount > 0 && (
        <>
          <InputSearch
            searchTerm={searchTerm}
            label="Buscar música"
            placeholder="Digite o nome da música"
            onSearch={setSearchTerm}
          />

          {/* Button and modal of new studentSong */}
          <div className="flex justify-between my-4">
            {/* Spotify search button */}
            <button
              onClick={() => setShowSpotifyModal(true)}
              className={btnClass}
            >
              Buscar versões no Spotify
            </button>

            {/* new song button */}
            {/* <StudentSongNew 
              screenType='student-all-songs'
              onAfterSave={reloadStudentSongs}
            /> */}
          </div>
        </>
      )}

      {/* Students list */}
      <StudentAllSongsList 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        onCountChange={setStudentSongCount}
      />

      {/* Modal Spotify */}
      {showSpotifyModal && (
        <SpotifyModalSearchVersions 
          onClose={() => setShowSpotifyModal(false)} 
        />
      )}
    </>
  )
}

export default StudentAllSongsIndex