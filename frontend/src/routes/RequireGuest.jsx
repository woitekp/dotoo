import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/context/auth/useAuth";

function RequireGuest() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default RequireGuest;
