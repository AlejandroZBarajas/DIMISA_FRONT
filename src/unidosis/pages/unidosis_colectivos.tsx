import { useState, useEffect } from "react";
import type { ColectivoDTO } from "../../entities/colectivo_DTO";
import Header from "../../common/header";
import UnidosisSubheader from "../components/unidosis_subheader";

import ColectivoMaker from "../components/colectivos/colectivo_maker";
import { getColectivosEditablesByCendis } from "../../services/colectivos_service";
import ColectivoParaImprimir from "../components/colectivos/colectivo_imprimir";

export default function UnidosisColectivos(){
  const [colectivos, setColectivos] = useState<ColectivoDTO[]>([]);

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
            <div className="flex flex-row w-12/12 justify-center">
              <ColectivoMaker></ColectivoMaker>
              <div className="flex flex-col p-4 w-7/12 ">

              {
                  colectivos.map((c) => (
                  <ColectivoParaImprimir 
                      key={c.id_colectivo} 
                      colectivo={c} 
                  />
                  ))
              }
              </div>
            </div>

        </div>
    )
}