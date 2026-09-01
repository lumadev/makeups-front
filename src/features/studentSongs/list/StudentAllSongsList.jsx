import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { listAllStudentSongs } from "@/features/students/songs/studentSongsService"
import { IconExternalLink, IconUser } from "@tabler/icons-react"

// import StudentActions from './StudentActions'
import Pagination from '@/components/Pagination'
import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'
import SkeletonStudentAllSongsList from './SkeletonStudentAllSongsList'
import StudentSongActions from '@/features/students/songs/list/StudentSongActions'

function StudentAllSongsList({ searchTerm, reloadFlag, onCountChange }) {
  const isFirstLoad = useRef(true)

  const [studentSongs, setStudentSongs] = useState([])
  const [loading, setLoading] = useState(true)

  const filteredStudentSongs = studentSongs.filter((song) => {
    const term = searchTerm.toLowerCase()
    const fields = [song.songName, song.artist, song.versionLink, song.studentName]

    return fields.some(field => field.toLowerCase().includes(term))
  })
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredStudentSongs.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudentSongs = filteredStudentSongs.slice(startIndex, startIndex + itemsPerPage)

  const getStudentSongs = useCallback(async (isFirstLoad = false) => {
    try {
      const response = await listAllStudentSongs()
      let songs = response.data

      setStudentSongs(songs)
      onCountChange(songs.length)
    } catch {
      toast("Ocorreu um erro ao buscar as músicas dos alunos", { 
        type: 'error'
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [])

  const refreshStudentSongs = useCallback(async () => {
    setLoading(true)

    await getStudentSongs()

    setLoading(false)
  }, [getStudentSongs])

  useEffect(() => {
    getStudentSongs(true)
  }, [getStudentSongs])

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    // logic triggered only after save new student
    refreshStudentSongs()
  }, [reloadFlag, refreshStudentSongs])

  return (
    <div>
      {loading ? (
        <SkeletonStudentAllSongsList/>
      ) : (
        <>
          {filteredStudentSongs.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 dark:text-white transition-colors duration-200">
                  Músicas dos Alunos
                </h2>
                <span className="text-gray-400">
                  {filteredStudentSongs.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Nome</TableHeaderCell>
                          <TableHeaderCell>Artista</TableHeaderCell>
                          <TableHeaderCell>Estudante</TableHeaderCell>
                          <TableHeaderCell>Link da Versão</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedStudentSongs.map((song, index) => (
                          <tr key={index}>
                            <TableDataCell>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {song.songName}
                              </h2>
                            </TableDataCell>

                            <TableDataCell>
                              {song.artist}
                            </TableDataCell>

                            <TableDataCell>
                              <Link 
                                to={`/aluno/${song.studentId}/musicas`} 
                                className="group inline-flex max-w-full items-center gap-x-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200 transition-colors hover:bg-amber-100 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus-visible:ring-gray-500"
                              >
                                <IconUser size={16} />
                                <span className="truncate max-w-[180px]">{song.studentName}</span>
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-700/90 dark:text-orange-300">
                                  Ver pagina
                                </span>
                              </Link>
                            </TableDataCell>

                            <TableDataCell>
                              <div className="flex items-center gap-x-2">
                                {song.versionLink ? (
                                  <a
                                    href={song.versionLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-x-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus-visible:ring-gray-500"
                                  >
                                    Abrir versao
                                    <IconExternalLink size={16} className="opacity-80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                            </TableDataCell>

                            <TableDataCell>
                              <div className="flex items-center gap-x-6">
                                <StudentSongActions
                                  studentId={song.studentId}
                                  screenType="student-all-songs"
                                  studentSong={song}
                                  onAfterSave={refreshStudentSongs}
                                />
                              </div>
                            </TableDataCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-6 pb-2">
                <Pagination 
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </section>
          ) : (
            <div className="mt-2">
              <p className="text-gray-400 font-medium">
                Ops… o player está em silêncio! Nenhuma música encontrada
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentAllSongsList
