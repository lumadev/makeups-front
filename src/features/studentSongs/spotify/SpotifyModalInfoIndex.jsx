import { useState } from "react"

import SpotifyModalInfo from "./info/SpotifyModalInfo"
import SpotifyModalItemsSearch from "./search/SpotifyModalItemsSearch"

function SpotifyModalInfoIndex({ 
  studentSong, 
  studentId, 
  isOpen, 
  onClose, 
  onAfterSave,
}) {
  const [vinculated, setVinculated] = useState(false)

  if (!isOpen) return null

  const onAfterVinculate = ((spotifyId) => {    
    studentSong.spotifyId = spotifyId
    setVinculated(true)

    onAfterSave()
  })

  const onAfterRemove = () => {
    onAfterSave()
    onClose()
  }

  return (
    <>
      {studentSong.spotifyId || vinculated ? (
        <SpotifyModalInfo
          spotifyId={studentSong.spotifyId}
          studentSong={studentSong}
          isOpen={isOpen}
          onClose={onClose}
          onAfterRemove={onAfterRemove}
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
