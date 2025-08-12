
import { btnClass } from '../utils/classes'
import { useState } from "react"

import EventDateFormModal from './form/EventDateFormModal'

function EventDateNew({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Nova Data de Evento
      </button>

      <EventDateFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default EventDateNew