import { applyMaskPhone } from '../utils/mask'
import { formatDate } from '../utils/date'
import { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { listStudents } from "../services/studentService.js"

import StudentActions from './StudentActions'
import Pagination from '../components/Pagination'
import TableHeaderCell from '../components/table/TableHeaderCell'
import TableDataCell from '../components/table/TableDataCell'
import SkeletonStudentList from '../components/skeleton/SkeletonStudentList'

function StudentList({ searchTerm, reloadFlag, onCountChange }) {
  const isFirstLoad = useRef(true)

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAfterSave, setLoadingAfterSave] = useState(false)

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase()
    return (
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.phone.toLowerCase().includes(term)
    )
  })

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  const getStudents = useCallback(async (isFirstLoad = false) => {
    try {
      const response = await listStudents()
      const students = response.data

      // sort alphabetically
      students.sort((a, b) => a.name.localeCompare(b.name))

      setStudents(students)
      onCountChange(students.length)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [onCountChange])

  const refreshStudents = useCallback(async () => {
    setTimeout(async () => {
      setLoadingAfterSave(true)

      await getStudents()

      setLoadingAfterSave(false)
    }, 1000)
  }, [getStudents])

  useEffect(() => {
    getStudents(true)
  }, [getStudents])

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    // logic triggered only after save new student
    refreshStudents()
  }, [reloadFlag, refreshStudents])

  return (
    <div>
      {loading ? (
        <SkeletonStudentList/>
      ) : (
        <>
          {loadingAfterSave && (
            <div>
              <span>Atualizando lista...</span>
            </div>
          )}

          {students.length > 0 ? (
            <section className="container">
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Nome</TableHeaderCell>
                          <TableHeaderCell>Telefone</TableHeaderCell>
                          <TableHeaderCell>Data do Cadastro</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedStudents.map((student, index) => (
                          <tr key={index}>

                            {/* name and email */}
                            <TableDataCell>
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                    {student.name}
                                  </h2>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {student.email || 'Sem dados'}
                                  </p>
                                </div>
                              </div>
                            </TableDataCell>

                            {/* phone number */}
                            <TableDataCell>
                              {student.phone
                                ? applyMaskPhone('(99) 99999-9999', student.phone)
                                : 'Sem dados'}
                            </TableDataCell>

                            {/* date register */}
                            <TableDataCell>
                              {formatDate(student.dateRegister)}
                            </TableDataCell>
                            
                            {/* actions */}
                            <TableDataCell>
                              <div className="flex items-center gap-x-6">
                                <StudentActions
                                  student={student}
                                  onAfterSave={refreshStudents}
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
              <div class="mx-6 pb-2">
                <Pagination 
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </section>
          ) : (
            <div className="mt-2">
              <p className="text-gray-400 font-medium">Nenhum aluno encontrado :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentList