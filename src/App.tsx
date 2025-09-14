import Login from "./common/login"
import EnfermeriaCamas from "./enfermeria/pages/enfermeria_camas"
import AdminUsers from "./admin/pages/admin_users";
import { ProtectedRoute } from "./common/protectedroute"
import { Routes, Route } from "react-router-dom";

export default function App() {

  const userRol=sessionStorage.getItem("rl")

  return (
    <Routes>

      <Route path="/" element={<Login/>}/>

      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={["1"]} userRole={userRol}>
            <AdminUsers />
        </ProtectedRoute>} />

      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={["2"]} userRole={userRol}>
            <AdminUsers />
        </ProtectedRoute>} />

      <Route path="/enfermeria/camas" element={
        <ProtectedRoute allowedRoles={["5"]} userRole={userRol}>
            <EnfermeriaCamas />
        </ProtectedRoute>} />


    </Routes>
  )
}


