/**
 * Retorna uma piada aleatória da lista, evitando repetir a piada excluída.
 * @param {Array} jokes - Lista de piadas.
 * @param {any} excludeJoke - Piada a ser evitada.
 * @returns {any|null} - Piada aleatória ou null se a lista estiver vazia.
 */
export function getRandomJoke(jokes, excludeJoke = null) {
  if (!jokes || jokes.length === 0) return null

  let randomJoke = null
  let attempts = 0

  do {
    const randomIndex = Math.floor(Math.random() * jokes.length)
    randomJoke = jokes[randomIndex]
    attempts++
  } while (randomJoke === excludeJoke && attempts < 10)

  return randomJoke
}
