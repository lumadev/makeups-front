function StudentList() {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Nome
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Telefone
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Data do Cadastro
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="flex items-center gap-x-2">
                        <div>
                          <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Arthur Melo</h2>
                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      (48) 99172-8593
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      Jan 6, 2022
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Editar
                        </button>
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="flex items-center gap-x-2">
                        <div>
                          <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Luana Melo</h2>
                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      (48) 99472-9793
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      Jan 6, 2022
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Editar
                        </button>
                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentList