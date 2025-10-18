import { useState } from "react";
import type CamaEntity from "../../entities/cama_entity";
import CamaForm from "./cama_form";

interface Props {
  cama: CamaEntity;
  onRefresh: () => void;
}

export default function CamaCard({ cama, onRefresh }: Props) {
  const [showForm, setShowForm] = useState(false);

  const color = cama.occupied ? "#110045" : "#1EFF00";

  return (
    <div
      className="flex flex-col border-solid rounded-xl border-2 p-2 w-[250px]"
      style={{ width: "250px", backgroundColor: color }}
    >
      <h3>Cama {cama.numero_cama}</h3>
      <h3>{cama.nombres}</h3>
      <h3>{cama.apellido1}</h3>
      <h3>{cama.apellido2}</h3>
      <h3>{cama.fecha_nac}</h3>
      <h3>{cama.expediente}</h3>

      {/* BOTÓN SEGÚN ESTADO */}
      {!cama.occupied ? (
        <button
          className="bg-blue-600 text-white p-1 rounded mt-2"
          onClick={() => setShowForm(true)}
        >
          Ocupar cama
        </button>
      ) : (
        <button
          className="bg-yellow-500 text-white p-1 rounded mt-2"
          onClick={() => setShowForm(true)}
        >
          Editar paciente
        </button>
      )}

      {/* MODAL DEL FORMULARIO */}
      {showForm && (
        <CamaForm cama={cama} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

