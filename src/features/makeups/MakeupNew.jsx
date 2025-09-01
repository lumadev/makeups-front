
import { btnClass } from '@/common/utils/classes'
import { useState } from "react"

import MakeupFormModal from './form/MakeupFormModal'

function MakeupNew({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Nova Reposição
      </button>

      <MakeupFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default MakeupNew