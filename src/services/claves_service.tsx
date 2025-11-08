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
