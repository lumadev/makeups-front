import { toast } from 'react-toastify'
import { useState } from 'react'

import axios from 'axios'

import ConfirmationDialog from '../components/ConfirmationDialog';
import StudentFormModal from './form/StudentFormModal'

function StudentActions({ student, getStudents }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [studentEdit, setStudentEdit] = useState({})

  const openModalEdit = (student) => {
    setStudentEdit(student)
    setShowModalEdit(true)
  }

  const deleteStudent = async () => {
    try {
      const studentId = student.id
      await axios.delete(`http://localhost:3000/students/${studentId}`)

      getStudents()

      toast("Aluno excluído com sucesso", { 
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir o aluno", { 
        type: 'error'
      })
    }
  }

  return (
    <>
      <button 
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => openModalEdit(student)}
      >
        Editar
      </button>
      <button
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => setShowDialogDelete(true)}
      >
        Excluir
      </button>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir aluno"
          message={`Deseja realmente excluir o aluno ${student.name}?`}
          onConfirm={() => deleteStudent()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      <StudentFormModal
        isEdit="true"
        isOpen={showModalEdit}
        studentEdit={studentEdit}
        onClose={() => setShowModalEdit(false)}
        onStudentSaved={getStudents}
      />
    </>
  )
}

export default StudentActions