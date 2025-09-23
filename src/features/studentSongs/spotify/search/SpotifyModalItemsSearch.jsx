import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { listSongsInfo } from "@/services/spotifyService"

import Modal from "@/components/Modal"
import SpotifyModalSongsList from "@/features/studentSongs/spotify/search/SpotifyModalSongsList"
import SpotifyModalItemsSearchSkeleton from "./SpotifyModalItemsSearchSkeleton"

function SpotifyModalItemsSearch({ 
  studentSong,
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
        const res = await listSongsInfo(studentSong.songName, studentSong.artist)
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
  }, [isOpen, studentSong])

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Buscar no Spotify ${studentSong.songName}...`}
      sizeClass="max-w-5xl"
    >
      {loading ? (
        <SpotifyModalItemsSearchSkeleton />
      ) : (
        <>
          {results && results.length > 0 ? (
            <SpotifyModalSongsList 
              songs={results}
              studentId={studentId}
              studentSong={studentSong}
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
