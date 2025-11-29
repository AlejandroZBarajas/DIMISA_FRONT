import type SalidaEntity  from "../entities/salida_entity";
import type SalidaDTO from "../entities/salida_DTO";

const API_URL = import.meta.env.VITE_API_URL+"salidas/"


export async function createSalida(data: SalidaEntity): Promise<SalidaDTO> {
  try {
    const response = await fetch(`${API_URL}create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear el colectivo: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createColectivo:", error);
    throw error;
  }
}

export async function getSalidasByCendis(id_cendis: number): Promise<SalidaDTO[]> {
  try {
    const response = await fetch(`${API_URL}by-cendis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cendis }),
    });

    if (!response.ok) throw new Error("No se pudieron obtener los colectivos");

    return await response.json();
  } catch (error) {
    console.error("Error en getColectivosByCendis:", error);
    throw error;
  }
}

/* export async function getPendingColectivosByCendis(id_cendis: number): Promise<SalidaEntity[]> {
  try {
    const response = await fetch(`${API_URL}colectivos/pending`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cendis }),
    });

    if (!response.ok) throw new Error("No se pudieron obtener los colectivos pendientes");

    return await response.json();
  } catch (error) {
    console.error("Error en getPendingColectivosByCendis:", error);
    throw error;
  }
} */

export async function getSalidasEditablesByCendis(id_cendis: number): Promise<SalidaEntity[]> {
  try {
    const response = await fetch(`${API_URL}editables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cendis }),
    });

    if (!response.ok) throw new Error("No se pudieron obtener los colectivos pendientes");

    return await response.json();
  } catch (error) {
    console.error("Error en getColectivosEditablesByCendis:", error);
    throw error;
  }
}