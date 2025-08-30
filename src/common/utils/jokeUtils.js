function validateJokeForm(formData, types) {
  const error = {
    isValid: false,
    errorMessage: ''
  }

  if (!formData.description) {
    error.errorMessage = 'Descrição não preenchida.'
    return error
  }

  if (!formData.type) {
    error.errorMessage = 'Tipo não preenchido.'
    return error
  }

  if (!types.includes(formData.type)) {
    error.errorMessage = 'Tipo inválido. Escolha um tipo existente.'
    return error
  }
  return false
}

/**
 * Hook para extrair tipos únicos de piadas
 * @param {Array} jokes - lista de piadas
 * @returns {Array} types - lista de tipos únicos
 */
function getUniqueTypes(jokes) {
  const jokesCopy = [...jokes]
  return [...new Set(jokesCopy.map(j => j.type))]
}

export { validateJokeForm, getUniqueTypes }
