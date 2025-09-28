import { useEffect, useState } from "react"
import Header from "../../common/header"
import AdminSubheader from "../components/admin_subheader"
import type CendisEntity from "../../entities/cendis_entity"
/* import CendisCard
import CendisForm
import getAll
 */

function AdminCendis(){
    return(
        <div>
        <Header/>
        <AdminSubheader></AdminSubheader>

        <h2>Gestión de Cendis</h2>
        </div>
    )
}
export default AdminCendis