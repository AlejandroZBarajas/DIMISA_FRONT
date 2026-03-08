import { useState } from "react";
import { useSearchInInventory } from "../../../hooks/useSearchInInventoryHook";
import type { ClaveEntity } from "../../../entities/clave_entity";

interface BuscadorInventarioProps {
  cendisId: number;
  onSelect: (clave: ClaveEntity) => void;
}

export default function BuscadorInventario({ cendisId, onSelect }: BuscadorInventarioProps) {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearchInInventory(query, cendisId);

  const handleSelect = (item: ClaveEntity) => {
    onSelect(item);
    setQuery("");
  };

  return (
    <div className="relative mb-4 w-12/12">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar medicamento..."
        className="w-full bg-white border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
  );
}