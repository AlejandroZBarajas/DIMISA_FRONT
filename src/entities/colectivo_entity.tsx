import type { ClaveCantidad } from "./clave_cantidad_entity";

export interface Colectivo {
  id_colectivo?: number;
  folio?: string;
  fecha: string;
  id_user: number;
  //id_area: number;
  //id_turno?: number | null;
  id_cendis: number;
  capturado?: boolean;
  claves: ClaveCantidad[];
}
