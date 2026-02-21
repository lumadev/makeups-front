import { useEffect, useCallback, useState, useRef } from "react"
import { toast } from "react-toastify"

import StudentSongActions from './StudentSongActions'
import Pagination from "@/components/Pagination"
import TableHeaderCell from "@/components/table/TableHeaderCell"
import TableDataCell from "@/components/table/TableDataCell"
import SkeletonStudentSongList from "./SkeletonStudentSongList"

import { listNotDoneStudentSongs, listDoneStudentSongs } from "@/features/students/songs/studentSongsService"
import { IconLink } from "@tabler/icons-react"

function StudentSongsList({
  student,
  screenType = 'songs-not-done',
  searchTerm,
  onCountChange,
  setStudentSongsList = null,
  reloadFlag = null, 
}) {
  const isFirstLoad = useRef(true)

  const [studentSongs, setStudentSongs] = useState([])
  const [loading, setLoading] = useState(true)

  // filter by search term
  const filteredStudentSongs = studentSongs.filter((studentSong) => {
    const term = searchTerm.toLowerCase()
    return (
      studentSong.songName.toLowerCase().includes(term) ||
      studentSong.artist.toLowerCase().includes(term)
    )
  })

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredStudentSongs.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudentSongs = filteredStudentSongs.slice(startIndex, startIndex + itemsPerPage)

  // get student songs
  const getStudentSongs = useCallback(async (isFirstLoad = false) => {
    try {
      let response
      if (screenType === 'songs-not-done') {
        response = await listNotDoneStudentSongs(student.id)

      } else if (screenType === 'songs-done') {
        response = await listDoneStudentSongs(student.id)
      }
      const data = response.data

      setStudentSongs(data)
      setStudentSongsList?.(data)
      onCountChange(data.length)
    } catch {
      toast("Ocorreu um erro ao buscar as músicas do aluno", {
        type: "error",
      })
    } finally {
      if (isFirstLoad) {
        setLoading(false)
      }
    }
  }, [student.id, onCountChange, setStudentSongsList, screenType])

  const refreshStudentSongs = useCallback(async () => {
    setLoading(true)
    await getStudentSongs()
    setLoading(false)
  }, [getStudentSongs])

  useEffect(() => {
    getStudentSongs(true)
  }, [getStudentSongs])

  // logic triggered only after save new studentSong
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    refreshStudentSongs()
  }, [reloadFlag, refreshStudentSongs])

  return (
    <div>
      {loading ? (
        <SkeletonStudentSongList />
      ) : (
        <>
          {filteredStudentSongs.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-200">
                  Músicas do Aluno
                </h2>
                <span className="text-gray-400">
                  {filteredStudentSongs.length} no total
                </span>
              </div>
              <div>
                <div className="min-w-full py-2 align-middle">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <TableHeaderCell>Nome da Música</TableHeaderCell>
                          <TableHeaderCell>Artista</TableHeaderCell>
                          <TableHeaderCell>Link da Versão</TableHeaderCell>
                          <TableHeaderCell>Recital</TableHeaderCell>
                          <TableHeaderCell>Audição</TableHeaderCell>
                          <TableHeaderCell>Ações</TableHeaderCell>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedStudentSongs.map((studentSong, index) => (
                          <tr key={index}>
                            <TableDataCell>
                              {studentSong.songName}
                            </TableDataCell>
                            <TableDataCell>
                              {studentSong.artist}
                            </TableDataCell>
                            <TableDataCell>
                              <div className="flex items-center gap-x-2">
                                {studentSong.versionLink ? (
                                  <>
                                    <a
                                      href={studentSong.versionLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-orange-600 hover:underline truncate max-w-xs"
                                    >
                                      Ir para o link
                                    </a>
                                    <IconLink size={18} />
                                  </>
                                ) : (
                                  "-"
                                )}
                              </div>
                            </TableDataCell>
                            <TableDataCell>
                              {studentSong.isRecital ? "Sim" : "Não"}
                            </TableDataCell>
                            <TableDataCell>
                              {studentSong.isMusicAudition ? "Sim" : "Não"}
                            </TableDataCell>
                            <TableDataCell>
                              <div className="flex items-center gap-x-6">
                                <StudentSongActions 
                                  studentId={student.id}
                                  screenType={screenType}
                                  studentSong={studentSong}
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
              <p className="text-gray-400 font-medium">Nenhuma música encontrada :(</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentSongsList
