import { btnClass } from '@/common/utils/classes'
import { useState } from "react"
import MakeupFormModal from './form/MakeupFormModal'

function MakeupHeader({ onAfterSave }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Lado Esquerdo: Título e Descrição */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">Reposições</h1>
        <p className="text-slate-500 mt-1">
          Gerencie as reposições de aula pendentes.
        </p>
      </div>

      {/* Lado Direito: Botão de Ação */}
      <div className="flex-shrink-0">
        <button
          onClick={() => setShowModal(true)}
          className={`${btnClass} flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors`}
        >
          <span>Nova Reposição</span>
        </button>
      </div>

      {/* Modal */}
      <MakeupFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSave={onAfterSave}
      />
    </div>
  )
}

export default MakeupHeader