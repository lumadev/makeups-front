import { formatDate, formatDateAndHour } from '@/common/utils/date'
import { useEffect, useCallback, useState, useRef } from 'react'
import { toast } from 'react-toastify'

import { listMakeups } from "@/features/makeups/makeupService"
import { listMakeupsDone } from "@/services/makeupDoneService"

import MakeupActions from './MakeupActions'
import Pagination from "@/components/Pagination"
import TableHeaderCell from "@/components/table/TableHeaderCell"
import TableDataCell from "@/components/table/TableDataCell"
import SkeletonMakeupList from "@/components/skeleton/SkeletonMakeupList"

function MakeupList({
  title,
  screenType = 'makeups',
  searchTerm, 
  onCountChange, 
  setMakeupsList = null,
  reloadFlag = null, 
}) {
  const isFirstLoad = useRef(true)
  const isScreenMakeups = screenType === 'makeups'

  const [makeups, setMakeups] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(false)

  // filter based on filter search
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredMakeups.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMakeups = filteredMakeups.slice(startIndex, startIndex + itemsPerPage)

  const getMakeups = useCallback(async (isFirstLoad = false) => {
    try {
      let response

      if (screenType === 'makeups') {
        response = await listMakeups()
      } else if (screenType === 'makeups-done') {
        response = await listMakeupsDone()
      } else {
        throw new Error("Tipo de tela inválido")
      }
      const makeups = response.data
      setMakeups(makeups)

      // executes only if setMakeupsList is not null
      setMakeupsList?.(makeups)
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
  }, [onCountChange, setMakeupsList, screenType])

  const refreshMakeups = useCallback(async () => {
    setTimeout(async () => {
      setLoadingAfterSave(true)

      await getMakeups()

      setLoadingAfterSave(false)
    }, 1000)
  }, [getMakeups])

  useEffect(() => {
    getMakeups(true)
  }, [getMakeups])

  
  // logic triggered only after save new makeup
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    refreshMakeups()
  }, [reloadFlag, refreshMakeups])

  return (
    <div>
      {loading ? (
        <SkeletonMakeupList isMakeupsList={screenType === 'makeups'} />
      ) : (
        <>
          {loadingAfterSave && (
            <div className="mb-4">
              <span>Atualizando lista...</span>
            </div>
          )}

          {filteredMakeups.length > 0 ? (
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
                          {isScreenMakeups && (
                            <TableHeaderCell>Ações</TableHeaderCell>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedMakeups.map((makeup, index) => (
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
                            {isScreenMakeups && (
                              <TableDataCell>
                                <div className="flex items-center gap-x-6">
                                  <MakeupActions
                                    makeup={makeup}
                                    onAfterSave={refreshMakeups}
                                  />
                                </div>
                              </TableDataCell>
                            )}
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
              <p className="text-gray-400 font-medium">Nenhuma reposição encontrada :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MakeupList
