import { btnCancelClass } from "../common/utils/classes"
import Modal from "../components/Modal"

function JokeModal({ isOpen, onClose, joke }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      actions={
        <button onClick={onClose} className={btnCancelClass}>
          Fechar
        </button>
      }
    >
      <div className="p-4 text-lg">
        {joke?.description || "Nenhuma piada disponível"}
      </div>
    </Modal>
  )
}

export default JokeModal
