import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteMakeup, markMakeupAsDone } from "../services/makeupService.js"

import { IconCheck } from '@tabler/icons-react'

import ConfirmationDialog from '../components/ConfirmationDialog'
import MakeupFormModal from './form/MakeupFormModal'

function MakeupActions({ makeup, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogConfirmDone, setShowDialogConfirmDone] = useState(false)

  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingMarkAsDone, setLoadingMarkAsDone] = useState(false)

  const openModalEdit = () => {
    setShowModalEdit(true)
  }

  const deleteMakeupApi = async () => {
    setLoadingDelete(true)

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
      setLoadingDelete(false)
      setShowDialogDelete(false)
    }
  }

  const markAsDone = async () => {
    setLoadingMarkAsDone(true)

    try {
      const makeupId = makeup.id
      await markMakeupAsDone(makeupId)

      toast("Reposição marcada como concluída", { 
        type: 'success'
      })
      onAfterSave()
    } catch {
      toast("Erro ao marcar como concluída", {
        type: 'error'
      })
    } finally {
      setLoadingMarkAsDone(false)
      setShowDialogConfirmDone(false)
    }
  }

  return (
    <>
      {/* edit button */}
      <button 
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => openModalEdit()}
      >
        Editar
      </button>
      {/* delete button */}
      <button
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => setShowDialogDelete(true)}
      >
        Excluir
      </button>
      {/* mark as checked button */}
      <button
        className="flex items-center gap-1 text-green-600 transition-colors duration-200 hover:text-green-700 focus:outline-none"
        onClick={() => setShowDialogConfirmDone(true)}
      >
        <IconCheck size={18} />
        Marcar como concluída
      </button>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir reposição"
          message={`Deseja realmente excluir a reposição do aluno ${makeup.studentName}?`}
          loading={loadingDelete}
          onConfirm={() => deleteMakeupApi()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      {showDialogConfirmDone && (
        <ConfirmationDialog
          title="Marcar como concluída"
          message={`Deseja realmente marcar como concluída a reposição do aluno ${makeup.studentName}?`}
          loading={loadingMarkAsDone}
          onConfirm={() => markAsDone()}
          onClose={() => setShowDialogConfirmDone(false)}
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