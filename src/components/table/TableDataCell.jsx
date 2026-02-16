function TableDataCell({ 
  children, 
  isBold = false, 
  variant = "gray"
}) {
  // Mapeamento de cores para facilitar a manutenção
  const colors = {
    gray: "text-gray-500 dark:text-gray-400",
    black: "text-gray-900 dark:text-gray-100"
  }

  const baseClasses = "px-4 py-4 text-sm whitespace-nowrap transition-colors"
  const boldClass = isBold ? "font-bold" : "font-normal"
  const colorClass = colors[variant] || colors.gray

  const finalClass = `${baseClasses} ${boldClass} ${colorClass}`

  return (
    <td className={finalClass}>
      {children}
    </td>
  )
}

export default TableDataCell