import { useState, useEffect } from "react";
import Header from "../../common/header";
import AdminSubheader from "../components/admin_subheader";
import CamaIOswitch from "../components/camas/cama_IO_switch";
import type CamaEntity from "../../entities/cama_entity";
import type AreaEntity from "../../entities/area_entity";
import { getCamasByArea, enableCama, disableCama } from "../../services/camas_service";
import { getAreas } from "../../services/areas_service";

function AdminCamas() {
  const [areas, setAreas] = useState<AreaEntity[]>([]);
  const [camasByArea, setCamasByArea] = useState<Record<number, CamaEntity[]>>({});

  const fetchCamasByArea = async (areaId: number) => {
    try {
      const data = await getCamasByArea(areaId);
      setCamasByArea((prev) => ({
        ...prev,
        [areaId]: data,
      }));
    } catch (error) {
      console.error(`Error al cargar camas del área ${areaId}`, error);
    }
  };

  const fetchAreas = async () => {
    try {
      const data = await getAreas();
      setAreas(data);

      for (const area of data) {
        await fetchCamasByArea(area.id_area!);
      }
    } catch (error) {
      console.error("error al cargar áreas", error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div>
      <Header />
      <AdminSubheader />

      <h2 className="text-2xl font-bold mb-4">Gestión de Camas</h2>

      {areas.map((area) => (
        <div
          key={area.id_area}
          className="mb-6 border border-gray-300 p-4 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-3 text-morado">
            {area.nombre_area}
          </h3>

          <div className="flex flex-wrap gap-4">
            {camasByArea[area.id_area!]?.map((cama) => (
              <CamaIOswitch
                key={cama.id_cama}
                id_cama={cama.id_cama!}
                numero_cama={cama.numero_cama}
                habilitada={cama.habilitada}
                turnOn={enableCama}
                turnOff={disableCama}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCamas;
