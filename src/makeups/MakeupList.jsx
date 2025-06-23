import axios from 'axios'

import { formatDate, formatDateAndHour } from '../utils/date';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import MakeupFormModal from './form/MakeupFormModal'

function MakeupList({ searchTerm, reloadFlag, onCountChange }) {
  const [makeups, setMakeups] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [makeupEdit, setMakeupEdit] = useState({})

  const getMakeups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/makeups')
      const makeups = response.data

      // TODO sort by data

      setMakeups(makeups)
      onCountChange(makeups.length)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    }
  }

  const openModalEdit = (makeup) => {
    setMakeupEdit(makeup)
    setShowModal(true)
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
  }, [reloadFlag])

  return (
    <div>
      {makeups.length > 0 ? (
        <section className="container mx-auto">
          <div>
            <div className="min-w-full py-2 align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Estudante
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
                            {/* <button 
                              className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              onClick={() => openModalEdit(makeup)}
                            >
                              Editar
                            </button> */}
                            {/* <button
                              className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                            >
                              Excluir
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <MakeupFormModal
              isEdit="true"
              isOpen={showModal}
              makeupEdit={makeupEdit}
              onClose={() => setShowModal(false)}
              onMakeupSaved={getMakeups}
            />
          </div>
        </section>
      ) : (
        <div>
          <p className="text-gray-400 font-medium">Nenhuma reposição encontrada :(</p>
        </div>
      )}
    </div>
  )
}

export default MakeupList