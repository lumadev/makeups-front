function isValidDate(value) {
  if (!value) return false
  const date = value instanceof Date ? value : new Date(value)
  return !Number.isNaN(date.getTime())
}

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

  if (!isValidDate(formData.dateOld)) {
    error.fieldName = 'dateOld'
    error.errorMessage = 'Preencha todos os campos da data antiga da reposição.'
    return error
  }

  if (!formData.isOpenDate) {
    if (!isValidDate(formData.dateReplacement)) {
      error.fieldName = 'dateReplacement'
      error.errorMessage = 'Preencha todos os campos da data de reposição.'
      return error
    }
  }

  return false
}

export { validateMakeupForm }