import { useEffect, useState } from "react"
import { toast } from "react-toastify"
// import { listSongsInfo } from "@/services/spotifyService"

import Modal from "@/components/Modal"
// import SpotifySongCard from "@/features/studentSongs/spotify/info/SpotifySongCard"
import SpotifyModalSongsList from "@/features/studentSongs/spotify/search/SpotifyModalSongsList"

function SpotifyModalItemsSearch({ 
  song,
  studentId,
  isOpen,
  onClose
}) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!isOpen) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // const res = await listSongsInfo(song.songName, song.artist)
        // setResults(res.data || [])

        const data = [
          {
              "id": "032QyDapuk9L3yrN2n88F4",
              "name": "Solitary Ground",
              "artists": "Epica",
              "album": "Consign To Oblivion (Expanded Edition)",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/032QyDapuk9L3yrN2n88F4",
              "image": "https://i.scdn.co/image/ab67616d0000b2733cf1b9f791a1d853bd31c372"
          },
          {
              "id": "4XqHGocC5QdYY4Rhk1BsOB",
              "name": "Solitary Ground - Remix",
              "artists": "Epica",
              "album": "Consign To Oblivion (Expanded Edition)",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/4XqHGocC5QdYY4Rhk1BsOB",
              "image": "https://i.scdn.co/image/ab67616d0000b2733cf1b9f791a1d853bd31c372"
          },
          {
              "id": "2Jszh7FaOmEHfW0i7FaD8W",
              "name": "Solitary Ground - Piano Version Remastered",
              "artists": "Epica",
              "album": "Consign To Oblivion (Expanded Edition)",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/2Jszh7FaOmEHfW0i7FaD8W",
              "image": "https://i.scdn.co/image/ab67616d0000b2733cf1b9f791a1d853bd31c372"
          },
          {
              "id": "1ykyv6s4V4VTldelgEPI26",
              "name": "Solitary Ground - Live At Paradiso",
              "artists": "Epica, Amanda Somerville",
              "album": "Live At Paradiso",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/1ykyv6s4V4VTldelgEPI26",
              "image": "https://i.scdn.co/image/ab67616d0000b273f23ed5067e41c01040a8dc26"
          },
          {
              "id": "4VdEUxVGNxzQoZGaoml8k3",
              "name": "Solitary Ground - 2.0 Version",
              "artists": "Epica",
              "album": "The Score 2.0 - An Epic Journey",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/4VdEUxVGNxzQoZGaoml8k3",
              "image": "https://i.scdn.co/image/ab67616d0000b273b15d8981e2ef2ac448e396ce"
          },
          {
              "id": "1MHqMMtl2LT5NZyfQ7unFf",
              "name": "Solitary Ground - Orchestral Version",
              "artists": "Epica",
              "album": "Consign To Oblivion (Expanded Edition)",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/1MHqMMtl2LT5NZyfQ7unFf",
              "image": "https://i.scdn.co/image/ab67616d0000b2733cf1b9f791a1d853bd31c372"
          },
          {
              "id": "0cGFv7482DTXCTmmJIjaFB",
              "name": "Solitary Ground - Piano Version Remastered",
              "artists": "Epica",
              "album": "The Score 2.0 - An Epic Journey",
              "preview_url": null,
              "external_url": "https://open.spotify.com/track/0cGFv7482DTXCTmmJIjaFB",
              "image": "https://i.scdn.co/image/ab67616d0000b273b15d8981e2ef2ac448e396ce"
          }
        ]
        setResults(data)
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
