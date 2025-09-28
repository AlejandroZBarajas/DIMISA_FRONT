import type CendisEntity from "../entities/cendis_entity";

const API_URL = import.meta.env.VITE_API_URL + "cendis/";

// ✅ Crear
export const createCendis = async (cendis: CendisEntity): Promise<CendisEntity> => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cendis),
  });
  if (!res.ok) throw new Error("El servicio no pudo crear el cendis");
  return res.json();
};

// ✅ Actualizar
export const updateCendis = async (cendis: CendisEntity): Promise<CendisEntity> => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cendis),
  });
  if (!res.ok) throw new Error("El servicio no pudo actualizar el cendis");
  return res.json();
};

// ✅ Obtener todos
export const getAllCendis = async (): Promise<CendisEntity[]> => {
  const res = await fetch(`${API_URL}/getAll`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("El servicio no pudo obtener los cendis");
  return res.json();
};

// ✅ Eliminar
export const deleteCendis = async (id_cendis: number): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/delete?id=${id_cendis}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("El servicio no pudo eliminar el cendis");
  return res.json();
};
