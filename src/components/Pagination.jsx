import React from "react"

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null

  const visibleButtons = 5
  const half = Math.floor(visibleButtons / 2)

  const createPageNumbers = () => {
    const pages = []

    let start = Math.max(2, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    if (currentPage <= half) {
      start = 2
      end = Math.min(totalPages - 1, visibleButtons)
    }

    if (currentPage > totalPages - half) {
      start = Math.max(2, totalPages - visibleButtons)
      end = totalPages - 1
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (start > 2) pages.unshift("...")
    if (end < totalPages - 1) pages.push("...")

    pages.unshift(1)
    pages.push(totalPages)

    return pages
  }

  const pageNumbers = createPageNumbers()

  const baseButton =
    "px-3 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"

  const defaultButton =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 " +
    "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"

  const activeButton =
    "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 " +
    "dark:bg-orange-500 dark:hover:bg-orange-600"

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${baseButton} ${defaultButton} disabled:opacity-50`}
      >
        Anterior
      </button>

      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="px-2 text-gray-500 dark:text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => setCurrentPage(page)}
            className={`${baseButton} ${
              page === currentPage ? activeButton : defaultButton
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${baseButton} ${defaultButton} disabled:opacity-50`}
      >
        Próxima
      </button>
    </div>
  )
}

export default Pagination