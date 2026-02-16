import { useNavigate } from 'react-router-dom'
import { IconLogout } from '@tabler/icons-react'
import { STORAGE_KEYS } from '@/constants/storageKeys'

function LogoutButton({ onClick, className = '' }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (e?.preventDefault) e.preventDefault()
    onClick?.(e)

    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.NAME)
    localStorage.removeItem(STORAGE_KEYS.USER_TYPE)
    localStorage.removeItem(STORAGE_KEYS.LAST_REQUEST_HOUR)

    navigate('/login')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-white hover:bg-white/5 transition-colors duration-200 mt-auto ${className}`.trim()}
      aria-label="Sair"
    >
      <IconLogout size={20} strokeWidth={2} />
      <span className="text-sm font-medium">Sair</span>
    </button>
  )
}

export default LogoutButton
