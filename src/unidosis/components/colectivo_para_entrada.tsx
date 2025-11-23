import { useState } from "react";
import type { ColectivoEntity } from "../../entities/colectivo_entity";
import { capturarEntrada } from "../../services/entradas_service";

interface Props {
  colectivo: ColectivoEntity;
}

export default function ColectivoParaEntrada({ colectivo }: Props) {
  const [open, setOpen] = useState(false);
  const [cantidades, setCantidades] = useState<Record<number, number>>({});
  const [guardando, setGuardando] = useState(false);

  function handleCantidadChange(id_medicamento: number, valor: string) {
    setCantidades(prev => ({
      ...prev,
      [id_medicamento]: Number(valor) || 0
    }));
  }

  async function handleGuardar() {
    setGuardando(true);
    try {
      const detalles = colectivo.claves
        .filter(d => cantidades[d.id_medicamento] > 0)
        .map(d => ({
          id_medicamento: d.id_medicamento,
          cantidad: cantidades[d.id_medicamento]
        }));

      if (detalles.length === 0) {
        alert("No hay cantidades para guardar");
        return;
      }

      await capturarEntrada({
        id_cendis: colectivo.id_cendis,
        id_colectivo: colectivo.id_colectivo!,
        detalles
      });

      alert("Entrada capturada correctamente");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error al capturar entrada");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="border rounded-lg shadow p-4 mb-4">
      <h1>colectivo para entrada</h1>
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

      {open && (
        <div className="mt-4">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Clave</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Cajas solicitadas</th>
                <th className="border p-2">Piezas recibidas</th>
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
                      value={cantidades[d.id_medicamento] ?? ""}
                      onChange={(e) => handleCantidadChange(d.id_medicamento, e.target.value)}
                      className="w-full border rounded p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}