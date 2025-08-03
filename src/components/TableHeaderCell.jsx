function TableHeaderCell({ children }) {
  return (
    <th
      scope="col"
      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      {children}
    </th>
  )
}

export default TableHeaderCell