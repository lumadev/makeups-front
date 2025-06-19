
import { btnClass } from '../utils/classes'
import { useState } from "react";

import StudentFormModal from './form/StudentFormModal'

function StudentNew({ onStudentSaved }) {
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
        onStudentSaved={onStudentSaved}
      />
    </>
  )
}

export default StudentNew