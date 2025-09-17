function StudentAllSongsSearch({ searchTerm, onSearch }) {
  return (
    <div className="my-8">
      <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
        Buscar música:
      </label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Digite o nome da música"
        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      />
    </div>
  )
}

export default StudentAllSongsSearch