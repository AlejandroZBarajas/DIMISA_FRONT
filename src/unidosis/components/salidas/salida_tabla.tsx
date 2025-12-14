interface ItemLista {
  id_medicamento: number;
  clave: string;
  descripcion: string;
  cantidad: number;
}

interface Props{
    tipo: string
    lista: ItemLista[];
    onCantidadChange: (index: number, cantidad: number) => void;
    onEliminar: (index: number) => void;
    onGenerar: () => void; 
}
export default function TablaSalida({
    tipo,
    lista,
    onCantidadChange,
    onEliminar,
    onGenerar,
 
}:Props){
    if (lista.length === 0) return null;
    return(
        <div>

            <div className="w-12/12 border-[0.5px] bg-blue-100 p-2 mt-2 rounded-xl">
                <h4>{tipo}</h4>
            </div>
            
         
                <div id="tabla">
                <table className="w-full mt-6 border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1 text-left">Clave</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Descripción</th>
            <th className="border border-gray-300 px-2 py-1 text-center">Cantidad (cajas)</th>
            <th className="border border-gray-300 px-2 py-1 text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1">{item.clave}</td>
              <td className="border border-gray-300 px-2 py-1">{item.descripcion}</td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                <input
                  type="number"
                  min={0}
                  value={item.cantidad}
                  onChange={(e) => {
                    const nuevaCantidad = Number(e.target.value);
                    if (nuevaCantidad <= 0) {
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
      <button
        type="button"
        onClick={onGenerar}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Generar salida
      </button>
            </div>

        </div> 
    )
}