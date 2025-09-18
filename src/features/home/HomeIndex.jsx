import { IconSchool, IconUser, IconCheck, IconMenu2 } from "@tabler/icons-react"

import CardLink from "./CardLink"

function HomeIndex() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800 mb-12">
        Bem-vindo ao sistema de reposições!
      </h1>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <CardLink href="/reposicoes" label="Reposições de Aula" icon={IconSchool} />
        <CardLink href="/musicas-alunos" label="Músicas de Alunos" icon={IconCheck} />
        <CardLink href="/alunos" label="Lista de Alunos" icon={IconUser} />
      </div>
    </div>
  )
}

export default HomeIndex
