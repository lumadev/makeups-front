function validateMakeupForm(formData) {
  const error = {
    isValid: false,
    errorMessage: ''
  }

  if (!formData.studentId) {
    error.errorMessage = 'Estudante não selecionado.'
    return error
  }

  if (!formData.dateOld) {
    error.errorMessage = 'Data antiga da reposição não preenchida.'
    return error
  }

  if (!formData.isOpenDate && !formData.dateReplacement) {
    error.errorMessage = 'Nova data de reposição não preenchida.'
    return error
  }
  return false
}

export { validateMakeupForm }