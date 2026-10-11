import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p className="max-w-md mx-auto">Loading…</p>;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
