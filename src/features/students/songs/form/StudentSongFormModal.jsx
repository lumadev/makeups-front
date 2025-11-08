import { btnClass, btnCancelClass } from '@/common/utils/classes'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveStudentSong, editStudentSong } from "@/features/students/songs/studentSongsService"

import LoadingButton from '@/components/button/LoadingButton'
import Modal from "@/components/Modal"
import StudentSongForm from './StudentSongForm'

function StudentSongFormModal({
  studentId = null,
  screenType,
  isEdit = false,
  isOpen,
  onClose,
  onAfterSave,
  studentSongsEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [studentIdSelected, setStudentIdSelected] = useState(false)
  const [formData, setFormData] = useState({})

  const isStudentAllSongsScreen = screenType === 'student-all-songs'

  const saveOrEdit = () => {
    // only save new songs in student all songs screen
    if (isStudentAllSongsScreen) {
      return saveStudentSong(studentIdSelected, formData)
    }

    if (isEdit) {
      const idStudentSong = formData.id
      return editStudentSong(studentId, idStudentSong, formData)
    } else {
      return saveStudentSong(studentId, formData)
    }
  }

  // for student id selection in autocomplete field
  const handleSelectStudentId = (studentId) => {
    setStudentIdSelected(studentId)
  }

  const save = async () => {
    setLoadingSave(true)
    
    try {
      await saveOrEdit()

      toast("Música salva com sucesso", { 
        type: 'success'
      })

      onAfterSave()
    } catch {
      toast("Ocorreu um erro ao salvar a música", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isEdit && studentSongsEdit) {
      setFormData(studentSongsEdit)
    } else {
      setFormData({
        songName: "",
        artist: "",
        versionLink: "",
        isRecital: false,
        isMusicAudition: false,
        done: false
      })
    }
  }, [isEdit, studentSongsEdit, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      title={isEdit ? 'Editar Música' : 'Adicionar Música'}
      actions={
        <>
          {loadingSave ? (
            <LoadingButton />
          ) : (
            <button 
              onClick={save} 
              className={btnClass}
            >
              {isEdit ? 'Atualizar' : 'Salvar'}
            </button>
          )}
          <button 
            onClick={onClose}
            className={btnCancelClass}
          >
            Cancelar
          </button>
        </>
      }
    >
      <StudentSongForm 
        screenType={screenType}
        formData={formData} 
        setFormData={setFormData}
        handleSelectStudentId={handleSelectStudentId}
      />
    </Modal>
  )
}

export default StudentSongFormModal