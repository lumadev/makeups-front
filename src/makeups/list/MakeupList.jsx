import { formatDate, formatDateAndHour } from '../../utils/date'
import { useEffect, useCallback, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { listMakeups } from "../../services/makeupService"

import MakeupActions from './MakeupActions'
import TableHeaderCell from '../../components/TableHeaderCell'
import TableDataCell from '../../components/TableDataCell'

function MakeupList({
  title,
  searchTerm, 
  reloadFlag, 
  onCountChange, 
  setMakeupsList
}) {
  const isFirstLoad = useRef(true)

  const [makeups, setMakeups] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(false)

  const getMakeups = useCallback(async (isFirstLoad = false) => {
    try {
      const response = await listMakeups()
      const makeups = response.data

      setMakeups(makeups)
      setMakeupsList(makeups)
      onCountChange(makeups.length)
    } catch {
      toast("Ocorreu um erro ao buscar as reposições", { 
        type: 'error'
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [onCountChange, setMakeupsList])

  const refreshMakeups = useCallback(async () => {
    setTimeout(async () => {
      setLoadingAfterSave(true)

      await getMakeups()

      setLoadingAfterSave(false)
    }, 1000)
  }, [getMakeups])

  const filteredMakeups = makeups.filter((makeup) => {
    const term = searchTerm.toLowerCase()
    const dateOldMasked = formatDate(makeup.dateOld)
    const dateReplacement = formatDate(makeup.dateReplacement)

    return (
      makeup.studentName.toLowerCase().includes(term) ||
      dateOldMasked.includes(term) ||
      dateReplacement.includes(term)
    )
  })

  useEffect(() => {
    getMakeups(true)
  }, [getMakeups])

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    // logic triggered only after save new makeup
    refreshMakeups()
  }, [reloadFlag, refreshMakeups])

  return (
    <div>
      {loading ? (
        <div>
          <span className="ml-2">Carregando lista...</span>
        </div>
      ) : (
        <>
          {loadingAfterSave && (
            <div className="mb-4">
              <span>Atualizando lista...</span>
            </div>
          )}

          {makeups.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">
                  {title}
                </h2>
                <span className="text-gray-400">
                  {filteredMakeups.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Aluno</TableHeaderCell>
                          <TableHeaderCell>Data da Reposição</TableHeaderCell>
                          <TableHeaderCell>Data Antiga</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {filteredMakeups.map((makeup, index) => (
                          <tr key={index}>
                            {/* Student */}
                            <TableDataCell isBold>
                              {makeup.studentName}
                            </TableDataCell>
                            {/* Replacement Date */}
                            <TableDataCell isBold>
                              {makeup.dateReplacement
                                ? formatDateAndHour(makeup.dateReplacement)
                                : 'Em Aberto'}
                            </TableDataCell>
                            {/* Old class date */}
                            <TableDataCell>
                              {formatDateAndHour(makeup.dateOld)}
                            </TableDataCell>
                            {/* Actions of makeup class */}
                            <TableDataCell>
                              <div className="flex items-center gap-x-6">
                                <MakeupActions
                                  makeup={makeup}
                                  onAfterSave={refreshMakeups}
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
            </section>
          ) : (
            <div className="mt-2">
              <p className="text-gray-400 font-medium">Nenhuma reposição encontrada :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MakeupList
