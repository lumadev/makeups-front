import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteJoke } from "../../../services/jokeService.js"

import ConfirmationDialog from '@/components/confirmation/ConfirmationDialog'
import ActionButton from '@/components/button/ActionButton'

function JokeActions({ joke, onAfterSave }) {
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const deleteJokeApi = async () => {
    setLoadingDelete(true)
    try {
      await deleteJoke(joke.id)
      onAfterSave()

      toast("Piada excluída com sucesso", {
        type: 'success'
      })
    } catch {
      toast("Ocorreu um erro ao excluir a piada", {
        type: 'error'
      })
    } finally {
      setLoadingDelete(false)
      setShowDialogDelete(false)
    }
  }

  return (
    <>
      {/* delete button */}
      <ActionButton onClick={() => setShowDialogDelete(true)}>
        Excluir
      </ActionButton>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir piada"
          message={`Deseja realmente excluir a piada: "${joke.description}"?`}
          loading={loadingDelete}
          onConfirm={deleteJokeApi}
          onClose={() => setShowDialogDelete(false)}
        />
      )}
    </>
  )
}

export default JokeActions
