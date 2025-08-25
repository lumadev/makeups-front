
import { btnClass } from '../common/utils/classes'
import { useState } from "react"

import StudentFormModal from './form/StudentFormModal'

function StudentNew({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Novo Aluno
      </button>

      <StudentFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default StudentNew