import React from 'react'
import { btnClass, backgroundStyle } from '@/common/utils/classes'

function ButtonNew({ onClick, text = '', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${btnClass} flex items-center gap-2 text-white font-semibold rounded-lg transition-colors hover:bg-orange-600 ${className}`}
      style={backgroundStyle} // usa o estilo importado direto
    >
      <span className='text-xl font-bold'>+</span>
      <span>{text}</span>
    </button>
  )
}

export default ButtonNew
