import { btnClass, btnCancelClass } from '../../../common/utils/classes'
import { validateJokeForm } from '../../../common/utils/jokeUtils'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveJoke } from "../../../services/jokeService"

import Alert from '../../../components/Alert'
import LoadingButton from '../../../components/button/LoadingButton'
import Modal from "../../../components/Modal"
import JokeForm from './JokeForm'

function JokeFormModal({
  isOpen,
  onClose,
  onAfterSave,
  jokes
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [formData, setFormData] = useState({})

  const save = async () => {
    const error = validateJokeForm(formData)
    if (error) {
      setValidationMessage(error.errorMessage)
      return
    }
    setValidationMessage('')
    setLoadingSave(true)
    
    try {
      await saveJoke(formData)

      toast("Piada salva com sucesso", { 
        type: 'success'
      })

      onAfterSave()
    } catch {
      toast("Ocorreu um erro ao salvar a piada", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  useEffect(() => {
    setFormData({
      description: "", 
      type: "", 
    })
    // always clear validation message when open modal
    setValidationMessage('')
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Piada"
      actions={
        <>
          {loadingSave ? (
            <LoadingButton />
          ) : (
            <button 
              onClick={save} 
              className={btnClass}
            >
              Salvar
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
      <JokeForm 
        jokes={jokes}
        formData={formData} 
        setFormData={setFormData}
      />
    </Modal>
  )
}

export default JokeFormModal
