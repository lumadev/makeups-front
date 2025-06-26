
import { btnClass, btnCancelClass } from '../../utils/classes'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

import axios from 'axios'

import LoadingButton from '../../components/LoadingButton'
import Modal from "../../components/Modal";
import MakeupForm from './MakeupForm'

export default function MakeupFormModal({
  isEdit = false,
  isOpen,
  onClose,
  onMakeupSaved,
  makeupEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [formData, setFormData] = useState({})

  const addMakeup = async () => {
    setLoadingSave(true)
    
    try {
      await axios.post('http://localhost:3000/makeups', formData)

      toast("Reposição salva com sucesso", { 
        type: 'success'
      })

      onMakeupSaved()
    } catch {
      toast("Ocorreu um erro ao salvar os dados da reposição", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  const editMakeup = async () => {
    // TODO
  }

  const save = () => {
    if (isEdit) {
      editMakeup()
    } else {
      addMakeup()
    }
  }

  useEffect(() => {
    if (isEdit && makeupEdit) {
      setFormData(makeupEdit)
    } else {
      setFormData({ studentId: {}, dateOld: "", dateReplacement: "" })
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
      <MakeupForm 
        isEdit={isEdit}
        formData={formData} 
        setFormData={setFormData}
      />
    </Modal>
  )
}