import { useState, useMemo } from "react"
import JokeModal from "./JokeModal"
import { getUniqueTypes } from "@/common/utils/jokeUtils"

function JokeButtons({ jokes }) {
  const [selectedType, setSelectedType] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(null)

  // memoiza tipos únicos
  const types = useMemo(() => getUniqueTypes(jokes), [jokes])

  const getRandomJokeByType = (type, excludeJoke = null) => {
    const filtered = jokes.filter((j) => j.type === type)
    if (!filtered.length) return null

    if (filtered.length === 1) return filtered[0]

    let randomJoke
    let attempts = 0

    do {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      randomJoke = filtered[randomIndex]
      attempts++
    } while (randomJoke === excludeJoke && attempts < 10)

    return randomJoke
  }

  const handleGenerateJoke = () => {
    if (!selectedType) return
    const joke = getRandomJokeByType(selectedType)
    setCurrentJoke(joke)
    setShowModal(true)
  }

  const handleNextJoke = () => {
    if (!currentJoke) return
    const joke = getRandomJokeByType(selectedType, currentJoke)
    setCurrentJoke(joke)
  }

  return (
    <div className="flex flex-col gap-6 p-4 rounded-2xl shadow-sm 
      bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800"
    >
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold 
          text-gray-900 dark:text-gray-100">
          Escolha o tipo de piada
        </h2>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`
              px-4 py-1.5 rounded-full text-sm transition-all duration-200
              ${
                selectedType === type
                  ? "bg-blue-600 text-white shadow dark:bg-blue-500"
                  : `
                    bg-gray-200 text-gray-700 hover:bg-gray-300
                    dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
                  `
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <div>
        <button
          disabled={!selectedType}
          onClick={handleGenerateJoke}
          className={`
            px-5 py-2 rounded-lg font-medium transition
            ${
              selectedType
                ? `
                  bg-green-600 text-white hover:bg-green-700
                  dark:bg-green-500 dark:hover:bg-green-600
                `
                : `
                  bg-gray-300 text-gray-500 cursor-not-allowed
                  dark:bg-gray-800 dark:text-gray-600
                `
            }
          `}
        >
          Gerar piada
        </button>
      </div>

      {/* Modal */}
      {currentJoke && (
        <JokeModal
          isOpen={showModal}
          joke={currentJoke}
          onClose={() => setShowModal(false)}
          onNextJoke={handleNextJoke}
        />
      )}
    </div>
  )
}

export default JokeButtons