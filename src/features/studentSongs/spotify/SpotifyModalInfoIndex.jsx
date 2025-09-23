import { useState } from "react"

import SpotifyModalInfo from "./info/SpotifyModalInfo"
import SpotifyModalItemsSearch from "./search/SpotifyModalItemsSearch"

function SpotifyModalInfoIndex({ studentSong, studentId, isOpen, onClose }) {
  const [vinculated, setVinculated] = useState(false)

  if (!isOpen) return null

  const onAfterVinculate = ((spotifyId) => {    
    studentSong.spotifyId = spotifyId
    setVinculated(true)
  })

  return (
    <>
      {studentSong.spotifyId || vinculated ? (
        <SpotifyModalInfo
          spotifyId={studentSong.spotifyId}
          studentSong={studentSong}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : (
        <SpotifyModalItemsSearch
          studentSong={studentSong}
          studentId={studentId}
          isOpen={isOpen}
          onClose={onClose}
          onAfterVinculate={onAfterVinculate}
        />
      )}
    </>
  )
}

export default SpotifyModalInfoIndex
