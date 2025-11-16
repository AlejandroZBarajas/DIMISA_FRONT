import { useEffect, useState } from "react";
import { getPendingColectivosByCendis } from "../../services/colectivos_service";
import type { ColectivoEntity } from "../../entities/colectivo_entity";
import ColectivoCard from "./colectivo_card";

export default function CapturadorEntradas() {
  const [colectivos, setColectivos] = useState<ColectivoEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const cendis = sessionStorage.getItem("cnd")
  const id_cendis = Number(cendis)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPendingColectivosByCendis(id_cendis); 
        setColectivos(res ?? []);
        console.log("res: ",res)
        console.log("id_cendis: ",id_cendis)
      } catch (err) {
        console.error("Error cargando colectivos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Cargando colectivos pendientes…</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Colectivos Pendientes de Captura</h2>

      {colectivos.length === 0 ? (
        <p>No hay colectivos pendientes.</p>
      ) : (
        colectivos.map((c) => <ColectivoCard key={c.id_colectivo} colectivo={c} />)
      )}
    </div>
  );
}
