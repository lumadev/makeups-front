import React from "react"

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null

  const visibleButtons = 5 // fixed number of buttons in the middle
  const half = Math.floor(visibleButtons / 2)

  const createPageNumbers = () => {
    const pages = []

    let start = Math.max(2, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    // adjust if current page is near the start
    if (currentPage <= half) {
      start = 2
      end = Math.min(totalPages - 1, visibleButtons)
    }

    // adjust if current page is near the end
    if (currentPage > totalPages - half) {
      start = Math.max(2, totalPages - visibleButtons)
      end = totalPages - 1
    }

    // push middle page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // add ellipsis if needed
    if (start > 2) pages.unshift("...")
    if (end < totalPages - 1) pages.push("...")

    // always include first and last pages
    pages.unshift(1)
    pages.push(totalPages)

    return pages
  }

  const pageNumbers = createPageNumbers()

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      >
        Anterior
      </button>

      {/* Page buttons */}
      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  )
}

export default Pagination
