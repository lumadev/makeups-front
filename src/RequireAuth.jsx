import { Navigate, Outlet } from "react-router-dom";

// This function checks if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); 
};

export default function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}