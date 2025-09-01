import { btnClass } from '@/common/utils/classes'
import { useState } from "react"

import StudentSongFormModal from './form/StudentSongFormModal'

function StudentSongsNew({ student, onAfterSave }) {
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
        student={student}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default StudentSongsNew
