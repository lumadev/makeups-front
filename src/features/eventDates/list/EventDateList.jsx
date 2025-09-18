import { formatDateAndHour } from '@/common/utils/date'
import { useEffect, useCallback, useState, useRef } from 'react'
import { toast } from 'react-toastify'

import { listDoneEventDates, listNotDoneEventDates } from "@/features/eventDates/eventDateService"

import EventDateActions from './EventDateActions'
import Pagination from '@/components/Pagination'
import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'
import SkeletonEventDateList from './SkeletonEventDateList'

function EventDateList({
  title,
  screenType = 'event-dates-not-done',
  searchTerm,
  onCountChange,
  setEventDatesList = null,
  reloadFlag = null,
  onlyConfirmed
}) {
  const isFirstLoad = useRef(true)

  const [eventDates, setEventDates] = useState([])
  const [loading, setLoading] = useState(true)

  // filter by search term
  const filteredEventDates = eventDates.filter((eventDate) => {
    const term = searchTerm.toLowerCase()
    const startDate = formatDateAndHour(eventDate.initialDate)
    const endDate = formatDateAndHour(eventDate.finalDate)
    const observations = eventDate.observations?.toLowerCase() || ""
    const description = eventDate.description?.toLowerCase() || ""

    const matchesSearch = 
      startDate.includes(term) ||
      endDate.includes(term) ||
      observations.includes(term) ||
      description.includes(term)

    const matchesConfirmed = onlyConfirmed ? eventDate.confirmed === true : true

    return matchesSearch && matchesConfirmed
  })

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredEventDates.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEventDates = filteredEventDates.slice(startIndex, startIndex + itemsPerPage)

  const getEventDates = useCallback(async (isFirstLoad = false) => {
    try {
      let response
      if (screenType === 'event-dates-not-done') {
        response = await listNotDoneEventDates()

      } else if (screenType === 'event-dates-done') {
        response = await listDoneEventDates()
      }
      const data = response.data
      const sortedData = data.sort((a, b) => new Date(a.initialDate) - new Date(b.initialDate))

      setEventDates(sortedData)

      setEventDatesList?.(sortedData)
      onCountChange(sortedData.length)
    } catch {
      toast("Ocorreu um erro ao buscar as datas de evento", { 
        type: 'error'
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [onCountChange, setEventDatesList, screenType])

  const refreshEventDates = useCallback(async () => {
    setLoading(true)
    await getEventDates()
    setLoading(false)
  }, [getEventDates])

  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  useEffect(() => {
    getEventDates(true)
  }, [getEventDates])

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    refreshEventDates()
  }, [reloadFlag, refreshEventDates])

  return (
    <div>
      {loading ? (
        <SkeletonEventDateList />
      ) : (
        <>
          {filteredEventDates.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{title}</h2>
                <span className="text-gray-400">
                  {filteredEventDates.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Descrição</TableHeaderCell>
                          <TableHeaderCell>Data de Início</TableHeaderCell>
                          <TableHeaderCell>Data do Fim</TableHeaderCell>
                          <TableHeaderCell>Observações</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedEventDates.map((eventDate, index) => (
                          <tr key={index}>
                            <TableDataCell>
                              {eventDate.description}
                            </TableDataCell>
                            <TableDataCell>
                              {formatDateAndHour(eventDate.initialDate)}
                            </TableDataCell>
                            <TableDataCell>
                              {formatDateAndHour(eventDate.finalDate)}
                            </TableDataCell>
                            <TableDataCell>
                              {eventDate.observations ? truncateText(eventDate.observations, 25) : "-"}
                            </TableDataCell>
                            <TableDataCell>
                              <div className="flex items-center gap-x-6">
                                <EventDateActions
                                  eventDate={eventDate}
                                  screenType={screenType}
                                  onAfterSave={refreshEventDates}
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
              <p className="text-gray-400 font-medium">Nenhuma data de evento encontrada :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EventDateList
