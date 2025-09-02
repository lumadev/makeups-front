import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteEventDate } from "@/features/eventDates/eventDateService"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import EventDateFormModal from '../form/EventDateFormModal'
import ActionButton from '@/components/button/ActionButton'

function EventDateActions({ eventDate, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

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

  return (
    <>
      {/* edit button */}
      <ActionButton onClick={openModalEdit}>
        Editar
      </ActionButton>

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
