import ButtonNew from '@/components/button/ButtonNew'
import StudentSongFormModal from '@/features/students/songs/form/StudentSongFormModal'

import { useState } from "react"

function StudentAllSongsHeader({ reloadStudentSongs }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Lado Esquerdo: Título e Descrição */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4 transition-colors duration-200">
          Músicas dos Alunos
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-200">
          Gerencie todas as músicas cadastradas para os alunos.
        </p>
      </div>

      {/* Lado Direito: Botão de Ação */}
      <div className="flex-shrink-0">
        <ButtonNew 
          text="Nova Música"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Modal */}
      <StudentSongFormModal
        screenType="student-all-songs"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={reloadStudentSongs}
      />
    </div>
  )
}

export default StudentAllSongsHeader