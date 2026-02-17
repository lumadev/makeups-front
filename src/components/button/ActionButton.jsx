import { colorStyle } from '@/common/utils/classes'

function ActionButton({ children, onClick, className = "" }) {
  return (
    <button
      className={`transition-colors duration-200 hover:text-orange-600 focus:outline-none ${className}`}
      onClick={onClick}
      style={colorStyle}
    >
      {children}
    </button>
  )
}

export default ActionButton
