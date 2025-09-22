import { IconCheck } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteStudentSong, editStudentSong } from "@/features/students/songs/studentSongsService"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import ActionButton from '@/components/button/ActionButton'
import StudentSongFormModal from '@/features/students/songs/form/StudentSongFormModal'
import SpotifyModalInfoIndex from '@/features/studentSongs/spotify/SpotifyModalInfoIndex'

function StudentSongActions({ 
  studentId,
  screenType,
  studentSong,
  onAfterSave
}) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogConfirmDone, setShowDialogConfirmDone] = useState(false)

  const [loadingMarkAsDone, setLoadingMarkAsDone] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  
  const isScreenSongsDone = screenType === 'songs-done'
  const isScreenAllSongs = screenType === 'student-all-songs'

  const openModalEdit = () => setShowModalEdit(true)
  const openModalInfo = () => setShowModalInfo(true)

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

  const markAsDone = async () => {
    const songUpdated = { ...studentSong, done: true }

    setLoadingMarkAsDone(true)

    try {
      await editStudentSong(studentId, studentSong.id, songUpdated)

      toast("Música marcada como concluída", { 
        type: 'success'
      })
      onAfterSave()
    } catch {
      toast("Erro ao marcar como concluída", {
        type: 'error'
      })
    } finally {
      setLoadingMarkAsDone(false)
      setShowDialogConfirmDone(false)
    }
  }

  return (
    <>
      {!isScreenSongsDone && (
        <>
          {/* Spotify button */}
          <ActionButton onClick={openModalInfo}>
            Ver Sobre...
          </ActionButton>
          
          {/* edit button */}
          <ActionButton onClick={openModalEdit}>
            Editar
          </ActionButton>

          {!studentSong.done && !isScreenAllSongs && (
            <button
              className="flex items-center gap-1 text-green-600 transition-colors duration-200 hover:text-green-700 focus:outline-none"
              onClick={() => setShowDialogConfirmDone(true)}
            >
              <IconCheck size={18} />
              Marcar como concluída
            </button>
          )}
        </>
      )}

      {/* delete button (sempre aparece em qualquer tela) */}
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

      {showDialogConfirmDone && (
        <ConfirmationDialog
          title="Marcar como concluída"
          message={`Deseja realmente marcar como concluída a música ${studentSong.songName}?`}
          loading={loadingMarkAsDone}
          onConfirm={() => markAsDone()}
          onClose={() => setShowDialogConfirmDone(false)}
        />
      )}

      <StudentSongFormModal
        studentId={studentId}
        isEdit="true"
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
        studentSongsEdit={studentSong}
      />

      <SpotifyModalInfoIndex
        song={studentSong}
        studentId={studentId}
        isOpen={showModalInfo}
        onClose={() => setShowModalInfo(false)}
      />
    </>
  )
}

export default StudentSongActions
