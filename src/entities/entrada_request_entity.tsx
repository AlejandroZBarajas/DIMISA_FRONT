interface DetalleEntrada {
  id_medicamento: number;
  cantidad: number;
}

export interface EntradaRequest {
  id_cendis: number;
  id_colectivo: number
  detalles: DetalleEntrada[];
}