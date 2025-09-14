import Login from "./common/login"
import EnfermeriaCamas from "./enfermeria/pages/enfermeria_camas"
import AdminUsers from "./admin/pages/admin_users";
import { ProtectedRoute } from "./common/protectedroute"
import { Routes, Route } from "react-router-dom";
import AdminAreas from "./admin/pages/admin_areas";
import AdminCendis from "./admin/pages/admin_cendis";
import AdminCamas from "./admin/pages/admin_camas";
import AdminClaves from "./admin/pages/admin_claves";

export default function App() {

  const userRol=sessionStorage.getItem("rl")

  return (
    <Routes>

      <Route path="/" element={<Login/>}/>

      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={["1", "2"]} userRole={userRol}>
            <AdminUsers />
        </ProtectedRoute>} />

      <Route path="/admin/camas" element={
        <ProtectedRoute allowedRoles={["1", "2"]} userRole={userRol}>
            <AdminCamas />
        </ProtectedRoute>} />

      <Route path="/admin/cendis" element={
        <ProtectedRoute allowedRoles={["1", "2"]} userRole={userRol}>
            <AdminCendis />
        </ProtectedRoute>} />

      <Route path="/admin/areas" element={
        <ProtectedRoute allowedRoles={["1", "2"]} userRole={userRol}>
            <AdminAreas />
        </ProtectedRoute>} />

      <Route path="/admin/claves" element={
        <ProtectedRoute allowedRoles={["1", "2"]} userRole={userRol}>
            <AdminClaves />
        </ProtectedRoute>} />

      <Route path="/enfermeria/camas" element={
        <ProtectedRoute allowedRoles={["5"]} userRole={userRol}>
            <EnfermeriaCamas />
        </ProtectedRoute>} />


    </Routes>
  )
}


