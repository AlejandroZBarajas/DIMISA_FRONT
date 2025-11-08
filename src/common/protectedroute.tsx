import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
  userRole: string | null; 
}

export function ProtectedRoute({
  children,
  allowedRoles,
  userRole,
}: ProtectedRouteProps) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>;
}