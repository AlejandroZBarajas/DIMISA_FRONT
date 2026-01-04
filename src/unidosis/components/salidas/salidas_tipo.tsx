import { useState } from "react";
import SalidaTabla from "./salida_tabla";
import BuscadorMedicamentos from "../colectivos/buscador_medicamentos";
import type AreaEntity from "../../../entities/area_entity";
import type { ClaveEntity } from "../../../entities/clave_entity";
import { createSalida, cerrarSalida } from "../../../services/salidas_service";
import { Template } from "../../../imprimir/template";
import { PrintColSal } from "../../../imprimir/printer";
import type SalidaEntity from "../../../entities/salida_entity";

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
  id_tipo: number;
}

export default function SalidasTipo({ area, cendis, tipo, id_tipo }: Props) {
  const [lista, setLista] = useState<ItemLista[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePrint = async () => {
    if (lista.length === 0) {
      alert("Debes agregar al menos un medicamento antes de imprimir");
      return;
    }

    if (!window.confirm("¿Estás seguro de imprimir y cerrar esta salida? Esta acción no se puede deshacer.")) {
      return;
    }

    setIsProcessing(true);

    try {
      const id_cendis = Number(sessionStorage.getItem("cnd"));
      const id_usuario = Number(sessionStorage.getItem("usr"));
     // const usuario_nombre = sessionStorage.getItem("user_name") || "Usuario";
      
      const claves = lista.map(item => ({
        id_medicamento: item.id_medicamento,
        cantidad: item.cantidad
      }));

      const salidaData: SalidaEntity = {
        id_cendis,
        id_area: area.id_area!,
        id_usuario,
        tipo_id: id_tipo!,
        fecha: new Date().toISOString().split('T')[0],
        claves
      };

      // 3. Crear la salida (retorna el id_salida)
      console.log("Creando nueva salida...");
      console.log("salida enviada al back...  ",salidaData)
      const response = await createSalida(salidaData);
      const idSalidaCreada = response.id_salida;
      
      console.log("Salida creada con ID:", idSalidaCreada);

      // 4. Generar el folio
      const folio = `SAL-${idSalidaCreada.toString().padStart(6, '0')}`;

      // 5. Preparar datos para el template
      const templateData = {
        encabezado: "SALIDA",
        tipo_nombre: tipo,
        folio: folio,
        fecha: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
       // usuario_nombre: usuario_nombre,
        cendis_nombre: cendis,
        area_nombre: area.nombre_area,
        lista: lista.map(item => ({
          clave: item.clave,
          descripcion: item.descripcion,
          cantidad: item.cantidad
        }))
      };

      // 6. Generar HTML del documento
      const html = Template(templateData);

      // 7. Imprimir
      PrintColSal(html);

      // 8. Cerrar la salida (cambiar editable y pendiente a false)
      await cerrarSalida(idSalidaCreada);
      console.log("Salida cerrada exitosamente");

      // 9. Limpiar el estado
      setLista([]);
      setIsExpanded(false);

      alert("Salida impresa y cerrada exitosamente");

    } catch (error) {
      console.error("Error en el proceso:", error);
      alert(`Error al procesar la salida: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsProcessing(false);
    }
  };

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
            toPrint={handlePrint}
            isProcessing={isProcessing}
          />
        </div>
      )}
    </div>
  );
}