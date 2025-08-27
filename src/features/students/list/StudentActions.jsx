import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteStudent } from "../../../services/studentService.js"

import ConfirmationDialog from '../../../components/confirmation/ConfirmationDialog'
import StudentFormModal from '../form/StudentFormModal'
import ActionButton from '../../../components/button/ActionButton'

function StudentActions({ student, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const openModalEdit = () => setShowModalEdit(true)

  const deleteStudentApi = async () => {
    setLoadingDelete(true)
    try {
      await deleteStudent(student.id)
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
      {/* edit button */}
      <ActionButton onClick={openModalEdit}>
        Editar
      </ActionButton>
      {/* delete button */}
      <ActionButton onClick={() => setShowDialogDelete(true)}>
        Excluir
      </ActionButton>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir aluno"
          message={`Deseja realmente excluir o aluno ${student.name}?`}
          loading={loadingDelete}
          onConfirm={deleteStudentApi}
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
