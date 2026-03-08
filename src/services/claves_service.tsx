import type { SearchResponse } from "../entities/search_response";

const API_URL = import.meta.env.VITE_API_URL


export async function SearchClaves(query: string): Promise<SearchResponse> {
  if (!query.trim()) {
    return { success: true, data: [], count: 0 }
  }

  const res = await fetch(`${API_URL}/medicamentos/search?q=${encodeURIComponent(query)}`)

  if (!res.ok) {
    const errorMsg = await res.text()
    throw new Error(errorMsg || "Error al buscar claves")
  }

  return res.json()
}

export async function SearchInInventory(query: string, cendisId: number) {
  const response = await fetch(
    `${API_URL}/medicamentos/inventory/search?q=${encodeURIComponent(query)}&cendis=${cendisId}`
  )
  if (!response.ok) throw new Error("Error al buscar en inventario")
  return response.json()
}