import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
//import SearchMedicamentos from "../components/search_medicamentos";
import ColectivoMaker from "../components/colectivoMaker";

export default function UnidosisColectivos(){
    return(
        <div>
            <Header></Header>
            <UnidosisSubheader></UnidosisSubheader>
            <ColectivoMaker></ColectivoMaker>
        </div>
    )
}