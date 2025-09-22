import SpotifyModalInfo from "./info/SpotifyModalInfo"
import SpotifyModalItemsSearch from "./search/SpotifyModalItemsSearch"

function SpotifyModalInfoIndex({ song, studentId, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      {song.spotifyId ? (
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
        />
      )}
    </>
  )
}

export default SpotifyModalInfoIndex
