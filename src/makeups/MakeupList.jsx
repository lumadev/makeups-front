import { formatDate, formatDateAndHour } from '../utils/date';
import { useEffect, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { listMakeups } from "../services/makeupService";

import MakeupActions from './MakeupActions'

function MakeupList({ searchTerm, reloadFlag, onCountChange }) {
  const [makeups, setMakeups] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(true)

  const getMakeups = useCallback(async () => {
    try {
      const response = await listMakeups();
      const makeups = response.data;

      // TODO sort by data

      setMakeups(makeups);
      onCountChange(makeups.length);
    } catch {
      toast("Ocorreu um erro ao buscar as reposições", { 
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [onCountChange])

  const onAfterSave = async () => {
    setLoadingAfterSave(true)

    await getMakeups()

    setLoadingAfterSave(false)
  }

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
    getMakeups()
  }, [reloadFlag, getMakeups])

  return (
    <div>
      {loading ? (
        <div>
          <span className="ml-2">Carregando lista...</span>
        </div>
      ) : (
        <>
          {loadingAfterSave && (
            <div>
              <span>Atualizando lista...</span>
            </div>
          )}

          {makeups.length > 0 ? (
            <section className="container mt-2">
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Aluno
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Data da Reposição
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Data Antiga
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {filteredMakeups.map((makeup, index) => (
                          <tr key={index}>
                            <td className="font-bold px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {makeup.studentName}
                            </td>
                            <td className="font-bold px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {formatDateAndHour(makeup.dateReplacement)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {formatDateAndHour(makeup.dateOld)}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <MakeupActions
                                  makeup={makeup}
                                  onAfterSave={onAfterSave}
                                />
                              </div>
                            </td>
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