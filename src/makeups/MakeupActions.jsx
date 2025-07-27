import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteMakeup } from "../services/makeupService.js";

import ConfirmationDialog from '../components/ConfirmationDialog';
import MakeupFormModal from './form/MakeupFormModal'

function MakeupActions({ makeup, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)

  const openModalEdit = () => {
    setShowModalEdit(true)
  }

  const deleteMakeupApi = async () => {
    try {
      const makeupId = makeup.id
      await deleteMakeup(makeupId)

      onAfterSave()

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
          message={`Deseja realmente excluir a reposição?`}
          onConfirm={() => deleteMakeupApi()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      <MakeupFormModal
        isEdit="true"
        isOpen={showModalEdit}
        makeupEdit={makeup}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default MakeupActions