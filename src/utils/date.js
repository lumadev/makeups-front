function formatDate(dateString) {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // mês é zero-based
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

function formatDateAndHour(dateString) {
  const dateFormatted = formatDate(dateString)

  const date = new Date(dateString)

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${dateFormatted} ${hours}:${minutes}`
}

export { formatDate, formatDateAndHour }