/* import { useState } from "react";
import type { ColectivoEntity } from "../../entities/colectivo_entity";


interface Props {
  colectivo: ColectivoEntity;
}

export default function ColectivoParaImprimir({ colectivo }: Props) {
  const [open, setOpen] = useState(false);



  async function handleImprimir() {

  }

  return (
    <div className="border rounded-lg shadow p-4 mb-4 w-1/2  ">
      
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="font-bold text-lg">{colectivo.folio}</h3>
          <p>Fecha: {colectivo.fecha}</p>
          <p>Nombre de quien genera el colectivo: {colectivo.nombre_usuario}</p>
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
                <th className="border p-2">Cantidad solicitada</th>

              </tr>
            </thead>
            <tbody>
              {colectivo.claves.map((d) => (
                <tr key={d.id_detalle}>
                  <td className="border p-2">{d.clave}</td>
                  <td className="border p-2">{d.descripcion}</td>
                  <td className="border p-2">{d.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleImprimir}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {"Imprimir"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} */

  import { useState } from "react";
import type { ColectivoEntity } from "../../entities/colectivo_entity";

interface Props {
  colectivo: ColectivoEntity;
}

export default function ColectivoParaImprimir({ colectivo }: Props) {
  const [open, setOpen] = useState(false);

function handleImprimir() {
  const ventana = window.open("", "_blank");
  if (!ventana) return;

  ventana.document.write(`
    <html>
      <head>
        <style>
          @page {
            margin: 8mm;
          }
          body { 
            font-family: Arial, sans-serif; 
            padding: 10px;
            font-size: 10px;
          }
          table { 
            border: 1px solid #000; 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 10px; 
          }
          th, td { 
            border: 1px solid #000;
            padding: 4px; 
            text-align: left; 
            font-size: 9px;
          }
          th { background-color: #f0f0f0; }
          h2 { 
            margin-bottom: 5px; 
            font-size: 14px;
          }
          p { 
            margin: 2px 0; 
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        <h2>Colectivo: ${colectivo.folio}</h2>
        <p><strong>Fecha:</strong> ${colectivo.fecha}</p>
        <p><strong>Generado por:</strong> ${colectivo.nombre_usuario}</p>
        <table>
          <thead>
            <tr>
              <th>Clave</th>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            ${colectivo.claves.map(d => `
              <tr>
                <td>${d.clave}</td>
                <td>${d.descripcion}</td>
                <td>${d.cantidad}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `);

  ventana.document.close();
  ventana.print();
}

  return (
    <div className="border rounded-lg shadow p-4 mb-4 w-1/2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="font-bold text-lg">{colectivo.folio}</h3>
          <p>Fecha: {colectivo.fecha}</p>
          <p>Nombre de quien genera el colectivo: {colectivo.nombre_usuario}</p>
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
                <th className="border p-2">Cantidad solicitada</th>
              </tr>
            </thead>
            <tbody>
              {colectivo.claves.map((d) => (
                <tr key={d.id_detalle}>
                  <td className="border p-2">{d.clave}</td>
                  <td className="border p-2">{d.descripcion}</td>
                  <td className="border p-2">{d.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleImprimir}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Imprimir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}