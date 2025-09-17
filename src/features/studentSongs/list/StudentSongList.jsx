import { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { listAllStudentSongs } from "@/features/students/songs/studentSongsService"

// import StudentActions from './StudentActions'
import Pagination from '@/components/Pagination'
import TableHeaderCell from '@/components/table/TableHeaderCell'
import TableDataCell from '@/components/table/TableDataCell'
import SkeletonStudentSongList from './SkeletonStudentSongList'

function StudentSongList({ searchTerm, reloadFlag, onCountChange }) {
  const isFirstLoad = useRef(true)

  const [studentSongs, setStudentSongs] = useState([])
  const [loading, setLoading] = useState(true)

  const filteredStudentSongs = studentSongs.filter((song) => {
    const term = searchTerm.toLowerCase()
    return (
      song.songName.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.versionLink.toLowerCase().includes(term)
    )
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
      // onCountChange(songs.length)
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
        <SkeletonStudentSongList/>
      ) : (
        <>
          {filteredStudentSongs.length > 0 ? (
            <section className="container mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold my-4">
                  Músicas dos Alunos
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
                          <TableHeaderCell>Nome</TableHeaderCell>
                          <TableHeaderCell>Artista</TableHeaderCell>
                          <TableHeaderCell>Estudante</TableHeaderCell>
                          <TableHeaderCell>Concluída</TableHeaderCell>
                          {/* <TableHeaderCell>Ações</TableHeaderCell> */}
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
                              {song.studentName}
                            </TableDataCell>

                            <TableDataCell>
                              {song.done ? "Sim" : "Não"}
                            </TableDataCell>
                            
                            {/* <TableDataCell> */}
                              {/* <div className="flex items-center gap-x-6">
                                <StudentActions
                                  student={student}
                                  onAfterSave={refreshStudents}
                                />
                              </div> */}
                            {/* </TableDataCell> */}
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

export default StudentSongList
