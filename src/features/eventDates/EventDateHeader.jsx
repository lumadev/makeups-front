import { useState } from "react"

import ButtonNew from '@/components/button/ButtonNew'
// import EventDateNew from './EventDateNew'
import EventDateFormModal from './form/EventDateFormModal'

function EventDateHeader({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Lado Esquerdo: Título e Descrição */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4 transition-colors duration-200">
          Datas do Evento
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-200">
          Gerencie as datas vinculadas aos eventos.
        </p>
      </div>

      {/* Lado Direito: Botão de Ação */}
      <div className="flex-shrink-0">
        <ButtonNew 
          text="Nova Data de Evento"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Modal */}
      <EventDateFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </div>
  )
}

export default EventDateHeader