import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Sidebar from './menu/Sidebar'

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />

        <ToastContainer />
      </div>
    </div>
  )
}

export default Layout