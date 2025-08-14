import ConfirmationDialogLoading from './ConfirmationDialogLoading'

function ConfirmationDialog({
  title,
  message,
  loading = false,
  onConfirm,
  onClose,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // Fecha ao clicar no backdrop
    >
      <div
        className="relative mx-auto max-w-auto rounded-md border border-slate-100 bg-white p-4 px-6 text-sm shadow-lg"
        onClick={(e) => e.stopPropagation()} // Impede o clique interno de fechar
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 ml-auto text-slate-500 hover:text-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <div className="flex space-x-4 pt-4">
          <div className="flex-1">
            <h4 className="pr-6 font-medium text-slate-900">{title}</h4>
            <div className="mt-1 text-slate-500">{message}</div>

            <div className="mt-3 flex space-x-4">
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`inline-flex items-center font-medium leading-loose text-blue-600 hover:text-blue-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading && (
                  <span className="mr-2">
                    <ConfirmationDialogLoading />
                  </span>
                )}
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="inline-block font-medium leading-loose text-slate-500 hover:text-slate-900"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog
