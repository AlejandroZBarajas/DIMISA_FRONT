import { useEffect, useState } from "react";
import type CamaEntity from "../../entities/cama_entity";
import { getCamasByArea } from "../../services/camas_service";
import CamaCard from "../components/cama_card";
import Header from "../../common/header"
import EnfermeriaSubheader from "../components/enfermeria_subheader";

function EnfermeriaCamas(){


    const [camas, setCamas] = useState<CamaEntity[]>([]);
    const id_area = Number(sessionStorage.getItem("ar"));
    
    const fetchCamas = async () => {
    try {
        const data = await getCamasByArea(id_area);
      const sorted = data
        .filter(c => c.habilitada)
        .sort((a, b) => (b.occupied ? 1 : 0) - (a.occupied ? 1 : 0));
      setCamas(sorted);
    } catch (err) {
        console.error(err);
    }
};

useEffect(() => { fetchCamas(); }, []);

return (
    <div>
        <Header/>
        <EnfermeriaSubheader/>
      <h1>Camas del Área {id_area}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {camas.map(cama => (
            <CamaCard key={cama.id_cama} cama={cama} onRefresh={fetchCamas} />
        ))}
      </div>
    </div>
  );
}

export default EnfermeriaCamas