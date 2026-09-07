import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import "./App.css"

import { useDarkMode } from "@/common/hooks/useDarkMode"
import Login from "./features/auth/Login"
import Layout from "./Layout"
import EventDateIndex from "./features/eventDates/EventDateIndex"
import HomeIndex from "./features/home/HomeIndex"
import MakeupIndex from "./features/makeups/MakeupIndex"
import MakeupDoneIndex from "./features/makeupsDone/MakeupDoneIndex"
import NotFound from "./errors/NotFound"
import RequireAuth from "./RequireAuth"
import StudentIndex from "./features/students/StudentIndex"
import StudentManageIndex from "./features/students/StudentManageIndex"
import StudentAllSongsIndex from "./features/studentSongs/StudentAllSongsIndex"
import JokeIndex from "./features/jokes/JokeIndex"
import PacmanGame from "./features/pacman/PacmanGame"

function App() {
  const [isDark] = useDarkMode()

  const protectedRoutes = [
    { path: "alunos", element: <StudentIndex /> },
    { path: "aluno/:id/musicas", element: <StudentManageIndex /> },
    { path: "musicas-alunos", element: <StudentAllSongsIndex /> },
    { path: "reposicoes", element: <MakeupIndex /> },
    { path: "reposicoes-concluidas", element: <MakeupDoneIndex /> },
    { path: "datas-de-evento", element: <EventDateIndex /> },
    { path: "piadas", element: <JokeIndex /> },
    // 👾
    { path: "pacman", element: <PacmanGame /> },
  ]

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} theme={isDark ? "dark" : "light"} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          {/* Home separado se precisar de outro layout */}
          <Route path="/" element={
            <Layout hasMinWidth="false" />
          }>
            <Route path="home" element={<HomeIndex />} />
          </Route>

          {/* App principal */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/reposicoes" replace />} />

            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App