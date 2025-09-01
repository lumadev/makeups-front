import { btnCancelClass, btnClass } from "@/common/utils/classes"
import Modal from "@/components/Modal"

function JokeModal({ isOpen, onClose, joke, onNextJoke }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeClass="max-w-2xl"
      actions={
        <div className="flex gap-2">
          <button onClick={onNextJoke} className={btnClass}>
            Próxima Piada
          </button>
          <button onClick={onClose} className={btnCancelClass}>
            Fechar
          </button>
        </div>
      }
    >
      <div className="p-4 text-lg">
        {joke?.description || "Nenhuma piada disponível"}
      </div>
    </Modal>
  )
}

export default JokeModal
