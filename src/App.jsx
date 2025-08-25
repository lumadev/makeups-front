import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import './App.css'

import Layout from './Layout'
import Login from './auth/Login'
import EventDateIndex from './eventDates/EventDateIndex'
import MakeupIndex from './makeups/MakeupIndex'
import MakeupDoneIndex from './makeupsDone/MakeupDoneIndex'
import NotFound from './errors/NotFound'
import RequireAuth from './RequireAuth'
import StudentIndex from './students/StudentIndex'
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
