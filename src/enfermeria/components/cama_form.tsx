import { useState } from "react";
import type CamaEntity from "../../entities/cama_entity";

interface Props {
  cama: CamaEntity;
  onClose: () => void;
}

export default function CamaForm({ cama, onClose }: Props) {
  const [form, setForm] = useState({ ...cama });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[300px]">
        <h2 className="text-xl font-bold mb-2">Datos del paciente</h2>

        <label>Nombre(s)</label>
        <input
          type="text"
          name="nombres"
          value={form.nombres || ""}
          onChange={handleChange}
          className="border p-1 w-full mb-2"
        />

        <label>Apellido 1</label>
        <input
          type="text"
          name="apellido1"
          value={form.apellido1 || ""}
          onChange={handleChange}
          className="border p-1 w-full mb-2"
        />

        <label>Apellido 2</label>
        <input
          type="text"
          name="apellido2"
          value={form.apellido2 || ""}
          onChange={handleChange}
          className="border p-1 w-full mb-2"
        />

        <label>Fecha de nacimiento</label>
        <input
          type="text"
          name="fecha_nac"
          value={form.fecha_nac || ""}
          onChange={handleChange}
          className="border p-1 w-full mb-2"
        />

        <label>Expediente</label>
        <input
          type="text"
          name="expediente"
          value={form.expediente || ""}
          onChange={handleChange}
          className="border p-1 w-full mb-2"
        />

        {/* BOTONES DEL MODAL */}
        <div className="flex justify-between mt-3">
          <button className="bg-gray-400 text-white p-1 rounded" onClick={onClose}>
            Cancelar
          </button>

          <button className="bg-green-600 text-white p-1 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
