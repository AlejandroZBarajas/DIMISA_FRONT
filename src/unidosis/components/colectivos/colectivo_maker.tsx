/* import { useState } from "react";
import type { ClaveEntity } from "../../../entities/clave_entity";
import { createColectivo } from "../../../services/colectivos_service";
import SelectorTipo from "../selector_tipo_col";
import BuscadorMedicamentos from "./buscador_medicamentos";
import MedicamentoSeleccionado from "./medicamentos_seleccionados";
import TablaMedicamentos from "./tabla_medicamentos";

interface ItemLista {
  id_medicamento: number;
  clave: string;
  descripcion: string;
  cantidad: number;
}

export default function ColectivoMaker() {
  const [tipoColectivo, setTipoColectivo] = useState<number>();
  const [selected, setSelected] = useState<ClaveEntity | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [lista, setLista] = useState<ItemLista[]>([]);

  const handleSelect = (item: ClaveEntity) => {
    setSelected(item);
  };

  const handleAdd = () => {
    if (!selected) return;
    if (cantidad <= 0) return alert("La cantidad debe ser mayor a 0");

    setLista((prev) => [
      ...prev,
      {
        id_medicamento: Number(selected.id_medicamento),
        clave: selected.clave_med,
        descripcion: selected.descripcion,
        cantidad,
      },
    ]);
    setSelected(null);
    setCantidad(1);
  };

  const handleCantidadChange = (index: number, nuevaCantidad: number) => {
    setLista((prev) => {
      const copia = [...prev];
      copia[index].cantidad = nuevaCantidad;
      return copia;
    });
  };

  const handleEliminar = (index: number) => {
    setLista((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateColectivo = async () => {
    if (!tipoColectivo) {
      alert("Selecciona un tipo de colectivo");
      return;
    }

    if (lista.length === 0) {
      alert("Agrega al menos un medicamento antes de generar el colectivo");
      return;
    }

    const user_id = sessionStorage.getItem("usr");
    const id_cendis = sessionStorage.getItem("cnd");

    if (!user_id) {
      alert("No se encontró el usuario en sesión");
      return;
    }

    const colectivo = {
      tipo_id: tipoColectivo,
      fecha: new Date().toISOString().split("T")[0],
      id_user: Number(user_id),
      id_cendis: Number(id_cendis),
      claves: lista.map((item) => ({
        id_medicamento: item.id_medicamento,
        cantidad: item.cantidad,
      })),
    };

    try {
      const creado = await createColectivo(colectivo);
      console.log("Colectivo creado:", creado);
      alert("Colectivo creado exitosamente");
      setLista([]);
      setTipoColectivo(undefined);
    } catch (err) {
      console.error("Error al crear colectivo:", err);
      alert("Ocurrió un error al crear el colectivo");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-4/12 border-2 rounded-xl m-4 h-fit">
      <h2 className="text-xl font-semibold mb-4">Crear Colectivo</h2>

      <SelectorTipo
        value={tipoColectivo}
        onChange={setTipoColectivo}
        label="Tipo de Colectivo"
      />

      <BuscadorMedicamentos onSelect={handleSelect} />

      {selected && (
        <MedicamentoSeleccionado
          medicamento={selected}
          cantidad={cantidad}
          onCantidadChange={setCantidad}
          onAdd={handleAdd}
        />
      )}

      <TablaMedicamentos
        lista={lista}
        onCantidadChange={handleCantidadChange}
        onEliminar={handleEliminar}
        onGenerar={handleCreateColectivo}
      />
    </div>
  );
}
 */

import { useState } from "react";
import type { ClaveEntity } from "../../../entities/clave_entity";
import { createColectivo } from "../../../services/colectivos_service";
import SelectorTipo from "../selector_tipo_col";
import BuscadorMedicamentos from "./buscador_medicamentos";
import MedicamentoSeleccionado from "./medicamentos_seleccionados";

interface ItemLista {
  id_medicamento: number;
  clave: string;
  descripcion: string;
  cantidad: number;
}

interface ColectivosPorTipo {
  [tipo_id: number]: ItemLista[];
}

export default function ColectivoMaker() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<number>();
  const [selected, setSelected] = useState<ClaveEntity | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  
  // Estado agrupado por tipo
  const [colectivosPorTipo, setColectivosPorTipo] = useState<ColectivosPorTipo>({
    1: [], // Medicamentos
    2: [], // Soluciones
    3: [], // Material de Curación
  });

  const handleSelect = (item: ClaveEntity) => {
    setSelected(item);
  };

  const handleAdd = () => {
    if (!selected || !tipoSeleccionado) return;
    if (cantidad <= 0) return alert("La cantidad debe ser mayor a 0");

    const nuevoItem = {
      id_medicamento: Number(selected.id_medicamento),
      clave: selected.clave_med,
      descripcion: selected.descripcion,
      cantidad,
    };

    // Agregar al tipo seleccionado
    setColectivosPorTipo((prev) => ({
      ...prev,
      [tipoSeleccionado]: [...prev[tipoSeleccionado], nuevoItem],
    }));

    setSelected(null);
    setCantidad(1);
  };

  const handleCantidadChange = (tipo_id: number, index: number, nuevaCantidad: number) => {
    setColectivosPorTipo((prev) => {
      const lista = [...prev[tipo_id]];
      lista[index].cantidad = nuevaCantidad;
      return { ...prev, [tipo_id]: lista };
    });
  };

  const handleEliminar = (tipo_id: number, index: number) => {
    setColectivosPorTipo((prev) => ({
      ...prev,
      [tipo_id]: prev[tipo_id].filter((_, i) => i !== index),
    }));
  };

  const handleCreateColectivo = async (tipo_id: number) => {
    const lista = colectivosPorTipo[tipo_id];

    if (lista.length === 0) {
      alert("Agrega al menos un artículo antes de generar el colectivo");
      return;
    }

    const user_id = sessionStorage.getItem("usr");
    const id_cendis = sessionStorage.getItem("cnd");

    if (!user_id) {
      alert("No se encontró el usuario en sesión");
      return;
    }

    const colectivo = {
      tipo_id,
      fecha: new Date().toISOString().split("T")[0],
      id_user: Number(user_id),
      id_cendis: Number(id_cendis),
      claves: lista.map((item) => ({
        id_medicamento: item.id_medicamento,
        cantidad: item.cantidad,
      })),
    };

    try {
      await createColectivo(colectivo);
      alert("Colectivo creado exitosamente");
      
      setColectivosPorTipo((prev) => ({
        ...prev,
        [tipo_id]: [],
      }));
    } catch (err) {
      console.error("Error al crear colectivo:", err);
      alert("Ocurrió un error al crear el colectivo");
    }
  };

  return (
    <div className="w-5/12 p-4">
      <h2 className="text-xl font-semibold mb-4">Crear Colectivo</h2>

      <SelectorTipo
        value={tipoSeleccionado}
        onChange={setTipoSeleccionado}
        label="Tipo de Colectivo"
      />

      <BuscadorMedicamentos onSelect={handleSelect} />

      {selected && tipoSeleccionado && (
        <MedicamentoSeleccionado
          medicamento={selected}
          cantidad={cantidad}
          onCantidadChange={setCantidad}
          onAdd={handleAdd}
        />
      )}

      {!tipoSeleccionado && selected && (
        <p className="text-red-500 text-sm mt-2">
          Selecciona un tipo de colectivo primero
        </p>
      )}

      <div className="mt-6 space-y-4">
        {Object.entries(colectivosPorTipo).map(([tipo_id, lista]) => {
          if (lista.length === 0) return null;

          const tipoNombres: { [key: string]: string } = {
            "1": "Medicamentos",
            "2": "Soluciones",
            "3": "Material de Curación",
          };

          return (
            <div key={tipo_id} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">{tipoNombres[tipo_id]}</h3>
              
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 text-left">Clave</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Descripción</th>
                    <th className="border border-gray-300 px-2 py-1 text-center">Cantidad</th>
                    <th className="border border-gray-300 px-2 py-1 text-center">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                {lista.map((item: ItemLista, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1">{item.clave}</td>
                      <td className="border border-gray-300 px-2 py-1">{item.descripcion}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <input
                          type="number"
                          min={0}
                          value={item.cantidad}
                          onChange={(e) => {
                            const nuevaCantidad = Number(e.target.value);
                            if (nuevaCantidad <= 0) {
                              handleEliminar(Number(tipo_id), index);
                            } else {
                              handleCantidadChange(Number(tipo_id), index, nuevaCantidad);
                            }
                          }}
                          className="w-20 border rounded p-1 text-center"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => handleEliminar(Number(tipo_id), index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => handleCreateColectivo(Number(tipo_id))}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
              >
                Generar Colectivo de {tipoNombres[tipo_id]}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
} 