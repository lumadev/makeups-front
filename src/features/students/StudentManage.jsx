import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudentById } from '../../services/studentService'

import StudentSongsIndex from './songs/StudentSongsIndex'

function StudentManage() {
  const { id } = useParams()
  
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        const response = await getStudentById(id)
        setStudent(response.data)
      } catch {
        setError('Erro ao carregar o aluno')
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

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
