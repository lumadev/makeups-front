import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import Layout from './Layout'
import NotFound from './errors/NotFound'
import StudentIndex from './students/StudentIndex'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="alunos" element={<StudentIndex />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
