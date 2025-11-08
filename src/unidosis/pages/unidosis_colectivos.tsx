import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import SearchMedicamentos from "../components/search_medicamentos";

export default function UnidosisColectivos(){
    return(
        <div>
            <Header></Header>
            <UnidosisSubheader></UnidosisSubheader>
            <SearchMedicamentos></SearchMedicamentos>
        </div>
    )
}