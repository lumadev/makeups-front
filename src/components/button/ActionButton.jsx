function ActionButton({ children, onClick, className = "" }) {
  return (
    <button
      className={`text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
