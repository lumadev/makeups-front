import { useState } from "react"
import { btnClass } from "../common/utils/classes"
import JokeModal from "./JokeModal"

function JokeNew({ jokes }) {
  const [showModal, setShowModal] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(null)

  const handleShowModal = () => {
    if (jokes.length === 0) return

    const randomIndex = Math.floor(Math.random() * jokes.length)

    setCurrentJoke(jokes[randomIndex])
    setShowModal(true)
  }

  return (
    <>
      <button onClick={handleShowModal} className={btnClass}>
        Gerar Piada
      </button>

      <JokeModal
        isOpen={showModal}
        joke={currentJoke}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default JokeNew
