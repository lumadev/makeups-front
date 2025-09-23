import { useState } from "react"
import { btnClass } from "@/common/utils/classes"
import { getRandomJoke } from "./jokeUtils"

import JokeModal from "./JokeModal"

function JokeGenerateNew({ jokes }) {
  const [showModal, setShowModal] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(null)

  const handleShowModal = () => {
    const joke = getRandomJoke(jokes)
    setCurrentJoke(joke)
    setShowModal(true)
  }

  const handleNextJoke = () => {
    const joke = getRandomJoke(jokes, currentJoke)
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

export default JokeGenerateNew