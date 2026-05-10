import type { SearchResponse } from "../entities/search_response";

const API_URL = import.meta.env.VITE_API_URL

type ItemType = "med" | "mat"

export async function SearchClaves(query: string, type: ItemType): Promise<SearchResponse> {
  if (!query.trim()) {
    return { success: true, data: [], count: 0 }
  }

  const endpoint = type === "med" ? "/claves/searchMed" : "/claves/searchMat"
  const res = await fetch(`${API_URL}${endpoint}?q=${encodeURIComponent(query)}`)

  if (!res.ok) {
    const errorMsg = await res.text()
    throw new Error(errorMsg || "Error al buscar claves")
  }

  return res.json()
}

export async function SearchInInventory(query: string, cendisId: number, type: ItemType): Promise<SearchResponse> {
  if (!query.trim()) {
    return { success: true, data: [], count: 0 }
  }

  const endpoint = type === "med" ? "/claves/inventory/searchMed" : "/claves/inventory/searchMat"
  const res = await fetch(`${API_URL}${endpoint}?q=${encodeURIComponent(query)}&cendis=${cendisId}`)

  if (!res.ok) {
    const errorMsg = await res.text()
    throw new Error(errorMsg || "Error al buscar en inventario")
  }

  return res.json()
}