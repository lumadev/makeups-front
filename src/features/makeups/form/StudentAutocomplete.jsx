import { useEffect, useState } from "react"
import { listStudents } from "@/features/students/studentService"
import { toast } from 'react-toastify'

function StudentAutocomplete({ 
  isEdit = false,
  onSelect,
  makeupEdit = null
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
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

  const filterStudents = (term) => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(term.toLowerCase())
    )
    if (filtered) {
      setFiltered(filtered)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // if the text of search is not empty, apply the filter
    // and show students suggestions

    if (value.length > 0) {
      filterStudents(value)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleFocus = () => {
    setTimeout(() => {
      if (!searchTerm) return
    
      if (searchTerm.trim().length > 0) {
        setShowSuggestions(true)
      }
    }, 100)
  }

  const handleBlur = () => {
    if (searchTerm.length <= 2) return

    setTimeout(() => {
      const studentMatch = students.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
      // set student selected even if not clicked
      if (studentMatch && studentMatch.length === 1) {
        handleClick(studentMatch[0])
      }
      setShowSuggestions(false)
    }, 100)
  }

  const handleClick = (student) => {
    setSearchTerm(student.name)
    onSelect?.(student)
    setShowSuggestions(false)
  }
  
  useEffect(() => {
    if (isEdit && makeupEdit?.studentName) {
      setSearchTerm(makeupEdit.studentName || "")
    }
  }, [isEdit, makeupEdit, students])

  useEffect(() => {
    getStudents()
  }, [])
  
  return (
    <div className="flex flex-col w-full max-w-md relative">
      <label htmlFor={isEdit ? 'student-edit' : 'student-create'}>
        Aluno
      </label>
      <input
        type="text"
        id={isEdit ? 'student-edit' : 'student-create'}
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={loadingStudents}
        className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder={loadingStudents ? 'Carregando...' : 'Digite o nome do aluno'}
      />
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg">
          <ul>
            {filtered.map((student) => (
              <li
                key={student.id}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setTimeout(() => {
                    handleClick(student)
                  }, 100)
                }}
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default StudentAutocomplete