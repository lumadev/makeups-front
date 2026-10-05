function validateMakeupForm(formData) {
  const error = {
    isValid: false,
    fieldName: '',
    errorMessage: ''
  }

  if (!formData.studentId) {
    error.fieldName = 'studentId'
    error.errorMessage = 'Estudante não selecionado.'
    return error
  }

  if (!formData.dateOld) {
    error.fieldName = 'dateOld'
    error.errorMessage = 'Data antiga da reposição não preenchida.'
    return error
  }

  if (!formData.isOpenDate) {
    if (!formData.dateReplacement) {
      error.fieldName = 'dateReplacement'
      error.errorMessage = 'Nova data de reposição não preenchida.'
      return error
    }
  }

  return false
}

export { validateMakeupForm }