function SkeletonJokeList() {
  return (
    <div className="mt-4">
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Descrição
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SkeletonJokeList
