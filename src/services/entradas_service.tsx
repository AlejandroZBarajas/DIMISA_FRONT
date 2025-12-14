import type { EntradaRequest } from "../entities/entrada_request_entity";

const API_URL = import.meta.env.VITE_API_URL+"entradas/"

export async function capturarEntrada(entrada: EntradaRequest): Promise<void> {
    console.log(`${API_URL}entradas/capturar`)
  const res = await fetch(`${API_URL}capturar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrada),
  });
  
  if (!res.ok) {
    throw new Error("Error al capturar entrada");
  }
}