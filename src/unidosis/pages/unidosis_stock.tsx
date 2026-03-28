import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import EntradaManualInventario from "../components/entrada_manual_inventario";

function UnidosisStock(){

    return(
        <div>
            <Header></Header>
            
            <UnidosisSubheader></UnidosisSubheader>
            <EntradaManualInventario></EntradaManualInventario>
        </div>
    )
}
export default UnidosisStock