function Modal({ 
  isOpen, 
  onClose, 
  sizeClass = 'max-w-2xl',
  title,
  children, 
  actions
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // fecha ao clicar no backdrop
    >
      <div
        className={`relative w-full ${sizeClass} px-4 h-auto`}
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar no conteúdo
      >
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">{children}</div>

          {/* Footer */}
          <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
