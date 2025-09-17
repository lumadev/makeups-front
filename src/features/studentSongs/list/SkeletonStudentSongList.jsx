import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'

function SkeletonStudentSongList() {
  return (
    <section className="container mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
      </div>
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Artista</TableHeaderCell>
              <TableHeaderCell>Estudante</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                {/* Nome */}
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </TableDataCell>

                {/* Artista */}
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                </TableDataCell>

                {/* Estudante */}
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </TableDataCell>

                {/* Ações */}
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                </TableDataCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-3">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse" />
      </div>
    </section>
  )
}

export default SkeletonStudentSongList
