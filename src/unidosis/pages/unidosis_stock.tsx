import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import EntradaManualInventario from "../components/entrada_manual_inventario";
import TablaInventario from "../inventario/tabla_inventario";
import { useAuth } from "../../common/auth/auth_context";

function UnidosisStock(){

    const { auth } = useAuth();
    
    const id_cendis = auth.user?.cnd
    console.log("CENDIS DEL USUARIO:", id_cendis)

    return(
        <div>
            <Header></Header>
            
            <UnidosisSubheader></UnidosisSubheader>
            <div className="flex">
                <TablaInventario idCendis={id_cendis!}></TablaInventario>
                <EntradaManualInventario></EntradaManualInventario>
            </div>
        </div>
    )
}
export default UnidosisStock