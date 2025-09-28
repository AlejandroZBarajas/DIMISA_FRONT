import { useState } from "react";
import type CendisEntity from "../../../entities/cendis_entity";
import type AreaEntity from "../../../entities/area_entity";

interface Props {
  cendis?: CendisEntity | null;
  areas: AreaEntity[];
  onSave: (cendis: CendisEntity & { areas: number[] }) => void;
  onCancel: () => void;
}

interface CendisFormData {
  cendis_nombre: string;
  selectedAreas: number[];
}

export default function CendisForm({ cendis, areas, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<CendisFormData>({
    cendis_nombre: cendis?.cendis_nombre || "",
    selectedAreas: [], // ya no usamos cendis.areas porque no existe
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAreaToggle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedAreas: prev.selectedAreas.includes(id)
        ? prev.selectedAreas.filter((a) => a !== id)
        : [...prev.selectedAreas, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id_cendis: cendis?.id_cendis || 0,
      cendis_nombre: formData.cendis_nombre,
      areas: formData.selectedAreas,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2>{cendis ? "Editar Cendis" : "Nuevo Cendis"}</h2>

      <input
        type="text"
        name="cendis_nombre"
        placeholder="Nombre del Cendis"
        value={formData.cendis_nombre}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Áreas disponibles:</span>
        {areas.map((area) => (
          <label key={area.id_area} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.selectedAreas.includes(area.id_area!)}
              onChange={() => handleAreaToggle(area.id_area!)}
            />
            {area.nombre_area}
          </label>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
