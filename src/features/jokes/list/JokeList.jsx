import { useEffect, useCallback, useState } from "react"
import { toast } from "react-toastify"

import JokeActions  from './JokeActions'
import Pagination from "../../../components/Pagination"
import TableHeaderCell from "../../../components/table/TableHeaderCell"
import TableDataCell from "../../../components/table/TableDataCell"
import SkeletonJokeList from "../../../components/skeleton/SkeletonJokeList"

import { getAllJokes } from "../../../services/jokeService"

function JokeList({
  searchTerm,
  onCountChange,
  setJokesList = null,
}) {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(false)

  // filter by search term
  const filteredJokes = jokes.filter((joke) => {
    const term = searchTerm.toLowerCase()
    return (
      joke.description.toLowerCase().includes(term) ||
      joke.type.toLowerCase().includes(term)
    )
  })

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredJokes.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJokes = filteredJokes.slice(startIndex, startIndex + itemsPerPage)

  // get jokes
  const getJokes = useCallback(async (isFirstLoad = false) => {
    try {
      const response = await getAllJokes()
      const data = response.data

      const reversedData = [...data].reverse()

      setJokes(reversedData)
      setJokesList?.(data)
      onCountChange(data.length)
    } catch {
      toast("Ocorreu um erro ao buscar as piadas", {
        type: "error",
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [onCountChange, setJokesList])

  const refreshJokes = useCallback(async () => {
    setTimeout(async () => {
      setLoadingAfterSave(true)

      await getJokes()

      setLoadingAfterSave(false)
    }, 1000)
  }, [getJokes])

  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  useEffect(() => {
    getJokes(true)
  }, [getJokes])

  return (
    <div>
      {loading ? (
        <SkeletonJokeList />
      ) : (
        <>
          {loadingAfterSave && (
            <div className="mb-4">
              <span>Atualizando lista...</span>
            </div>
          )}

          {filteredJokes.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Piadas</h2>
                <span className="text-gray-400">
                  {filteredJokes.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Descrição</TableHeaderCell>
                          <TableHeaderCell>Tipo</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedJokes.map((joke, index) => (
                          <tr key={index}>
                            <TableDataCell>
                              {truncateText(joke.description, 200)}
                            </TableDataCell>

                            <TableDataCell>{joke.type}</TableDataCell>

                            <TableDataCell>
                                <div className="flex items-center gap-x-6">
                                  <JokeActions 
                                    joke={joke}
                                    onAfterSave={refreshJokes}
                                  />
                                </div>
                              </TableDataCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-6 pb-2">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </section>
          ) : (
            <div className="mt-2">
              <p className="text-gray-400 font-medium">Nenhuma piada encontrada :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JokeList
