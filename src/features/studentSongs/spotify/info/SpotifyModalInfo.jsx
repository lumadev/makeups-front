import Modal from "@/components/Modal"
import SpotifyCardVersion from "./SpotifyCardVersion"
import SpotifyCardSkeleton from "./SpotifyCardSkeleton"

import { useEffect, useState } from "react"
import { getTrackDetails } from "@/services/spotifyService"
import { toast } from "react-toastify"

function SpotifyModalInfo({ 
  spotifyId,
  song,
  isOpen,
  onClose,
}) {
  const [songDetails, setSongDetails] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      if (!spotifyId) return

      try {
        const details = await getTrackDetails(spotifyId)
        setSongDetails(details.data)
      } catch {
        toast("Erro ao buscar detalhes da música no Spotify", { 
          type: "error"
        })
      }
    }

    fetchDetails()
  }, [spotifyId])

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${song.songName} no Spotify`}
      sizeClass={songDetails ? 'max-w-3xl': 'max-w-5xl'}
    >
      {songDetails ? (
        <SpotifyCardVersion spotifySong={songDetails} />
      ) : (
        <SpotifyCardSkeleton />
      )}
    </Modal>
  )
}

export default SpotifyModalInfo