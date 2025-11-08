import { btnClass } from '@/common/utils/classes'
import { useState } from "react"

import StudentSongFormModal from '@/features/students/songs/form/StudentSongFormModal'

function StudentSongsNew({ 
  studentId, 
  onAfterSave, 
  screenType = 'student-songs'
}) {
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
        studentId={studentId}
        screenType={screenType}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default StudentSongsNew
