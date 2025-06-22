import axios from 'axios'

import { formatDate } from '../utils/date';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import StudentFormModal from './form/StudentFormModal'

function StudentList({ searchTerm, reloadFlag, onCountChange }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [studentEdit, setStudentEdit] = useState({})

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students')
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
  }

  const openModalEdit = (student) => {
    setStudentEdit(student)
    setShowModal(true)
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
  }, [reloadFlag])

  return (
    <div>
      {!loading && students.length > 0 ? (
        <section className="container mx-auto">
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
                          {student.phone}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(student.dateRegister)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button 
                              className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              onClick={() => openModalEdit(student)}
                            >
                              Editar
                            </button>
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

            <StudentFormModal
              isEdit="true"
              isOpen={showModal}
              studentEdit={studentEdit}
              onClose={() => setShowModal(false)}
              onStudentSaved={getStudents}
            />
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