function validateEventDateForm(formData) {
  const error = {
    isValid: false,
    errorMessage: ''
  }

  if (!formData.description) {
    error.errorMessage = 'Descrição não preenchida.'
    return error
  }

  if (!formData.eventDate) {
    error.errorMessage = 'Data do evento não preenchida.'
    return error
  }

  return false
}

export { validateEventDateForm }