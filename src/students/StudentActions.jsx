import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteStudent } from "../services/studentService.js"

import ConfirmationDialog from '../components/confirmation/ConfirmationDialog'
import StudentFormModal from './form/StudentFormModal'

function StudentActions({ student, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const openModalEdit = () => {
    setShowModalEdit(true)
  }

  const deleteStudentApi = async () => {
    setLoadingDelete(true)

    try {
      const studentId = student.id
      await deleteStudent(studentId)

      onAfterSave()

      toast("Aluno excluído com sucesso", { 
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir o aluno", { 
        type: 'error'
      })
    } finally {
      setLoadingDelete(false)
      setShowDialogDelete(false)
    }
  }

  return (
    <>
      <button 
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => openModalEdit()}
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
          loading={loadingDelete}
          onConfirm={() => deleteStudentApi()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      <StudentFormModal
        isEdit="true"
        isOpen={showModalEdit}
        studentEdit={student}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default StudentActions