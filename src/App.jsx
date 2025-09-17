import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import './App.css'

import Layout from './Layout'
import Login from './features/auth/Login'
import EventDateIndex from './features/eventDates/EventDateIndex'
import MakeupIndex from './features/makeups/MakeupIndex'
import MakeupDoneIndex from './features/makeupsDone/MakeupDoneIndex'
import NotFound from './errors/NotFound'
import RequireAuth from './RequireAuth'
import StudentIndex from './features/students/StudentIndex'
import StudentManage from './features/students/StudentManage'
import StudentSongIndex from './features/studentSongs/StudentSongIndex'
import JokeIndex from './features/jokes/JokeIndex'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/reposicoes" replace />} />
            <Route path="alunos" element={<StudentIndex />} />
            <Route path="aluno/:id/musicas" element={<StudentManage />} />
            <Route path="musicas-alunos" element={<StudentSongIndex />} />
            <Route path="reposicoes" element={<MakeupIndex />} />
            <Route path="reposicoes-concluidas" element={<MakeupDoneIndex />} />
            <Route path="datas-de-evento" element={<EventDateIndex />} />
            <Route path="piadas" element={<JokeIndex />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
