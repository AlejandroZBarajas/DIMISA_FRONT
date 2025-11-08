import { useState } from "react"
import { useSearchClaves } from "../../hooks/useSearchClavesHook"

export default function SearchMedicamentos() {
  const [query, setQuery] = useState("")
  const { results, loading, error } = useSearchClaves(query)

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar medicamento..."
        className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p className="mt-2 text-gray-500">Buscando...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {!loading && results.length > 0 && (
        <table>
          <thead>
          <tr>
              <th className="border border-gray-300 px-2 py-1 text-left">Clave</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Descripción</th>
            </tr>

          </thead>
           <tbody>
            {results.map((clave) => (
              <tr
                key={clave.id_medicamento}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="border border-gray-300 px-2 py-1">{clave.clave_med}</td>
                <td className="border border-gray-300 px-2 py-1">{clave.descripcion}</td>
              </tr>
            ))}
           </tbody>
        </table>
      /*   <ul className="mt-3 border rounded-lg divide-y">
          {results.map((clave) => (
            <li key={clave.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              <strong>{clave.nombre}</strong>
              {clave.descripcion && <p className="text-sm text-gray-600">{clave.descripcion}</p>}
            </li>
          ))}
        </ul> */
      )}

      {!loading && !error && query.length >= 2 && results.length === 0 && (
        <p className="mt-2 text-gray-500">No se encontraron resultados</p>
      )}
    </div>
  )
}
