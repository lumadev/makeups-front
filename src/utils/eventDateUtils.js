function validateEventDateForm(formData) {
  const error = {
    isValid: false,
    errorMessage: ''
  }

  if (!formData.description) {
    error.errorMessage = 'Descrição não preenchida.'
    return error
  }

  if (!formData.initialDate) {
    error.errorMessage = 'Data inicial não preenchida.'
    return error
  }

  if (!formData.finalDate) {
    error.errorMessage = 'Data final não preenchida.'
    return error
  }
  return false
}

export { validateEventDateForm }