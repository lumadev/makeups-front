
import { btnClass } from '../utils/classes'
import { useState } from "react"

import JokeModal from './JokeModal'

function JokeNew({ jokes }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Gerar Piada
      </button>

      <JokeModal
        isOpen={showModal}
        jokes={jokes}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default JokeNew