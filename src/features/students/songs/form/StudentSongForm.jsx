import { useEffect, useState } from 'react'
import { listStudents } from "@/features/students/studentService"
import { toast } from 'react-toastify'

import TextInput from '@/components/inputs/TextInput'
import CheckboxInput from '@/components/inputs/CheckboxInput'
import StudentAutocomplete from '@/features/makeups/form/StudentAutocomplete'

function StudentSongForm({ 
  screenType, 
  formData, 
  setFormData,
  handleSelectStudentId = () => {}
}) {
  const [isRecital, setIsRecital] = useState(formData.isRecital || false)
  const [isMusicAudition, setIsMusicAudition] = useState(formData.isMusicAudition || false)
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [students, setStudents] = useState([])

  // get students to show in autocomplete field
  const getStudents = async () => {
    setLoadingStudents(true)

    try {
      const response = await listStudents()
      const students = response.data

      // sort alphabetically
      students.sort((a, b) => a.name.localeCompare(b.name))

      setStudents(students)
    } catch {
      toast("Ocorreu um erro ao buscar os alunos", { 
        type: 'error'
      })
    } finally {
      setLoadingStudents(false)
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleRecitalChange = (checked) => {
    setIsRecital(checked)
    setFormData(prev => ({ ...prev, isRecital: checked }))
  }

  const handleMusicAuditionChange = (checked) => {
    setIsMusicAudition(checked)
    setFormData(prev => ({ ...prev, isMusicAudition: checked }))
  }

  const isStudentAllSongsScreen = screenType === 'student-all-songs'

  useEffect(() => {
    // sincroniza com formData caso seja edição
    setIsRecital(formData.isRecital || false)
    setIsMusicAudition(formData.isMusicAudition || false)
  }, [formData.isRecital, formData.isMusicAudition])

  useEffect(() => {
    if (isStudentAllSongsScreen) {
      getStudents()
    }
  }, [isStudentAllSongsScreen])

  return (
    <form>
      {isStudentAllSongsScreen && (
        <div className="mb-4">
          <StudentAutocomplete
            students={students}
            loadingStudents={loadingStudents}
            onSelect={(student) => handleSelectStudentId(student.id)}
          />
        </div>
      )}

      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <TextInput
          id="songName"
          label="Nome da Música"
          value={formData.songName || ''}
          onChange={handleChange}
          placeholder="Nome da Música"
          maxLength="200"
          required
        />

        <TextInput
          id="artist"
          label="Artista"
          value={formData.artist || ''}
          onChange={handleChange}
          placeholder="Artista"
          maxLength="200"
          required
        />
      </div>

      <div className="mb-6">
        <TextInput
          id="versionLink"
          label="Link da Versão"
          value={formData.versionLink || ''}
          onChange={handleChange}
          placeholder="Cole o link da versão da música"
          maxLength="500"
          type="url"
        />
      </div>

      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <CheckboxInput
          label="É música do recital"
          checked={isRecital}
          onChange={handleRecitalChange}
        />

        <CheckboxInput
          label="É música da audição?"
          checked={isMusicAudition}
          onChange={handleMusicAuditionChange}
        />
      </div>
    </form>
  )
}

export default StudentSongForm
