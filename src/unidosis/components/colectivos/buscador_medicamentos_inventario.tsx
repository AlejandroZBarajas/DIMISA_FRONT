import { useState } from "react";
import { useSearchInInventory } from "../../../hooks/useSearchInInventoryHook";
import type { ClaveInventarioEntity } from "../../../entities/clave_inventario_entity";

interface BuscadorInventarioProps {
  cendisId: number;
  onSelect?: (clave: ClaveInventarioEntity) => void;
}

export default function BuscadorInventario({ cendisId, onSelect }: BuscadorInventarioProps) {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearchInInventory(query, cendisId);

  const handleSelect = (item: ClaveInventarioEntity) => {
    if (item.cantidad_actual === 0) return
    onSelect?.(item);
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
            results
            .filter((clave) => clave.cantidad_actual !== undefined && clave.cantidad_actual > 0)    
            .map((clave) => (
              <div
                key={clave.id_medicamento}
                onClick={() => handleSelect(clave)}
                className={`p-2 cursor-pointer ${
                    clave.cantidad_actual === 0 
                    ? "opacity-50 cursor-not-allowed bg-gray-50" 
                    : "hover:bg-blue-50"
                    }`}
                >
                <div className="flex justify-between items-center">
                    <strong>{clave.clave_med}</strong>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium `}>
                    Stock: {clave.cantidad_actual}
                    </span>
                </div>
                <p className="text-sm text-gray-600">{clave.descripcion}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}