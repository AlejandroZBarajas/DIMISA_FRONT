import { useState } from "react";
import SalidaTabla from "./salida_tabla";
import BuscadorMedicamentos from "../colectivos/buscador_medicamentos";
import type AreaEntity from "../../../entities/area_entity";
import type { ClaveEntity } from "../../../entities/clave_entity";

interface ItemLista {
  id_medicamento: number;
  clave: string;
  descripcion: string;
  cantidad: number;
}

interface Props {
  area: AreaEntity;
  cendis: string;
  tipo: string;
}

export default function SalidasTipo({ area, cendis, tipo }: Props) {
  const [lista, setLista] = useState<ItemLista[]>([]);

  const handleSelectMedicamento = (clave: ClaveEntity) => {

    const yaExiste = lista.some(
      (item) => item.id_medicamento === clave.id_medicamento
    );

    if (yaExiste) {
      alert("Este medicamento ya está en la lista");
      return;
    }

    const nuevoItem: ItemLista = {
      id_medicamento: clave.id_medicamento,
      clave: clave.clave_med,
      descripcion: clave.descripcion,
      cantidad: 1,
    };

    setLista([...lista, nuevoItem]);
  };

  const handleCantidadChange = (index: number, cantidad: number) => {
    const nuevaLista = [...lista];
    nuevaLista[index].cantidad = cantidad;
    setLista(nuevaLista);
  };

  const handleEliminar = (index: number) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  const handleGenerar = () => {
    console.log("Generar salida con:", lista);

  };

  return (
    <div className="p-2 rounded-xl m-2 border-2 border-verde1 bg-gray-200">
      <h3 className="font-bold text-l">{tipo}</h3>
      
      <BuscadorMedicamentos onSelect={handleSelectMedicamento} />
      
      <SalidaTabla
        lista={lista}
        onCantidadChange={handleCantidadChange}
        onEliminar={handleEliminar}
        onGenerar={handleGenerar}
      />
    </div>
  );
}