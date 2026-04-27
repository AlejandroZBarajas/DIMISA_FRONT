import { useEffect, useState } from "react"
import { getCpm } from "../../../services/cpm_service"
import type { CpmEntity, CpmDetalle } from "../../../entities/cpm_entity"

type Estado = "idle" | "loading" | "success" | "error"

function CpmTable() {
  const [data, setData] = useState<CpmEntity | null>(null)
  const [estado, setEstado] = useState<Estado>("idle")

  useEffect(() => {
    setEstado("loading")
    getCpm()
      .then((res) => { setData(res); setEstado("success") })
      .catch(() => setEstado("error"))
  }, [])

  if (estado === "loading")
    return <p className="mt-4 text-sm text-gray-500 animate-pulse">Cargando CPM…</p>

  if (estado === "error")
    return <p className="mt-4 text-sm text-red-500">No se pudo obtener el CPM.</p>

  if (!data || data.detalles.length === 0)
    return <p className="mt-4 text-sm text-gray-500">Sin datos de consumo.</p>

  // los nombres de mes vienen del primer registro (todos comparten el mismo orden)
  const nombresMes = data.detalles[0].meses.map((m) => m.nombre)

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 sticky left-0 bg-gray-50 z-10">Clave</th>
            <th className="px-4 py-3">Descripción</th>
            {nombresMes.map((nombre, i) => (
              <th key={i} className="px-4 py-3 whitespace-nowrap">{nombre}</th>
            ))}
            <th className="px-4 py-3 whitespace-nowrap">Sumatoria</th>
            <th className="px-4 py-3 whitespace-nowrap">Prom. mensual</th>
            <th className="px-4 py-3 whitespace-nowrap">Prom. diario</th>
            <th className="px-4 py-3 whitespace-nowrap">10%</th>
            <th className="px-4 py-3 whitespace-nowrap">Consumo diario</th>
            <th className="px-4 py-3 whitespace-nowrap">Consumo mensual</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.detalles.map((d: CpmDetalle) => (
            <tr key={d.id_medicamento} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-mono text-gray-500 sticky left-0 bg-white">{d.clave}</td>
              <td className="px-4 py-2 text-gray-700 max-w-xs truncate">{d.descripcion}</td>
              {d.meses.map((m, i) => (
                <td key={i} className="px-4 py-2 tabular-nums text-gray-600">{m.consumo}</td>
              ))}
              <td className="px-4 py-2 tabular-nums font-semibold text-gray-700">{d.sumatoria}</td>
              <td className="px-4 py-2 tabular-nums text-gray-600">{d.promedio_mensual}</td>
              <td className="px-4 py-2 tabular-nums text-gray-600">{d.promedio_diario}</td>
              <td className="px-4 py-2 tabular-nums text-gray-600">{d.diez_pct}</td>
              <td className="px-4 py-2 tabular-nums text-gray-600">{d.consumo_diario}</td>
              <td className="px-4 py-2 tabular-nums font-semibold text-gray-700">{d.consumo_mensual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CpmTable