import React, { useState } from "react"
import SpotifySongCardSearch from "../info/SpotifySongCardSearch"

function SpotifyModalSongsList({ songs, studentId, studentSong, onAfterVinculate }) {
  const [page, setPage] = useState(0)
  const itemsPerPage = 3

  const startIndex = page * itemsPerPage
  const paginatedSongs = songs.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < songs.length) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <div className="space-y-4">
      {paginatedSongs.map((spotifySong) => (
        <SpotifySongCardSearch
          key={spotifySong.id}
          spotifySong={spotifySong}
          studentId={studentId}
          studentSong={studentSong}
          onAfterVinculate={onAfterVinculate}
        />
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded-lg shadow transition-colors ${
            page === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Página anterior
        </button>

        <button
          onClick={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= songs.length}
          className={`px-4 py-2 rounded-lg shadow transition-colors ${
            (page + 1) * itemsPerPage >= songs.length
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Próxima página
        </button>
      </div>
    </div>
  )
}

export default SpotifyModalSongsList
