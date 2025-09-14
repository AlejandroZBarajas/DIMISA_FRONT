import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // ej. ["administrador"]
  userRole: string | null; // obtenido de cookies o contexto
}

export function ProtectedRoute({
  children,
  allowedRoles,
  userRole,
}: ProtectedRouteProps) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // redirige a login o página principal
  }

  return <>{children}</>;
}