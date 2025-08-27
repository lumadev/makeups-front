import { useState, useEffect } from "react"
import { btnClass } from "../../common/utils/classes"
import JokeModal from "./JokeModal"

function JokeButtons({ jokes }) {
  const [types, setTypes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(null)

  // Generate unique types array
  useEffect(() => {
    const uniqueTypes = [...new Set(jokes.map(j => j.type))]
    setTypes(uniqueTypes)
  }, [jokes])

  // Get a random joke from a given type (avoid consecutive repetition)
  const getRandomJokeByType = (type, excludeJoke = null) => {
    const filtered = jokes.filter(j => j.type === type)
    if (filtered.length === 0) return null

    let randomJoke = null
    let attempts = 0

    do {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      randomJoke = filtered[randomIndex]
      attempts++
    } while (randomJoke === excludeJoke && attempts < 10)

    return randomJoke
  }

  const handleShowModal = (type) => {
    const joke = getRandomJokeByType(type)
    setCurrentJoke(joke)
    setShowModal(true)
  }

  const handleNextJoke = (type) => {
    const joke = getRandomJokeByType(type, currentJoke)
    setCurrentJoke(joke)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            className={btnClass}
            onClick={() => handleShowModal(type)}
          >
            Gerar piada de {type}
          </button>
        ))}
      </div>

      {/* Joke modal */}
      {currentJoke && (
        <JokeModal
          isOpen={showModal}
          joke={currentJoke}
          onClose={() => setShowModal(false)}
          onNextJoke={() => handleNextJoke(currentJoke.type)}
        />
      )}
    </div>
  )
}

export default JokeButtons
