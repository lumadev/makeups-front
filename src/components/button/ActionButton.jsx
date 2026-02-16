function ActionButton({ children, onClick, className = "" }) {
  return (
    <button
      className={`text-orange-500 transition-colors duration-200 hover:text-orange-600 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
