import { btnClass, btnCancelClass } from '@/common/utils/classes'
import { validateEventDateForm } from '@/common/utils/eventDateUtils'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveEventDate, editEventDate } from "@/features/eventDates/eventDateService"

import Alert from '@/components/Alert'
import LoadingButton from '@/components/button/LoadingButton'
import Modal from "@/components/Modal"
import EventDateForm from './EventDateForm'

function EventDateFormModal({
  isEdit = false,
  isOpen,
  onClose,
  onAfterSave,
  eventDateEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [formData, setFormData] = useState({})

  const saveOrEdit = () => {
    if (isEdit) {
      const idEventDate = eventDateEdit.id
      return editEventDate(idEventDate, formData)
    } else {
      return saveEventDate(formData)
    }
  }

  const save = async () => {
    const error = validateEventDateForm(formData)
    if (error) {
      setValidationMessage(error.errorMessage)
      return
    }
    setValidationMessage('')
    setLoadingSave(true)
    
    try {
      await saveOrEdit()

      toast("Data do evento salva com sucesso", { 
        type: 'success'
      })

      onAfterSave()
    } catch {
      toast("Ocorreu um erro ao salvar os dados da data do evento", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isEdit && eventDateEdit) {
      setFormData(eventDateEdit)
    } else {
      setFormData({ 
        eventDate: "", 
        observations: "",
        done: false
      })
    }
    // always clear validation message when open modal
    setValidationMessage('')
  }, [isEdit, eventDateEdit, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Editar Data de Evento' : 'Adicionar Data de Evento'}
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
      {validationMessage && (
        <Alert type="error">
          {validationMessage}
        </Alert>
      )}
      <EventDateForm 
        isEdit={isEdit}
        eventDateEdit={eventDateEdit}
        formData={formData} 
        setFormData={setFormData}
      />
    </Modal>
  )
}

export default EventDateFormModal