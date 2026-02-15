/**
 * Verifica se a data de reposição é igual ou posterior à data original
 */
function isValidFutureDate(oldDate, newDate) {
  const dateOld = new Date(oldDate)
  const dateReplacement = new Date(newDate)

  // Compara os timestamps das datas
  return dateReplacement >= dateOld
}

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

  if (!formData.isOpenDate) {
    if (!formData.dateReplacement) {
      error.errorMessage = 'Nova data de reposição não preenchida.'
      return error
    }

    if (!isValidFutureDate(formData.dateOld, formData.dateReplacement)) {
      error.errorMessage = 'A nova data não pode ser anterior à data original.'
      return error
    }
  }

  return false
}

export { validateMakeupForm }