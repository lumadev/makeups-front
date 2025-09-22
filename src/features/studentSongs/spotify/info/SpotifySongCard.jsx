import React from "react"

import { toast } from "react-toastify"
import { editStudentSong } from "@/features/students/songs/studentSongsService"

function SpotifySongCard({ spotifySong, studentId, song }) {
  if (!spotifySong) return null

  const handleVinculate = async () => {
    try {
      const formData = { ...song, spotifyId: spotifySong.id }
      await editStudentSong(studentId, song.id, formData)

      toast("Música vinculada com sucesso", {
        type: "success",
      })
    } catch {
      toast("Erro ao vincular música", {
        type: "error",
      })
    }
  }

  return (
    <div className="grid grid-cols-4 gap-3 p-3 bg-white rounded-xl shadow">
      {/* Imagem */}
      <div className="flex items-center justify-center">
        <img
          src={spotifySong.image}
          alt={spotifySong.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Informações */}
      <div className="col-span-2 flex flex-col justify-center">
        <h2 className="text-base font-bold text-gray-900">{spotifySong.name}</h2>
        <p className="text-sm text-gray-600">{spotifySong.album}</p>
        <a
          href={spotifySong.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
        >
          Abrir link do Spotify
        </a>
      </div>

      {/* Botão Vincular */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleVinculate}
          className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          Vincular esta versão
        </button>
      </div>
    </div>
  )
}

export default SpotifySongCard
