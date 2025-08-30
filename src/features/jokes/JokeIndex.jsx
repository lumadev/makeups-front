import { useState } from "react"

import JokeList from "./list/JokeList"
import JokeGenerateNew from "./JokeGenerateNew"
import JokeButtons from "./JokeButtons"
import JokeSearch from "./list/JokeSearch"
import JokeNew from "./new/JokeNew"

function JokesIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [totalJokes, setTotalJokes] = useState(0)
  const [jokes, setJokes] = useState([])

  return (
    <>
      {totalJokes > 0 && (
        <div>
          {/* Button and modal to generate a joke */}
          <div className="flex flex-wrap my-4">
            <div className="mr-4">
              <JokeNew jokes={jokes} />
            </div>
            <JokeGenerateNew jokes={jokes} />
          </div>
        </div>
      )}

      {totalJokes > 0 && (
        <div className="flex my-4">
          <JokeButtons jokes={jokes} />
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
