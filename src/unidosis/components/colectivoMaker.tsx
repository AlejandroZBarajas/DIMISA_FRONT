import { useState } from "react"
import { useSearchClaves } from "../../hooks/useSearchClavesHook"
import type { ClaveEntity } from "../../entities/clave_entity"
import { createColectivo } from "../../services/colectivos_service"

export default function ColectivoMaker() {
  const [query, setQuery] = useState("")
  const { results, loading, error } = useSearchClaves(query)

  const [selected, setSelected] = useState<ClaveEntity | null>(null)
  const [cantidad, setCantidad] = useState<number>(1)
const [lista, setLista] = useState<
  { id_medicamento: number; clave: string; descripcion: string; cantidad: number }[]
>([])

  const user_id = sessionStorage.getItem("usr")
  const handleSelect = (item: ClaveEntity) => {
    setSelected(item)
    setQuery("") 
  }

  const handleAdd = () => {
    
    if (!selected) return
    if (cantidad <= 0) return alert("La cantidad debe ser mayor a 0")
    setLista((prev) => [
      ...prev,
      {
        id_medicamento: Number(selected.id_medicamento),
        clave: selected.clave_med,
        descripcion: selected.descripcion,
        cantidad,
      },
    ])
    setSelected(null)
    setCantidad(1)
  }

const handleCreateColectivo = async () => {
  if (lista.length === 0) {
    alert("Agrega al menos un medicamento antes de generar el colectivo")
    return
  }

  const user_id = sessionStorage.getItem("usr")
  //const id_area = sessionStorage.getItem("ar")
  const id_cendis = sessionStorage.getItem("cnd")
  if (!user_id) {
    alert("No se encontró el usuario en sesión")
    return
  }

  const colectivo = {
    fecha: new Date().toISOString().split("T")[0], // formato YYYY-MM-DD
    id_user: Number(user_id),
    //id_area: Number(id_area),
    id_cendis: Number(id_cendis),
    capturado: false,
    claves: lista.map((item) => ({
      id_medicamento: item.id_medicamento,
      cantidad: item.cantidad,
    })),
  }

  console.log(colectivo)
  try {
    const creado = await createColectivo(colectivo)
    console.log("✅ Colectivo creado:", creado)
    alert(`Colectivo generado con folio ${creado.folio}`)
    setLista([]) // limpia la tabla después de crear
  } catch (err) {
    console.error("❌ Error al crear colectivo:", err)
    alert("Ocurrió un error al crear el colectivo")
  }
}


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Agregar Medicamentos</h2>

      {/*  Buscador */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar medicamento..."
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Resultados de búsqueda */}
        {query.length >= 2 && (
          <div className="absolute w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
            {loading && <p className="p-2 text-gray-500">Buscando...</p>}
            {error && <p className="p-2 text-red-500">{error}</p>}
            {!loading &&
              results.map((clave) => (
                <div
                  key={clave.id_medicamento}
                  onClick={() => handleSelect(clave)}
                  className="p-2 hover:bg-blue-50 cursor-pointer"
                >
                  <strong>{clave.clave_med}</strong>
                  <p className="text-sm text-gray-600">{clave.descripcion}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/*  Sección de cantidad y añadir */}
      {selected && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <p>
            <strong>Seleccionado:</strong> {selected.clave_med} —{" "}
            {selected.descripcion}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-24 border rounded-lg p-1"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Añadir
            </button>
          </div>
        </div>
      )}

      {/*  Tabla con medicamentos añadidos */}
      {lista.length > 0 && (
        <>
        <table className="w-full mt-6 border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Clave
              </th>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Descripción
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                Cantidad (cajas)
              </th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">
                  {item.clave}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {item.descripcion}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {item.cantidad}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <button
              type="button"
              onClick={handleCreateColectivo}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Generar colectivo
            </button>
            </>
      )}
  
    </div>
  )
}
