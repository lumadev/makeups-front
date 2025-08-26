import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteJoke } from "../../../services/jokeService.js"

import ConfirmationDialog from '../../../components/confirmation/ConfirmationDialog'

function JokeActions({ joke, onAfterSave }) {
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const deleteJokeApi = async () => {
    setLoadingDelete(true)

    try {
      const jokeId = joke.id
      await deleteJoke(jokeId)

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
      {/* botão excluir */}
      <button
        className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
        onClick={() => setShowDialogDelete(true)}
      >
        Excluir
      </button>

      {showDialogDelete && (
        <ConfirmationDialog
          title="Excluir piada"
          message={`Deseja realmente excluir a piada: "${joke.description}"?`}
          loading={loadingDelete}
          onConfirm={() => deleteJokeApi()}
          onClose={() => setShowDialogDelete(false)}
        />
      )}
    </>
  )
}

export default JokeActions
