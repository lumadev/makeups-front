import { Navigate, Outlet } from "react-router-dom"

import { STORAGE_KEYS } from "@/constants/storageKeys"

const isAuthenticated = () => {
  return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === "true"
}

function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RequireAuth