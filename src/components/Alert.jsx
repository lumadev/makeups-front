function Alert({ type, children }) {
  let classes = 'p-4 mb-4 rounded border-l-4 '

  if (type === 'warning') {
    classes += 'bg-yellow-100 border-yellow-500 text-yellow-700'
  } else if (type === 'error') {
    classes += 'bg-red-100 border-red-500 text-red-700'
  } else {
    classes += 'bg-gray-100 border-gray-500 text-gray-700'
  }
  classes += ' rounded'

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Alert
