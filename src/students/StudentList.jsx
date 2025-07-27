import { applyMaskPhone } from '../utils/mask'
import { formatDate } from '../utils/date';
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { listStudents } from "../services/studentService.js";

import StudentActions from './StudentActions'

function StudentList({ searchTerm, reloadFlag, onCountChange }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(true)

  const getStudents = useCallback(async () => {
    try {
      const response = await listStudents()
      const students = response.data

      // sort alphabetically
      students.sort((a, b) => a.name.localeCompare(b.name));

      setStudents(students)
      onCountChange(students.length)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [onCountChange])

  const onAfterSave = async () => {
    setLoadingAfterSave(true)

    await getStudents()

    setLoadingAfterSave(false)
  }

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase()
    return (
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.phone.toLowerCase().includes(term)
    )
  })

  useEffect(() => {
    getStudents()
  }, [reloadFlag, getStudents])

  return (
    <div>
      {loading ? (
        <div>
          <span className="ml-2">Carregando lista...</span>
        </div>
      ) : students.length > 0 ? (
        <section className="container">
          <div>
            <div className="min-w-full py-2 align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Nome
                      </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Telefone
                      </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Data do Cadastro
                      </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Ações
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {filteredStudents.map((student, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {student.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {applyMaskPhone('(99) 99999-9999', student.phone)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(student.dateRegister)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <StudentActions
                              student={student}
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
        <div>
          <p className="text-gray-400 font-medium">Nenhum aluno encontrado :(</p>
        </div>
      )}
    </div>
  )
}

export default StudentList