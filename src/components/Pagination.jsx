import React from "react"

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-4 mb-2">
      <button
        onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  )
}

export default Pagination