import { useState } from "react";
import type AreaEntity from "../../../entities/area_entity";
import type TipoEntity from "../../../entities/tipo_entity";
import TablaSalida from "./salida_tabla";
import BuscadorMedicamentos from "../colectivos/buscador_medicamentos";
import type { ClaveEntity } from "../../../entities/clave_entity";
import MedicamentoSeleccionado from "../colectivos/medicamentos_seleccionados";

interface Props{
  area: AreaEntity
  tipos: TipoEntity[]
}

export default function SalidasMaker({area, tipos}:Props){
  const [selected, setSelected] = useState <ClaveEntity | null>(null)
  const [cantidad, setCantidad] = useState<number>(1);

  
  const handleSelect=( item:ClaveEntity) => {setSelected(item)}


     return (
      <div className="ma x-w-4xl mx-auto p-4 w-1/4 border-2 p-1 m-2 rounded-xl">
        <div className="w-12/12 border-2 bg-azul3 p-1 rounded-xl">
          <h2 className="font-bold text-white text-center text-xl ">{area.nombre_area}</h2>  
        </div>
        <BuscadorMedicamentos
          onSelect={handleSelect}
        />
    

        {
           tipos.map((tipo)=> (
            <TablaSalida
              key={tipo.id_tipo}
              tipo={tipo.nombre}
            />
          )) 
        }
      </div>
  )
}