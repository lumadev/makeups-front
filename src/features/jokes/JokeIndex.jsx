import { useEffect, useState } from "react"
import { getAllJokes } from "../../services/jokeService"
import { toast } from 'react-toastify'

import JokeNew from "./JokeNew"

function JokesIndex() {
  const [totalJokes, setTotalJokes] = useState(0)
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await getAllJokes()
        const jokes = res.data

        setTotalJokes(jokes.length)
        setJokes(jokes)
      } catch {
        toast("Ocorreu um erro ao buscar as piadas", { 
          type: 'error'
        })
      }
    }
    fetchJokes()
  }, [])

  return (
    <>
      {/* Alerta simples com total */}
      {totalJokes > 0 && (
        <div className="mt-4">
          Total de piadas cadastradas: {totalJokes} piadas de tiozão
        </div>
      )}

      {/* Botão e modal de gerar piada */}
      <div className="flex my-4">
        <JokeNew jokes={jokes} />
      </div>
    </>
  )
}

export default JokesIndex
