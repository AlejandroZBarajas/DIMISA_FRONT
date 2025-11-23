import type { ColectivoDetalleEntity} from "./colectivo_detalle_entity";

export interface ColectivoEntity {
  id_colectivo?: number;
  folio?: string;
  fecha: string;
  id_user: number;
  nombre_usuario?:string
  id_area: any;
  //id_turno?: number | null;
  id_cendis: number;
  cendis?:string
  capturado?: boolean;
  claves: ColectivoDetalleEntity[];
}
