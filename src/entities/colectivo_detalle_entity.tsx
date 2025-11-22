export interface ColectivoDetalleEntity {
  id_detalle?: number;
  id_colectivo?: number;
  id_medicamento: number;
  clave?: string;
  descripcion?: string;
  cantidad: number;
}