import { useEffect, useState } from "react"
import { IconSchool, IconUser, IconCheck } from "@tabler/icons-react"

import HomeCardLink from "./HomeCardLink"
import MakeupInfo from "@/features/makeups/MakeupInfo"
import HomeDailyJoke from "./HomeDailyJoke"

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
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:p-8 overflow-x-hidden w-full">
      
      {/* Título */}
      <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-4 text-center leading-snug px-2 sm:px-0">
        Bem-vindo ao sistema de reposições!
      </h1>

      {/* Piada com respiro melhor no mobile */}
      <div className="w-full mb-6 sm:mb-0 mb-4">
        <HomeDailyJoke />
      </div>

      {/* Componente MakeupInfo só após carregamento */}
      {!loading && (
        <div className="w-full mb-8">
          <MakeupInfo makeups={makeups} />
        </div>
      )}

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 w-full">
        <HomeCardLink
          href="/reposicoes"
          label="Reposições de Aula"
          icon={IconSchool}
        />
        <HomeCardLink
          href="/musicas-alunos"
          label="Músicas de Alunos"
          icon={IconCheck}
        />
        <HomeCardLink
          href="/alunos"
          label="Lista de Alunos"
          icon={IconUser}
        />
      </div>
    </div>
  )
}

export default HomeIndex