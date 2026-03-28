interface DetalleEntrada {
  id_medicamento: number;
  cantidad: number;
}

export interface EntradaRequest {
  id_cendis: number;
  id_colectivo: number
  detalles: DetalleEntrada[];
}

export interface CargarInventarioRequest {
  id_cendis: number;
  detalles: DetalleEntrada[];
}