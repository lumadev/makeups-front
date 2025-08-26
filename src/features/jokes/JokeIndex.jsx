import { useState } from "react"

import JokeList from "./list/JokeList"
import JokeNew from "./JokeNew"
import JokeSearch from "./list/JokeSearch"

function JokesIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [totalJokes, setTotalJokes] = useState(0)
  const [jokes, setJokes] = useState([])

  return (
    <>
      {totalJokes > 0 && (
        <div>
          {/* Simple alert with toast */}
          <div className="mt-4">
            Total de piadas cadastradas: {totalJokes} piadas de tiozão
          </div>

          {/* Button and modal to generate a joke */}
          <div className="flex my-4">
            <JokeNew jokes={jokes} />
          </div>
        </div>
      )}

      {/* Joke search */}
      {totalJokes > 0 && (
        <JokeSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      )}

      {/* Jokes list */}
      <JokeList 
        searchTerm={searchTerm} 
        onCountChange={setTotalJokes}
        setJokesList={setJokes}
      />
    </>
  )
}

export default JokesIndex
