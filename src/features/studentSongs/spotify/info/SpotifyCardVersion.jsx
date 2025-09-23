import { useState } from "react"
import ActionLink from "@/components/button/ActionLink"
import { btnClassWarning } from '@/common/utils/classes'
import { toast } from "react-toastify"
import { editStudentSong } from "@/features/students/songs/studentSongsService"

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0")
  return `${minutes}m ${seconds}s`
}

function SpotifyCardVersion({ spotifySong, studentSong, onAfterRemove }) {
  const [loading, setLoading] = useState(false)

  const removeSpotifySong = async () => {
    setLoading(true)
    try {
      const objSave = { ...studentSong }
      objSave.spotifyId = ''

      await editStudentSong(studentSong.studentId, studentSong.id, objSave)

      toast("Vínculo removido com sucesso", { type: "success" })

      onAfterRemove()
    } catch {
      toast("Erro ao remover vínculo", { type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full grid grid-cols-3 gap-6 p-6 bg-white rounded-2xl shadow-lg">
      {/* Imagem grande */}
      <div className="flex items-center justify-center">
        <img
          src={spotifySong.image}
          alt={spotifySong.name}
          className="w-48 h-48 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Informações principais */}
      <div className="col-span-2 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-900">{spotifySong.name}</h2>
        <p className="text-lg text-gray-700 mt-1">{spotifySong.artists}</p>
        <p className="text-base text-gray-500">{spotifySong.album}</p>

        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-gray-800">Lançamento:</span>{" "}
            {new Date(spotifySong.release_date).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="font-medium text-gray-800">Duração:</span>{" "}
            {formatDuration(spotifySong.duration_ms)}
          </p>
        </div>

        {/* Ações */}
        <div className="mt-5 flex gap-4">
          <ActionLink href={spotifySong.external_url}>Abrir no Spotify</ActionLink>

          <button
            onClick={removeSpotifySong}
            className={btnClassWarning}
            disabled={loading}
          >
            {loading ? "Removendo..." : "Remover vínculo"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpotifyCardVersion
