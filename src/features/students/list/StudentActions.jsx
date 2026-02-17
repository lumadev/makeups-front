import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteStudent } from "@/features/students/studentService"
import { IconPencil } from '@tabler/icons-react'

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import StudentFormModal from '../form/StudentFormModal'
import ActionButton from '@/components/button/ActionButton'

function StudentActions({ student, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const navigate = useNavigate()

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

  const viewStudent = () => {
    navigate(`/aluno/${student.id}/musicas`)
  }

  return (
    <>
      {/* edit button */}
      <ActionButton 
        onClick={openModalEdit}
        className="flex items-center gap-2"
      >
        <IconPencil size={12} className="text-orange-500" />
        Editar
      </ActionButton>

      {/* delete button */}
      <ActionButton onClick={() => setShowDialogDelete(true)}>
        Excluir
      </ActionButton>

      {/* view button */}
      <ActionButton onClick={viewStudent}>
        Visualizar
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
