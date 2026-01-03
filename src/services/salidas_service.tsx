import type SalidaEntity  from "../entities/salida_entity";
import type SalidaDTO from "../entities/salida_DTO";

const API_URL = import.meta.env.VITE_API_URL+"salidas/"


export async function createSalida(data: SalidaEntity): Promise<void> {
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



export async function getSalidasEditablesByCendis(id_cendis: number): Promise<SalidaDTO[]> {
  try {
    const response = await fetch(`${API_URL}abiertas`, {
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

export async function updateSalida(id_salida: number, salida: SalidaEntity) {
  try {
    // Construir URL con el ID
    const response = await fetch(`${API_URL}update/${id_salida}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // Enviar el objeto salida directamente, NO envolver en {salida: ...}
      body: JSON.stringify(salida),
    });

    // Si la respuesta no es OK, extraer el mensaje de error del servidor
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "No se pudo actualizar la salida");
    }

    return await response.json();

  } catch (error) {
    console.error("Error al actualizar salida:", error);
    throw error;
  }
}