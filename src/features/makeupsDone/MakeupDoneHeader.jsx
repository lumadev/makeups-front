function MakeupDoneHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Lado Esquerdo: Título e Descrição */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4 transition-colors duration-200">
          Reposições Concluídas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-200">
          Visualize as reposições concluídas.
        </p>
      </div>
    </div>
  )
}

export default MakeupDoneHeader