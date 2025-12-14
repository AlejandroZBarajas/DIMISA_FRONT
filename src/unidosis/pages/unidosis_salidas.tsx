import { useState, useEffect } from "react";
import type AreaEntity from "../../entities/area_entity";
import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import SalidasMaker from "../components/salidas/salidas_maker";
import { getAreasByCendis } from "../../services/areas_service";
import { getTipos } from "../../services/tipo_col_sal";
import type TipoEntity from "../../entities/tipo_entity";



function UnidosisSalidas(){
    const [myAreas, setMyAreas] = useState <AreaEntity[]>([])
    const [tiposSalida, setTiposSalida] = useState <TipoEntity[]>([])

    const cendis = sessionStorage.getItem("cnd")
    const id_cendis = Number(cendis)

    const fetchAreas = async () => {
        try{
            const res = await getAreasByCendis(id_cendis)
            setMyAreas(res ?? [])
        } catch (error){
            console.error("error al cargar las areas: ",error)
        }
    }

    const fetchTipos = async () => {
        try{
            const res = await getTipos()
            console.log(res)
            setTiposSalida(res)
        }catch(error){
            console.error("no se pudieron cargar tipos: ",error)
        }
    }


    useEffect(() => {
        fetchAreas()
        fetchTipos()
    },[])

    return(
        <div className="flex flex-col items-center">
            <Header></Header>
            <UnidosisSubheader></UnidosisSubheader>
            {
                myAreas.map((area)=>(
                    <SalidasMaker
                        key={area.id_area}
                        area={area}
                        tipos={tiposSalida}
                    />
                ))
            }

        </div>
    )
}
export default UnidosisSalidas