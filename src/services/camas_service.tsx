import type CamaEntity from "../entities/cama_entity";

const API_URL = import.meta.env.VITE_API_URL+"camas/"

export const getCamasByArea = async (id_area : number): Promise <CamaEntity[]> => {
    const res = await fetch(`${API_URL}by-area`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id_area}),
    })
    if (!res.ok) throw new Error("Error al cargar camas por servicio (servicio)");
    return res.json();
}

export const enableCama = async (id_cama : number): Promise <void> => {
    const res = await fetch(`${API_URL}enable`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id_cama}),
    })
    if (!res.ok) throw new Error("Error al cargar camas por servicio (servicio)");
    return 
}

export const disableCama = async (id_cama : number): Promise <void> => {
    const res = await fetch(`${API_URL}disable`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id_cama}),
    })
    if (!res.ok) throw new Error("Error al cargar camas por servicio (servicio)");
    return;
}