function Alert({ type = "info", children }) {
  let classes = "p-4 mb-4 rounded-lg flex items-center gap-2 shadow-sm"

  if (type === "info") {
    classes += " bg-gray-100 text-orange-700 border border-gray-300 dark:bg-gray-800 dark:text-orange-300 dark:border-gray-600"
  } else if (type === "warning") {
    classes += " bg-gray-100 text-amber-700 border border-gray-300 dark:bg-gray-800 dark:text-amber-300 dark:border-gray-600"
  } else if (type === "error") {
    classes += " bg-gray-100 text-red-700 border border-gray-300 dark:bg-gray-800 dark:text-red-200 dark:border-gray-600"
  } else {
    classes += " bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
  }

  return <div className={classes}>{children}</div>
}

export default Alert
