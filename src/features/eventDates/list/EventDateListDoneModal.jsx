import { useState } from "react"
import { btnCancelClass } from '@/common/utils/classes'

import ActionButton from '@/components/button/ActionButton'
import Modal from "@/components/Modal"
import EventDateList from "./EventDateList"

function EventDateSongListDoneModal({ eventDate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [eventDateSongCount, setEventDateSongCount] = useState(0)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Botão/Link */}
      <ActionButton
        onClick={() => setIsOpen(true)}
      >
        Visualizar Eventos Concluídos
      </ActionButton>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        sizeClass="max-w-5xl"
        title="Eventos Concluídos"
        actions={
          <>
            <button 
              onClick={onClose}
              className={btnCancelClass}
            >
              Cancelar
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {/* eventDate list */}
          <EventDateList
            eventDate={eventDate}
            screenType="event-dates-done"
            searchTerm={searchTerm}
            onCountChange={setEventDateSongCount}
          />
        </div>
      </Modal>
    </>
  )
}

export default EventDateSongListDoneModal
