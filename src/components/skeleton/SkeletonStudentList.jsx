import TableHeaderCell from '../table/TableHeaderCell'
import TableDataCell from '../table/TableDataCell'

function SkeletonStudentList() {
  return (
    <section className="container mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
      </div>
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Telefone</TableHeaderCell>
              <TableHeaderCell>Data do Cadastro</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                {/* Nome + email */}
                <TableDataCell>
                  <div className="flex flex-col gap-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40" />
                  </div>
                </TableDataCell>

                {/* Telefone */}
                <TableDataCell>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                </TableDataCell>

                {/* Data */}
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
    </section>
  )
}

export default SkeletonStudentList