
import { btnClass, btnCancelClass } from '../utils/classes';
import { toast } from 'react-toastify'
import { useState } from "react";

import axios from 'axios'

import LoadingButton from '../components/LoadingButton';
import Modal from "../components/Modal";
import MakeupForm from './MakeupForm'

function MakeupNew({ onMakeupSaved }) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: {},
    dateOld: "",
    dateNew: ""
  });

  const addMakeup = async () => {
    setLoading(true)

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
        Nova Reposição
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar Reposição"
        actions={
          <>
            {loading ? (
              <LoadingButton />
            ) : (
              <button
                onClick={() => addMakeup()}
                className={btnClass}
              >
                Salvar
              </button>
            )}

            <button
              onClick={() => setShowModal(false)}
              className={btnCancelClass}
            >
              Cancelar
            </button>
          </>
        }
      >
        <MakeupForm formData={formData} setFormData={setFormData} />
      </Modal>
    </>
  )
}

export default MakeupNew