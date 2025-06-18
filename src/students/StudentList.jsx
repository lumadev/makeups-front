import axios from 'axios'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function StudentList() {
  const [students, setStudents] = useState([])

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/alunos')
      const students = response.data

      setStudents(students)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      });
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
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
                {students.map((student, index) => (
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
                      {student.dateRegister}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Editar
                        </button>
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Excluir
                        </button>
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
  )
}

export default StudentList