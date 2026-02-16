import { Link } from 'react-router-dom'
import { IconMusic } from '@tabler/icons-react'

const PRIMARY_ORANGE = '#FF8C00'

function SidebarHeader({ onNavigate }) {
  return (
    <Link
      to="/reposicoes"
      className="flex items-center gap-3 mb-8"
      onClick={onNavigate}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
        style={{ backgroundColor: PRIMARY_ORANGE }}
      >
        <IconMusic size={24} className="text-white" strokeWidth={2} />
      </div>
      <h1 className="hidden md:block text-xl text-white font-bold font-['Cormorant_Garamond',Georgia,serif]">
        Reposições
      </h1>
    </Link>
  )
}

export default SidebarHeader
