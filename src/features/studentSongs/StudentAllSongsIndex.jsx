import { useState } from 'react'
import { btnClass } from '@/common/utils/classes'

import StudentAllSongsList from './list/StudentAllSongsList'
import InputSearch from '@/components/inputs/InputSearch'
import SpotifyModalSearchVersions from '@/features/spotify/searchVersion/SpotifyModalSearchVersions.jsx'

function StudentAllSongsIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reloadFlag] = useState(false)
  const [studentSongCount, setStudentSongCount] = useState(0)

  const [showSpotifyModal, setShowSpotifyModal] = useState(false)

  return (
    <>
      {/* Students search */}
      {studentSongCount > 0 && (
        <>
          <InputSearch
            searchTerm={searchTerm}
            label="Buscar música"
            placeholder="Digite o nome da música"
            onSearch={setSearchTerm}
          />

          <button
            onClick={() => setShowSpotifyModal(true)}
            className={btnClass}
          >
            Buscar versões no Spotify
          </button>
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