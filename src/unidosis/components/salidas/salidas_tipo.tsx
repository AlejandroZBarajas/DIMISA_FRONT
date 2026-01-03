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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleUpdate = () => {
    alert("ver consola")
    console.log("Generar salida con:", lista);
  };

  // Determinar el color de fondo según si hay items en la lista
  const bgColor = lista.length > 0 ? "bg-green-100" : "bg-gray-200";
  const borderColor = lista.length > 0 ? "border-green-500" : "border-verde1";

  return (
    <div className={`p-2 rounded-xl m-2 border-2 ${borderColor} ${bgColor}`}>
      {/* Header clickeable para expandir/colapsar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-colors p-2 rounded"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-l">{tipo}</h3>
          {lista.length > 0 && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              {lista.length} item{lista.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        
        {/* Indicador visual de expandido/colapsado */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="mt-3">
          <BuscadorMedicamentos onSelect={handleSelectMedicamento} />
          
          <SalidaTabla
            lista={lista}
            onCantidadChange={handleCantidadChange}
            onEliminar={handleEliminar}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}