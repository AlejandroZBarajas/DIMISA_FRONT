import { useState } from "react";
import type AreaEntity from "../../../entities/area_entity";
interface Props {
  area?: AreaEntity | null;
  onSave: (area: AreaEntity) => void;
  onCancel: () => void;
}

export default function AreaForm({ area, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<AreaEntity>(
    area || {
      nombre_area: "",
      cama_1:0,
      cama_n:0
    }
  );


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target
  setFormData({
    ...formData,
    [name]: type === "number" ? Number(value) : value,
  })
}



  const handleSubmit = (e: React.FormEvent) => {
    console.log("formData:" +formData)
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-morado">
        {area ? "Editar Area" : "Nueva Area"}
      </h2>

      <input
        type="text"
        name="nombre_area"
        placeholder="Nombre del area"
        value={formData.nombre_area}
        onChange={handleChange}
        className="border p-2 rounded border-verde1"
        required
      />

      <input
        type="number"
        name="cama_1"
        placeholder="Número de la primer cama"
        value={formData.cama_1}
        onChange={handleChange}
        className="border p-2 rounded border-verde1"
        required
      />

       <input
        type="number"
        name="cama_n"
        placeholder="Número de la ultima cama"
        value={formData.cama_n}
        onChange={handleChange}
        className="border p-2 rounded border-verde1"
        required
      />

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-azul3 text-white p-2 rounded">
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-rojo text-white p-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}