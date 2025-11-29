import type { SalidaDetalleEntity } from "./salida_detalle"

export default interface SalidaEntity {
    id_area: number
    id_cendis: number
    id_usuario : number
    claves: SalidaDetalleEntity[]
}
