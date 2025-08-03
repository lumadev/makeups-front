import { useEffect, useState } from "react"

function StudentAutocomplete({ 
  isEdit = false,
  students, 
  onSelect,
  makeupEdit = null
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (isEdit && makeupEdit?.studentName) {
      setSearchTerm(makeupEdit.studentName || "")
    }
  }, [isEdit, makeupEdit, students])

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

      // if student is not found, reset search term and set null
      } else {
        setSearchTerm("")
      }
      setShowSuggestions(false)
    }, 100)
  }

  const handleClick = (student) => {
    setSearchTerm(student.name)
    onSelect?.(student)
    setShowSuggestions(false)
  }
  
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
        className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Digite o nome do aluno"
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