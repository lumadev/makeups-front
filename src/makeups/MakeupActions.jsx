import { toast } from 'react-toastify'
import { useState } from 'react'

import axios from 'axios'

import ConfirmationDialog from '../components/ConfirmationDialog';
import MakeupFormModal from './form/MakeupFormModal'

function MakeupActions({ makeup, getMakeups }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)

  const openModalEdit = () => {
    setShowModalEdit(true)
  }

  const deleteMakeup = async () => {
    try {
      const makeupId = makeup.id
      await axios.delete(`http://localhost:3000/makeups/${makeupId}`)

      getMakeups()

      toast("Reposição excluída com sucesso", { 
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir a reposição", { 
        type: 'error'
      })
    } finally {
      setShowDialogDelete(false)
    }
  }

  return (
    <>
      <button 
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => openModalEdit()}
      >
        Editar
      </button>
      <button
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => setShowDialogDelete(true)}
      >
        Excluir
      </button>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir reposição"
          message={`Sr. Weslley, deseja realmente excluir a reposição?`}
          onConfirm={() => deleteMakeup()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      <MakeupFormModal
        isEdit="true"
        isOpen={showModalEdit}
        makeupEdit={makeup}
        onClose={() => setShowModalEdit(false)}
        onMakeupSaved={getMakeups}
      />
    </>
  )
}

export default MakeupActions