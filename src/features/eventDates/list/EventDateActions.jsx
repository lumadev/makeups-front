import { IconCheck } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteEventDate, editEventDate } from "@/features/eventDates/eventDateService"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import EventDateFormModal from '../form/EventDateFormModal'
import ActionButton from '@/components/button/ActionButton'

function EventDateActions({ 
  eventDate,
  screenType,
  onAfterSave
}) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogConfirmDone, setShowDialogConfirmDone] = useState(false)

  const [loadingMarkAsDone, setLoadingMarkAsDone] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const isScreenEventsDone = screenType === 'event-dates-done'

  const openModalEdit = () => setShowModalEdit(true)

  const deleteEventDateApi = async () => {
    setLoadingDelete(true)
    try {
      await deleteEventDate(eventDate.id)
      onAfterSave()
      
      toast("Data de evento excluída com sucesso", {
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir a data de evento", {
        type: 'error'
      })
    } finally {
      setLoadingDelete(false)
      setShowDialogDelete(false)
    }
  }

  const markAsDone = async () => {
    const eventDateUpdated = { ...eventDate, done: true }

    setLoadingMarkAsDone(true)

    try {
      await editEventDate(eventDate.id, eventDateUpdated)

      toast("Evento marcado como concluído", { 
        type: 'success'
      })
      onAfterSave()
    } catch {
      toast("Erro ao marcar o evento como concluído", {
        type: 'error'
      })
    } finally {
      setLoadingMarkAsDone(false)
      setShowDialogConfirmDone(false)
    }
  }

  return (
    <>
      {!isScreenEventsDone && (
        <>
          {/* edit button */}
          <ActionButton onClick={openModalEdit}>
            Editar
          </ActionButton>

          {/* mark as checked button */}
          <button
            className="flex items-center gap-1 text-green-600 transition-colors duration-200 hover:text-green-700 focus:outline-none"
            onClick={() => setShowDialogConfirmDone(true)}
          >
            <IconCheck size={18} />
            Marcar como concluída
          </button>
        </>
      )}

      {/* delete button */}
      <ActionButton onClick={() => setShowDialogDelete(true)}>
        Excluir
      </ActionButton>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir data de evento"
          message={`Deseja realmente excluir a data de evento ${eventDate.description || ''}?`}
          loading={loadingDelete}
          onConfirm={deleteEventDateApi}
          onClose={() => setShowDialogDelete(false)}
        />
      )}

      {showDialogConfirmDone && (
        <ConfirmationDialog
          title="Marcar como concluída"
          message={`Deseja realmente marcar a data de evento ${eventDate.description} como concluída?`}
          loading={loadingMarkAsDone}
          onConfirm={() => markAsDone()}
          onClose={() => setShowDialogConfirmDone(false)}
        />
      )}

      <EventDateFormModal
        isEdit={true}
        isOpen={showModalEdit}
        eventDateEdit={eventDate}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default EventDateActions
