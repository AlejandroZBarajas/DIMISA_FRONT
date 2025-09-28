import type AreaEntity from "./area_entity"

export default interface CendisEntity{
    id_cendis?: number
    cendis_nombre: string
    areas: AreaEntity[]
}