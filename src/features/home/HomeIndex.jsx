import { useEffect, useState } from "react"
import { IconSchool, IconUser, IconCheck } from "@tabler/icons-react"

import CardLink from "./CardLink"
import MakeupInfo from "@/features/makeups/MakeupInfo"
import { listMakeups } from "@/features/makeups/makeupService"

function HomeIndex() {
  const [makeups, setMakeups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMakeups = async () => {
      try {
        const response = await listMakeups()
        setMakeups(response.data)
      } catch {
        // do nothing on error
      } finally {
        setLoading(false)
      }
    }
    fetchMakeups()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Bem-vindo ao sistema de reposições!
      </h1>

      {/* Componente MakeupInfo só após carregamento */}
      {!loading && (
        <div className="w-full">
          <MakeupInfo makeups={makeups} />
        </div>
      )}

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        <CardLink href="/reposicoes" label="Reposições de Aula" icon={IconSchool} />
        <CardLink href="/musicas-alunos" label="Músicas de Alunos" icon={IconCheck} />
        <CardLink href="/alunos" label="Lista de Alunos" icon={IconUser} />
      </div>
    </div>
  )
}

export default HomeIndex
