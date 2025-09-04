import { formatDate } from '@/common/utils/date'
import { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { listStudents } from "@/features/students/studentService"

import StudentActions from './StudentActions'
import Pagination from '@/components/Pagination'
import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'
import SkeletonStudentList from './SkeletonStudentList'

function StudentList({ searchTerm, reloadFlag, onCountChange }) {
  const isFirstLoad = useRef(true)

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

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
      let students = response.data

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
    setLoading(true)
    await getStudents()
    setLoading(false)
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
          {filteredStudents.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">
                  Alunos
                </h2>
                <span className="text-gray-400">
                  {filteredStudents.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Nome</TableHeaderCell>
                          <TableHeaderCell>Data do Cadastro</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedStudents.map((student, index) => (
                          <tr key={index}>
                            <TableDataCell>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {student.name}
                              </h2>
                            </TableDataCell>

                            <TableDataCell>
                              {formatDate(student.dateRegister)}
                            </TableDataCell>
                            
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
              <p className="text-gray-400 font-medium">Nenhum aluno encontrado :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentList
