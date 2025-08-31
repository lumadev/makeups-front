import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudentById } from '../../services/studentService'
import { toast } from 'react-toastify'

import StudentSongsIndex from './songs/StudentSongsIndex'

function StudentManage() {
  const { id } = useParams()
  
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        const response = await getStudentById(id)
        setStudent(response.data)
      } catch {
        toast("Erro ao carregar o aluno", { 
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  if (loading) {
    return (
      <div className="p-4 animate-pulse">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-72 mb-4" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        Bem-vindo à área do Aluno {student?.name}
      </h1>
      <StudentSongsIndex student={student} />
    </div>
  )
}

export default StudentManage
