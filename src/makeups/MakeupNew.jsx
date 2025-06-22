
import { btnClass } from '../utils/classes';
import { useState } from "react";

import MakeupFormModal from './form/MakeupFormModal'

function MakeupNew({ onMakeupSaved }) {
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
        onMakeupSaved={onMakeupSaved}
      />
    </>
  )
}

export default MakeupNew