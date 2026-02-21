import TableHeaderCell from '../table/TableDataCell'
import TableDataCell from '../table/TableDataCell'

function SkeletonMakeupList({ isMakeupsList = false }) {
  return (
    <section className="container mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
      </div>
      <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeaderCell>Aluno</TableHeaderCell>
              <TableHeaderCell>Data da Reposição</TableHeaderCell>
              <TableHeaderCell>Data Antiga</TableHeaderCell>
              {isMakeupsList && (
                <TableHeaderCell>Ações</TableHeaderCell>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </TableDataCell>
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </TableDataCell>
                {isMakeupsList && (
                  <TableDataCell>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  </TableDataCell>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SkeletonMakeupList
