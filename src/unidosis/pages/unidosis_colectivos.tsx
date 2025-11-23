import { useState, useEffect } from "react";
import type { ColectivoEntity } from "../../entities/colectivo_entity";
import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";

import ColectivoMaker from "../components/colectivo_maker";
import { getColectivosEditablesByCendis } from "../../services/colectivos_service";
import ColectivoParaImprimir from "../components/colectivo_imprimir";

export default function UnidosisColectivos(){
  const [colectivos, setColectivos] = useState<ColectivoEntity[]>([]);

  const cendis = sessionStorage.getItem("cnd")
  const id_cendis = Number(cendis)

   useEffect(() => {
      async function fetchData() {
        try {
          const res = await getColectivosEditablesByCendis(id_cendis); 
          setColectivos(res ?? []);
          console.log("res: ",res)
          console.log("id_cendis: ",id_cendis)
        } catch (err) {
          console.error("Error cargando colectivos:", err);
        } 
      }
  
      fetchData();
    }, []);

    return(
        <div className="flex flex-col items-center">
            <Header></Header>
            <UnidosisSubheader></UnidosisSubheader>
            <ColectivoMaker></ColectivoMaker>
            {
                colectivos.map((c) => (
                <ColectivoParaImprimir 
                    key={c.id_colectivo} 
                    colectivo={c} 
                />
                ))
            }
        </div>
    )
}