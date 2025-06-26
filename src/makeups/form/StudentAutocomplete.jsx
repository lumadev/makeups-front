import { useState } from "react";

export default function StudentAutocomplete({ 
  isEdit = false,
  students, 
  onSelect
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // if the text of search is not empty, apply the filter
    if (value.length > 0) {
      const matches = students.filter((student) =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (student) => {
    setSearchTerm(student.name);
    setShowSuggestions(false);
    onSelect?.(student); // opcional, pode ser usado para setar estado no pai
  };

  return (
    <div className="flex flex-col w-full max-w-md relative">
      <label 
        htmlFor={isEdit ? 'student-edit' : 'student-create'}
      >
        Estudante
      </label>
      <input
        type="text"
        id={isEdit ? 'student-edit' : 'student-create'}
        value={searchTerm}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // dá tempo para clicar
        onFocus={() => {
          if (filtered.length > 0) setShowSuggestions(true);
        }}
        className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Digite o nome do aluno"
      />
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg">
          {filtered.map((student) => (
            <li
              key={student.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelect(student)}
            >
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}