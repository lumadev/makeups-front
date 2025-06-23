import axios from 'axios'

import { formatDate } from '../utils/date';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// import MakeupFormModal from './form/MakeupFormModal'

function MakeupList({ reloadFlag }) {
  const [makeups, setMakeups] = useState([])

  // const [showModal, setShowModal] = useState(false)
  // const [studentEdit, setStudentEdit] = useState({})

  const getMakeups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/makeups')
      const makeupsData = response.data

      // TODO sort by data

      setMakeups(makeupsData)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    }
  }

  // const openModalEdit = (student) => {
  //   setStudentEdit(student)
  //   setShowModal(true)
  // }

  // const filteredStudents = students.filter((student) => {
  //   const term = searchTerm.toLowerCase()
  //   return (
  //     student.name.toLowerCase().includes(term) ||
  //     student.email.toLowerCase().includes(term) ||
  //     student.phone.toLowerCase().includes(term)
  //   )
  // })

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
                        Data da Reposição
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Estudante
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Data Antiga
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {makeups.map((makeup, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(makeup.dateReposition)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {makeup.studentName}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(makeup.dateOld)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {/* Ações comentadas */}
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
        <div>
          <p className="text-gray-400 font-medium">Nenhuma reposição encontrada :(</p>
        </div>
      )}
    </div>
  )
}

export default MakeupList