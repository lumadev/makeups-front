
import { btnClass, btnCancelClass } from '../../utils/classes'
import { validateMakeupForm } from '../../utils/makeupUtils'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveMakeup, editMakeup } from "../../services/makeupService";

import Alert from '../../components/Alert';
import LoadingButton from '../../components/LoadingButton'
import Modal from "../../components/Modal";
import MakeupForm from './MakeupForm'

function MakeupFormModal({
  isEdit = false,
  isOpen,
  onClose,
  onAfterSave,
  makeupEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [formData, setFormData] = useState({})

  const saveOrEdit = () => {
    if (isEdit) {
      const idMakeup = makeupEdit.id
      return editMakeup(idMakeup, formData)
    } else {
      return saveMakeup(formData)
    }
  }

  const save = async () => {
    const error = validateMakeupForm(formData)
    if (error) {
      setValidationMessage(error.errorMessage)
      return
    }
    setValidationMessage('')
    setLoadingSave(true)
    
    try {
      await saveOrEdit()

      toast("Reposição salva com sucesso", { 
        type: 'success'
      })

      onAfterSave()
    } catch {
      toast("Ocorreu um erro ao salvar os dados da reposição", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isEdit && makeupEdit) {
      setFormData(makeupEdit)
    } else {
      setFormData({ 
        studentId: "", 
        dateOld: "", 
        dateReplacement: "",
        isOpenDate: false
      })
    }
  }, [isEdit, makeupEdit, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Editar Reposição' : 'Adicionar Reposição'}
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
      <MakeupForm 
        isEdit={isEdit}
        makeupEdit={makeupEdit}
        formData={formData} 
        setFormData={setFormData}
      />
    </Modal>
  )
}

export default MakeupFormModal