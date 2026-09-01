import { useState } from 'react'
import TextInput from '@/components/inputs/TextInput'

import { btnClass, btnCancelClass } from '@/common/utils/classes'

import SpotifyModalItemsSearch from '@/features/studentSongs/spotify/search/SpotifyModalItemsSearch'

function SpotifyModalSearchVersions({ onClose }) {
  const [formData, setFormData] = useState({
    songName: '',
    artist: ''
  })

  const [showResults, setShowResults] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const search = () => {
    if (formData.songName.trim() && formData.artist.trim()) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const studentSong = {
    songName: formData.songName,
    artist: formData.artist
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Buscar versões no Spotify
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Campos de busca */}
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <TextInput
            id="songName"
            label="Nome da Música"
            value={formData.songName}
            onChange={handleChange}
            placeholder="Nome da Música"
            maxLength="200"
            required
          />

          <TextInput
            id="artist"
            label="Artista"
            value={formData.artist}
            onChange={handleChange}
            placeholder="Artista"
            maxLength="200"
            required
          />
        </div>

        {/* Botão de buscar */}
        <button onClick={search} className={btnClass}>
          Buscar versões
        </button>

        <button 
          onClick={onClose}
          className={`${btnCancelClass} ml-2`}
        >
          Cancelar
        </button>

        {/* Resultados da busca */}
        {showResults && (
          <div className="mt-6">
            <SpotifyModalItemsSearch
              studentSong={studentSong}
              isOpen={showResults}
              onClose={onClose}
              screenType="search-versions"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpotifyModalSearchVersions
