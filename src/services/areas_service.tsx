import type AreaEntity from "../entities/area_entity";

const API_URL = import.meta.env.VITE_API_URL+"areas"

export const getAreas = async (): Promise<AreaEntity[]> => {

  const res = await fetch(API_URL,{});
  if (!res.ok) throw new Error("Error al obtener areas");
  return res.json();
};

export const createPeriodo = async (area: AreaEntity): Promise<AreaEntity> => {

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(area),
  });
  if (!res.ok) throw new Error("Error al crear periodo");
  return res.json();
};

export const updatePeriodo = async (id: number, area: AreaEntity): Promise<AreaEntity> => {

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(area),
  });
  if (!res.ok) throw new Error("Error al actualizar periodo");
  return res.json();
};

export const deletePeriodo = async (id: number): Promise<void> => {

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
};