import { useState } from "react"
import { IconPencil } from "@tabler/icons-react"

import MakeupFormModal from "@/features/makeups/form/MakeupFormModal"

function MakeupCalendarEventItem({
  makeup,
  dateObj,
  isDark = false,
  onAfterSave = () => {}
}) {
  const [showModalEdit, setShowModalEdit] = useState(false)

  return (
    <>
      <div
        className={`text-xs px-2 py-1 rounded-lg font-medium flex items-center justify-between gap-2
          ${isDark
            ? "bg-blue-600 text-white"
            : "bg-blue-500 text-white"
          }
        `}
      >
        <span className="truncate">
          {makeup.studentName} -{" "}
          {dateObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>

        <button
          type="button"
          aria-label={`Editar reposição de ${makeup.studentName}`}
          onClick={() => setShowModalEdit(true)}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-white/20"
        >
          <IconPencil size={14} />
        </button>
      </div>

      <MakeupFormModal
        isEdit={true}
        isOpen={showModalEdit}
        makeupEdit={makeup}
        onClose={() => setShowModalEdit(false)}
        onAfterSave={onAfterSave}
      />
    </>
  )
}

export default MakeupCalendarEventItem