import { useEffect, useState, useRef } from "react"
import { btnCancelClass } from "../utils/classes"
import Modal from "../components/Modal"

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function JokeModal({ isOpen, onClose, jokes = [] }) {
  const [randomJoke, setRandomJoke] = useState(null)
  const shuffledRef = useRef([])
  const currentIndexRef = useRef(0)

  const getNextJoke = () => {
    if (shuffledRef.current.length === 0) {
      shuffledRef.current = shuffleArray(jokes)
      currentIndexRef.current = 0
    }

    const joke = shuffledRef.current[currentIndexRef.current]
    currentIndexRef.current += 1

    // Reinicia a lista embaralhada quando acabar
    if (currentIndexRef.current >= shuffledRef.current.length) {
      shuffledRef.current = shuffleArray(jokes)
      currentIndexRef.current = 0
    }

    return joke
  }

  useEffect(() => {
    if (isOpen && jokes.length > 0) {
      setRandomJoke(getNextJoke())
    }
  }, [isOpen, jokes])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      actions={
        <>
          <button onClick={onClose} className={btnCancelClass}>
            Fechar
          </button>
          <button
            onClick={() => setRandomJoke(getNextJoke())}
            className="ml-2 btn-primary"
          >
            Próxima Piada
          </button>
        </>
      }
    >
      <div className="p-4 text-lg">
        {randomJoke?.description || "Nenhuma piada disponível"}
      </div>
    </Modal>
  )
}

export default JokeModal
