import { useState, useEffect } from "react"

function Modal({ 
  isOpen, 
  onClose, 
  sizeClass = 'max-w-2xl',
  title,
  children, 
  actions
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                         localStorage.getItem('theme') === 'dark'
      setIsDark(isDarkMode)
    }

    if (isOpen) {
      checkTheme()
      const observer = new MutationObserver(checkTheme)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => observer.disconnect()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center p-2 sm:p-4 overflow-x-hidden overflow-y-auto transition-all ${
        isDark ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/50'
      }`}
      role="dialog"
      onMouseDown={handleOverlayClick}
    >
      <div className={`relative w-full ${sizeClass} max-h-[90vh] sm:max-h-[85vh] px-0 sm:px-4`}>
        
        {/* Card do Modal: Note a mudança na classe 'border' */}
        <div className={`flex flex-col h-full rounded-xl shadow-2xl transition-colors duration-300 border ${
          isDark 
            ? 'bg-[#0b1120] border-white/10 text-white shadow-black/50' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          
          {/* Header */}
          <div className={`flex items-start justify-between p-4 sm:p-5 border-b transition-colors ${
            isDark ? 'border-white/5' : 'border-gray-100'
          }`}>
            <h3 className="text-lg sm:text-xl font-semibold">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 ml-auto inline-flex items-center rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:bg-white/10 hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className={`p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            {children}
          </div>

          {/* Footer */}
          {actions && (
            <div className={`flex flex-wrap gap-2 justify-end items-center p-4 sm:p-6 border-t transition-colors ${
              isDark ? 'border-white/5' : 'border-gray-100'
            }`}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal