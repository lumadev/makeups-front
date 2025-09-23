import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { listSongsInfo } from "@/services/spotifyService"

import Modal from "@/components/Modal"
import SpotifyModalSongsList from "@/features/studentSongs/spotify/search/SpotifyModalSongsList"

function SpotifyModalItemsSearch({ 
  song,
  studentId,
  isOpen,
  onClose,
  onAfterVinculate
}) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!isOpen) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await listSongsInfo(song.songName, song.artist)
        setResults(res.data || [])
      } catch {
        toast("Erro ao buscar informações sobre a música", {
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [isOpen, song])

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Buscar no Spotify ${song.songName}...`}
      sizeClass="max-w-5xl"
    >
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {results && results.length > 0 ? (
            <SpotifyModalSongsList 
              songs={results}
              studentId={studentId}
              song={song}
              onAfterVinculate={onAfterVinculate}
            />
          ) : (
            <p>Nenhuma música encontrada.</p>
          )}
        </>
      )}
    </Modal>
  )
}

export default SpotifyModalItemsSearch
