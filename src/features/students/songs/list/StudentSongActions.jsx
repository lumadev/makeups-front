import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteStudentSong } from "@/services/studentSongsService.js"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import ActionButton from '@/components/button/ActionButton'

function StudentSongActions({ student, studentSong, onAfterSave }) {
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

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
    </>
  )
}

export default StudentSongActions
