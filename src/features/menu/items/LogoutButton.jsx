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
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 pl-3 pb-3 rounded-md w-full mt-auto text-white text-sm font-medium transition-colors duration-200 hover:bg-white/10 cursor-pointer ${className}`}
      role="button"
      aria-label="Sair"
    >
      <IconLogout size={20} strokeWidth={2} />
      <span className="text-sm font-normal">Sair</span>
    </div>
  )
}

export default LogoutButton