import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteStudentSong } from "@/features/students/songs/studentSongsService"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import ActionButton from '@/components/button/ActionButton'
import StudentSongFormModal from '@/features/students/songs/form/StudentSongFormModal'

function StudentSongActions({ student, studentSong, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const openModalEdit = () => setShowModalEdit(true)

  const deleteStudentSongApi = async () => {
    setLoadingDelete(true)
    try {
      await deleteStudentSong(student.id, studentSong.id)
      onAfterSave()

      toast("Música do aluno excluída com sucesso", { 
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir a música do aluno", {
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
          title="Excluir música do aluno"
          message={`Deseja realmente excluir a música ${studentSong.songName}?`}
          loading={loadingDelete}
          onConfirm={deleteStudentSongApi}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      <StudentSongFormModal
        student={student}
        isEdit="true"
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
        studentSongsEdit={studentSong}
      />
    </>
  )
}

export default StudentSongActions
