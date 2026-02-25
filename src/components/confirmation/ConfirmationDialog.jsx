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
      className="fixed break-words whitespace-normal inset-0 z-50 flex items-end justify-center bg-black/40 dark:bg-black/70 p-2 sm:items-center sm:p-0"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-lg rounded-t-lg sm:rounded-lg 
          bg-white dark:bg-gray-800
          p-4 sm:p-5 shadow-lg overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="mb-3 flex items-start justify-between w-full">
          <h4 className="font-medium text-slate-900 dark:text-gray-100 break-words w-full pr-4 text-sm sm:text-base">
            {title}
          </h4>

          <button
            onClick={onClose}
            className="ml-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white shrink-0 transition-colors"
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
        </div>

        {/* Mensagem */}
        <div>
          <div className="mb-4 text-slate-600 dark:text-gray-300 break-all w-full text-sm sm:text-base">
            {message}
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-3">
          <button
            onClick={onClose}
            className="
              rounded-md 
              border border-slate-200 dark:border-gray-600
              px-4 py-2 
              text-slate-600 dark:text-gray-300
              hover:bg-slate-50 dark:hover:bg-gray-700
              w-full sm:w-auto text-sm sm:text-base
              transition-colors
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              px-3 py-2 lg:px-4 
              bg-orange-500 hover:bg-orange-600
              text-white text-sm sm:text-base font-semibold 
              rounded 
              disabled:opacity-50 disabled:cursor-not-allowed 
              w-full sm:w-auto
              transition-colors
            "
          >
            {loading && (
              <span className="mr-2 inline-block">
                <ConfirmationDialogLoading />
              </span>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog