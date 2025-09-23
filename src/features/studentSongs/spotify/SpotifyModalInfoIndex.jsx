import { useState } from "react"

import SpotifyModalInfo from "./info/SpotifyModalInfo"
import SpotifyModalItemsSearch from "./search/SpotifyModalItemsSearch"

function SpotifyModalInfoIndex({ song, studentId, isOpen, onClose }) {
  const [vinculated, setVinculated] = useState(false)

  if (!isOpen) return null

  const onAfterVinculate = ((spotifyId) => {    
    song.spotifyId = spotifyId
    setVinculated(true)
  })

  return (
    <>
      {song.spotifyId || vinculated ? (
        <SpotifyModalInfo
          spotifyId={song.spotifyId}
          song={song}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : (
        <SpotifyModalItemsSearch
          song={song}
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
