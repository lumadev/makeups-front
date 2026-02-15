import { useState, useEffect } from 'react'

/**
 * Hook que observa uma media query e retorna se ela corresponde à viewport atual.
 * Usa matchMedia para eficiência (não depende de evento resize).
 *
 * @param {string} query - Media query (ex: '(max-width: 767px)')
 * @returns {boolean} true se a query corresponde
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
