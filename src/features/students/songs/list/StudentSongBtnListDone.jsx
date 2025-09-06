import { useState } from "react"
import { btnCancelClass } from '@/common/utils/classes'

import ActionButton from '@/components/button/ActionButton'
import Modal from "@/components/Modal"

import StudentSongsSearch from "./StudentSongsSearch"
import StudentSongsList from "./StudentSongsList"

function StudentSongBtnListDone({ student }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [studentSongCount, setStudentSongCount] = useState(0)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Botão/Link */}
      <ActionButton
        onClick={() => setIsOpen(true)}
      >
        Visualizar Concluídas
      </ActionButton>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        sizeClass="max-w-4xl"
        title="Músicas Concluídas"
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

          {/* studentSongs search */}
          {studentSongCount > 0 && (
            <StudentSongsSearch
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
          )}

          {/* studentSongs list */}
          <StudentSongsList
            student={student}
            screenType="songs-done"
            searchTerm={searchTerm}
            onCountChange={setStudentSongCount}
          />
        </div>
      </Modal>
    </>
  )
}

export default StudentSongBtnListDone