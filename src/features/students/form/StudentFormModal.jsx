
import { btnClass, btnCancelClass } from '@/common/utils/classes'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveStudent, editStudent } from "@/features/students/studentService"

import LoadingButton from '@/components/button/LoadingButton'
import Modal from "@/components/Modal"
import StudentForm from './StudentForm'

function StudentFormModal({
  isEdit = false,
  isOpen,
  onClose,
  onAfterSave,
  studentEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [formData, setFormData] = useState({})
  const [validationErrors, setValidationErrors] = useState({})

  const saveOrEdit = (data) => {
    if (isEdit) {
      const idStudent = data.id
      return editStudent(idStudent, data)
    } else {
      return saveStudent(data)
    }
  }

  const save = async () => {
    const name = formData.name?.trim() ?? ''
    if (!name) {
      setValidationErrors({ name: 'O nome é obrigatório.' })
      return
    }

    setValidationErrors({})
    setLoadingSave(true)
    
    try {
      await saveOrEdit({ ...formData, name })

      toast("Aluno salvo com sucesso", { 
        type: 'success'
      })

      // update list with the student updated
      onAfterSave()
    } catch {
      toast("Ocorreu um erro ao salvar os dados do aluno", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isEdit && studentEdit) {
      setFormData(studentEdit)
    } else {
      setFormData({ name: "", email: "", phone: "" })
    }
    setValidationErrors({})
  }, [isEdit, studentEdit, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      title={isEdit ? 'Editar Aluno' : 'Adicionar Aluno'}
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
      <StudentForm 
        isEdit={isEdit}
        formData={formData} 
        setFormData={setFormData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
    </Modal>
  )
}

export default StudentFormModal