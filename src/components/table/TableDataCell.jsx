function TableDataCell({ children, isBold = false }) {
  const baseClasses = "px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
  const boldClass = isBold ? "font-bold" : ""
  const finalClass = `${boldClass} ${baseClasses}`

  return (
    <td className={finalClass}>
      {children}
    </td>
  )
}

export default TableDataCell
