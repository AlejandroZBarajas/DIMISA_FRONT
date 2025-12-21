interface ItemLista {
  id_medicamento: number;
  clave: string;
  descripcion: string;
  cantidad: number;
}

interface Props {
  lista: ItemLista[];
  onCantidadChange: (index: number, cantidad: number) => void;
  onEliminar: (index: number) => void;
  onGenerar: () => void;
}

export default function SalidaTabla({
  lista,
  onCantidadChange,
  onEliminar,
  onGenerar,
}: Props) {
  if (lista.length === 0) return null;

  return (
    <div className=" ">
      <div id="tabla">
        <table className="w-full mt-6 border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left">Clave</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Descripción</th>
              <th className="border border-gray-300 px-2 py-1 text-center">Cantidad (piezas)</th>
              <th className="border border-gray-300 px-2 py-1 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item, index) => (
              <tr key={item.id_medicamento} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">{item.clave}</td>
                <td className="border border-gray-300 px-2 py-1">{item.descripcion}</td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <input
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevaCantidad = Number(e.target.value);
                      if (nuevaCantidad < 1) {
                        onEliminar(index);
                      } else {
                        onCantidadChange(index, nuevaCantidad);
                      }
                    }}
                    className="w-20 border rounded p-1 text-center"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button
                    onClick={() => onEliminar(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={onGenerar}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}