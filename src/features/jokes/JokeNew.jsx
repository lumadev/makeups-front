import { useState } from "react"
import { btnClass } from "../../common/utils/classes"
import JokeModal from "./JokeModal"

function JokeNew({ jokes }) {
  const [showModal, setShowModal] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(null)

  const getRandomJoke = (excludeJoke = null) => {
    if (jokes.length === 0) return null

    let randomJoke = null
    let attempts = 0

    // avoid repeat same joke
    do {
      const randomIndex = Math.floor(Math.random() * jokes.length)
      randomJoke = jokes[randomIndex]
      attempts++
    } while (randomJoke === excludeJoke && attempts < 10)

    return randomJoke
  }

  const handleShowModal = () => {
    const joke = getRandomJoke()
    setCurrentJoke(joke)
    setShowModal(true)
  }

  const handleNextJoke = () => {
    const joke = getRandomJoke(currentJoke)
    setCurrentJoke(joke)
  }

  return (
    <>
      <button onClick={handleShowModal} className={btnClass}>
        Gerar Piada Aleatória
      </button>

      <JokeModal
        isOpen={showModal}
        joke={currentJoke}
        onClose={() => setShowModal(false)}
        onNextJoke={handleNextJoke}
      />
    </>
  )
}

export default JokeNew