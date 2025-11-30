import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";
import SalidasMaker from "../components/salidas_maker";
import { useState, useEffect } from "react";
import type SalidaDTO from "../../entities/salida_DTO";
import { getSalidasEditablesByCendis } from "../../services/salidas_service";
import SalidaParaImprimir from "../components/salida_imprimir";

function UnidosisSalidas(){
    const [salidas, setSalidas] = useState <SalidaDTO[]>([])

    const cendis = sessionStorage.getItem("cnd")
    const id_cendis = Number(cendis)

    useEffect(() => {
        async function fetchData(){
            try{
                const res = await getSalidasEditablesByCendis(id_cendis)
                setSalidas(res ?? [])
            }catch (error){
                console.error(error)
            }
        }
        fetchData()
    },[])

    return(
        <div className="flex flex-col items-center">
            <Header></Header>
            <UnidosisSubheader></UnidosisSubheader>
            <SalidasMaker></SalidasMaker>
            {
                salidas.map((s) => (
                    <SalidaParaImprimir
                    key={s.id_salida}
                    salida={s}
                    />
                ))
            }
        </div>
    )
}
export default UnidosisSalidas