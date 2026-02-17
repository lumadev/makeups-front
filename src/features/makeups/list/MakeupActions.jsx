import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteMakeup, markMakeupAsDone } from "@/features/makeups/makeupService"
import { deleteMakeupDone } from "@/features/makeupsDone/makeupDoneService"

import { IconCheck, IconPencil } from '@tabler/icons-react'

import ActionButton from '@/components/button/ActionButton'
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog"
import MakeupFormModal from '../form/MakeupFormModal'

function MakeupActions({ 
  makeup, 
  screenType = 'makeups',
  onAfterSave
}) {
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

      if (screenType === "makeups") {
        await deleteMakeup(makeupId)
      } else {
        await deleteMakeupDone(makeupId)
      }
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
      {screenType === 'makeups-done' ? (
        // Somente botão Excluir
        <ActionButton onClick={() => setShowDialogDelete(true)}>
          Excluir
        </ActionButton>
      ) : (
        // Botões para os outros casos
        <>
          <ActionButton 
            onClick={openModalEdit}
            className="flex items-center gap-2"
          >
            <IconPencil size={12} className="text-orange-500" />
            <span>Editar</span>
          </ActionButton>

          <button
            className="flex items-center gap-1 text-green-600 transition-colors duration-200 hover:text-green-700 focus:outline-none"
            onClick={() => setShowDialogConfirmDone(true)}
          >
            <IconCheck size={18} />
            Marcar como concluída
          </button>
        </>
      )}

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