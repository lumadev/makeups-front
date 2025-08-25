import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteEventDate } from "../../../services/eventDateService.js"

import ConfirmationDialog from '../../../components/confirmation/ConfirmationDialog'
import EventDateFormModal from '../form/EventDateFormModal'

function EventDateActions({ eventDate, onAfterSave }) {
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showDialogDelete, setShowDialogDelete] = useState(false)

  const [loadingDelete, setLoadingDelete] = useState(false)

  const openModalEdit = () => {
    setShowModalEdit(true)
  }

  const deleteEventDateApi = async () => {
    setLoadingDelete(true)

    try {
      const eventDateId = eventDate.id
      await deleteEventDate(eventDateId)

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
      <button 
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={openModalEdit}
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
