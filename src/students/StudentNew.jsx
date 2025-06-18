
import { btnClass } from '../utils/classes';
import { toast } from 'react-toastify'
import { useState } from "react";

import axios from 'axios'

import LoadingButton from '../components/LoadingButton';
import Modal from "../components/Modal";
import StudentForm from './StudentForm'

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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar Aluno"
        actions={
          <>
            {loading ? (
              <LoadingButton />
            ) : (
              <button
                onClick={() => addStudent()}
                className={btnClass}
              >
                Salvar
              </button>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm border"
            >
              Cancelar
            </button>
          </>
        }
      >
        <StudentForm formData={formData} setFormData={setFormData} />
      </Modal>
    </>
  )
}

export default StudentNew