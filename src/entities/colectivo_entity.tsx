import type { ColectivoDetalleEntity} from "./colectivo_detalle_entity";

export interface ColectivoEntity {
  id_colectivo?: number;
  folio?: string;
  fecha: string;
  id_user: number;
  id_area: any;
  //id_turno?: number | null;
  id_cendis: number;
  capturado?: boolean;
  claves: ColectivoDetalleEntity[];
}
