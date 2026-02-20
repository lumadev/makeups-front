import { Link } from 'react-router-dom'
import { IconMusic } from '@tabler/icons-react'

const ICON_CONTAINER_BG = '#4a4540'
const ICON_ORANGE = '#e8a84a'

function SidebarHeader({ onNavigate }) {
  return (
    <Link
      to="/home"
      className="hidden md:flex items-center gap-3 mb-8"
      onClick={onNavigate}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ backgroundColor: ICON_CONTAINER_BG }}
      >
        <IconMusic size={18} style={{ color: ICON_ORANGE }} strokeWidth={2} />
      </div>
      <h1 className="hidden md:block text-xl text-white font-bold font-['Cormorant_Garamond',Georgia,serif]">
        Reposições
      </h1>
    </Link>
  )
}

export default SidebarHeader
