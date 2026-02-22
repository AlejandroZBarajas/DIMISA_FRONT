import { useState, useEffect } from "react";
import { useAuth } from "../../common/auth/auth_context";
import type AreaEntity from "../../entities/area_entity";
import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import { getAreasByCendis } from "../../services/areas_service";
import { getTipos } from "../../services/tipo_col_sal";
import type TipoEntity from "../../entities/tipo_entity";
import SalidasArea from "../components/salidas/salidas_area";



function UnidosisSalidas(){
    const {auth} = useAuth()
    const [myAreas, setMyAreas] = useState <AreaEntity[]>([])
    const [tiposSalida, setTiposSalida] = useState <TipoEntity[]>([])

    const id_cendis = auth.user?.cnd!

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
            <div>
                <h2 className="text-red-500 font-bold text-xl">No olvidar calcular las salidas en piezas</h2>
            </div>
            <div className=" w-full flex">
                {
                    myAreas.map((area)=>(
                        <SalidasArea
                        key={area.id_area}
                        area={area}
                        tipos={tiposSalida}
                        />
                    ))
                }
            </div>

        </div>
    )
}
export default UnidosisSalidas