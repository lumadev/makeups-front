import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'

function SkeletonStudentAllSongsList() {
  return (
    <section className="container mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
      </div>
      <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Artista</TableHeaderCell>
              <TableHeaderCell>Estudante</TableHeaderCell>
              <TableHeaderCell>Link da Versão</TableHeaderCell>
              <TableHeaderCell>Concluída</TableHeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 animate-pulse" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                </TableDataCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SkeletonStudentAllSongsList
