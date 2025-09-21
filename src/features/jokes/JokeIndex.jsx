import { useState } from "react"

import InputSearch from '@/components/inputs/InputSearch'
import JokeList from "./list/JokeList"
import JokeGenerateNew from "./JokeGenerateNew"
import JokeButtons from "./JokeButtons"
import JokeNew from "./new/JokeNew"

function JokesIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [totalJokes, setTotalJokes] = useState(0)
  const [jokes, setJokes] = useState([])
  const [reloadFlag, setReloadFlag] = useState(false)

  const reloadJokes = () => setReloadFlag(prev => !prev)

  return (
    <>
      {totalJokes > 0 && (
        <div>
          {/* Button and modal to generate a joke */}
          <div className="flex flex-wrap my-4">
            <div className="mr-4">
              <JokeNew jokes={jokes} onAfterSave={reloadJokes} />
            </div>
            <JokeGenerateNew jokes={jokes} onAfterSave={reloadJokes} />
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
        <InputSearch
          searchTerm={searchTerm}
          label="Buscar piada"
          placeholder="Digite a piada"
          onSearch={setSearchTerm}
        />
      )}

      {/* Jokes list */}
      <JokeList 
        searchTerm={searchTerm} 
        reloadFlag={reloadFlag}
        onCountChange={setTotalJokes}
        setJokesList={setJokes}
      />
    </>
  )
}

export default JokesIndex
