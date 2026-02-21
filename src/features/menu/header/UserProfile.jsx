import { Link } from 'react-router-dom'

const PROFILE_BG = '#272A32'
const PRIMARY_ORANGE = '#FF8C00'

function getInitials(name) {
  if (!name || typeof name !== 'string') return '??'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function UserProfile({ userName, userType, onNavigate }) {
  return (
    <Link
      to="/home"
      className="md:flex items-center gap-3 mb-8"
      onClick={onNavigate}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-6"
        style={{ backgroundColor: PROFILE_BG }}
      >
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-white font-semibold text-sm"
          style={{ backgroundColor: PRIMARY_ORANGE }}
        >
          {getInitials(userName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm truncate">{userName || 'Usuário'}</p>
          {userType === 'admin' && (
            <p className="text-xs text-gray-400 font-normal">Administrador</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default UserProfile
