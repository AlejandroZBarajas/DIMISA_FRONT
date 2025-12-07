import { useState } from "react";
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