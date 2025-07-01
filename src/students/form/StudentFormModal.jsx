
import { btnClass, btnCancelClass } from '../../utils/classes'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

import axios from 'axios'

import LoadingButton from '../../components/LoadingButton'
import Modal from "../../components/Modal";
import StudentForm from './StudentForm'

export default function StudentFormModal({
  isEdit = false,
  isOpen,
  onClose,
  onStudentSaved,
  studentEdit = null
}) {
  const [loadingSave, setLoadingSave] = useState(false)
  const [formData, setFormData] = useState({})

  const addStudent = async () => {
    setLoadingSave(true)

    try {
      await axios.post('http://localhost:3000/students', formData)

      toast("Aluno salvo com sucesso", { 
        type: 'success'
      })

      // update list with the student updated
      onStudentSaved()
    } catch {
      toast("Ocorreu um erro ao salvar os dados do aluno", { 
        type: 'error'
      })
    } finally {
      onClose()
      setLoadingSave(false)
    }
  }
  
  const editStudent = async () => {
    setLoadingSave(true)

    const idStudent = formData.id
    try {
      await axios.patch(`http://localhost:3000/students/${idStudent}`, formData)

      toast("Aluno salvo com sucesso", { 
        type: 'success'
      })

      // update list with the student updated
      onStudentSaved()
    } catch {
      toast("Ocorreu um erro ao editar o aluno", { 
        type: 'error'
      })
    } finally {
      setLoadingSave(false)
      onClose()
    }
  }

  const save = () => {
    if (isEdit) {
      editStudent()
    } else {
      addStudent()
    }
  }

  useEffect(() => {
    if (isEdit && studentEdit) {
      setFormData(studentEdit)
    } else {
      setFormData({ name: "", email: "", phone: "" })
    }
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
      />
    </Modal>
  )
}