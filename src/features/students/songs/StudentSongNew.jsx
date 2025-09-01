import { btnClass } from '@/common/utils/classes'
import { useState } from "react"

import StudentSongFormModal from './form/StudentSongFormModal'

function StudentSongsNew({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Nova Música
      </button>

      <StudentSongFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default StudentSongsNew
