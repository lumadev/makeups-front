
import { btnClass } from '../@/common/utils/classes'
import { useState } from "react"

import JokeFormModal from './JokeFormModal'

function JokeNew({ onAfterSave, jokes }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Nova Piada
      </button>

      <JokeFormModal
        jokes={jokes}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default JokeNew