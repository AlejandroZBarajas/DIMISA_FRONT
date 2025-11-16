import { useState } from "react";
import type { ColectivoEntity } from "../../entities/colectivo_entity";

interface Props {
  colectivo: ColectivoEntity;
}

export default function ColectivoCard({ colectivo }: Props) {
  const [open, setOpen] = useState(false);

  function handleGuardar() {
    console.log("Guardar colectivo:", colectivo.id_colectivo);
    
  }

  return (
    <div className="border rounded-lg shadow p-4 mb-4">
      {/* HEADER con datos del colectivo */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="font-bold text-lg">{colectivo.folio}</h3>
          <p>Fecha: {colectivo.fecha}</p>
          <p>ID usuario: {colectivo.id_user}</p>
        </div>

        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
          {open ? "Cerrar" : "Abrir"}
        </button>
      </div>

      {/* CONTENIDO */}
      {open && (
        <div className="mt-4">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Clave</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Solicitado</th>
                <th className="border p-2">Recibido</th>
              </tr>
            </thead>

            <tbody>
              {colectivo.claves.map((d) => (
                <tr key={d.id_detalle}>
                  <td className="border p-2">{d.clave}</td>
                  <td className="border p-2">{d.descripcion}</td>
                  <td className="border p-2">{d.cantidad}</td>

                  <td className="border p-2">
                    <input
                      type="number"
                      min={0}
                      defaultValue={0}
                      className="w-full border rounded p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BOTÓN GUARDAR */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
