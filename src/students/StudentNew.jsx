
import { btnClass } from '../utils/classes'
import { toast } from 'react-toastify'
import { useState } from "react";

import axios from 'axios'

import StudentFormModal from './StudentFormModal'

function StudentNew({ onStudentSaved }) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const addStudent = async () => {
    setLoading(true)

    try {
      await axios.post('http://localhost:3000/students', formData)

      toast("Aluno salvo com sucesso", { 
        type: 'success'
      })

      onStudentSaved()
    } catch {
      toast("Ocorreu um erro ao salvar os dados do aluno", { 
        type: 'error'
      })
    } finally {
      setShowModal(false)
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnClass}
      >
        Novo Aluno
      </button>

      <StudentFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addStudent}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}

export default StudentNew