import { Navigate, Outlet } from "react-router-dom"

// This function checks if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token") 
}

function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default RequireAuth