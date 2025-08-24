import { useEffect, useState } from "react"
import { btnCancelClass } from "../utils/classes"
import Modal from "../components/Modal"

function JokeModal({ isOpen, onClose, jokes = null }) {
  const [randomJoke, setRandomJoke] = useState("")

  useEffect(() => {
    if (isOpen && jokes && jokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * jokes.length)
      setRandomJoke(jokes[randomIndex])
    }
  }, [isOpen, jokes])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      actions={
        <>
          <button 
            onClick={onClose}
            className={btnCancelClass}
          >
            Fechar
          </button>
        </>
      }
    >
      <div className="p-4 text-lg">
        {randomJoke.description || "Nenhuma piada disponível"}
      </div>
    </Modal>
  )
}

export default JokeModal
