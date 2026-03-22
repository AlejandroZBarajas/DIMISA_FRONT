import Login from "./common/login"
import EnfermeriaCamas from "./enfermeria/pages/enfermeria_camas"
import EnfermeriaSolicitar from "./enfermeria/pages/enfermeria_solicitud";
import AdminUsers from "./admin/pages/admin_users";
import { ProtectedRoute } from "./common/protectedroute"
import { Routes, Route } from "react-router-dom";
import AdminAreas from "./admin/pages/admin_areas";
import AdminCendis from "./admin/pages/admin_cendis";
import AdminCamas from "./admin/pages/admin_camas";
import AdminClaves from "./admin/pages/admin_claves";
import UnidosisColectivos from "./unidosis/pages/unidosis_colectivos";
import UnidosisEntradas from "./unidosis/pages/unidosis_entradas";
import UnidosisSalidas from "./unidosis/pages/unidosis_salidas";

export default function App() {

  return (

    <Routes>

      <Route path="/" element={<Login/>}/>
                                                                     {/*PAGINAS DE ADMINISTRACIÓN */}
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={[1, 2]} >
            <AdminUsers />
        </ProtectedRoute>
      } />

      <Route path="/admin/camas" element={
        <ProtectedRoute allowedRoles={[1, 2]} >
            <AdminCamas />
        </ProtectedRoute>
      } />

      <Route path="/admin/cendis" element={
        <ProtectedRoute allowedRoles={[1, 2]} >
            <AdminCendis />
        </ProtectedRoute>
      } />

      <Route path="/admin/areas" element={
        <ProtectedRoute allowedRoles={[1, 2]} >
            <AdminAreas />
        </ProtectedRoute>
      }/>

      <Route path="/admin/claves" element={
        <ProtectedRoute allowedRoles={[1, 2]} >
            <AdminClaves />
        </ProtectedRoute>
      } />

                                                                     {/*PAGINAS DE ENFERMERÍA */}
      <Route path="/enfermeria/camas" element={
        <ProtectedRoute allowedRoles={[5]} >
            <EnfermeriaCamas />
        </ProtectedRoute>
      } />

      <Route path="/enfermeria/solicitar" element={
        <ProtectedRoute allowedRoles={[5]} >
            <EnfermeriaSolicitar />
        </ProtectedRoute>
      } /> 

                                                                      {/*PAGINAS DE UNIDOSIS */}
      <Route path="/unidosis/colectivos" element={
        <ProtectedRoute allowedRoles={[6]} >
            <UnidosisColectivos />
        </ProtectedRoute>
      } />

      <Route path="/unidosis/entradas" element={
        <ProtectedRoute allowedRoles={[6]} >
          <UnidosisEntradas/>
        </ProtectedRoute> 
      }/>
        
      <Route path="/unidosis/salidas" element={
        <ProtectedRoute allowedRoles={[6]} >
          <UnidosisSalidas/>
        </ProtectedRoute> 
      }/>

      </Routes>
  )
}


