import { useEffect, useState } from "react"
import { SearchInInventory } from "../services/claves_service"
import type { ClaveEntity } from "../entities/clave_entity"

export function useSearchInInventory(query: string, cendisId: number) {
  const [results, setResults] = useState<ClaveEntity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim().length < 2 || !cendisId) {
      setResults([])
      return
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await SearchInInventory(query, cendisId)
        if (response.success && response.data) {
          setResults(response.data)
        } else {
          setResults([])
          setError(response.message || "Sin resultados")
        }
      } catch (err) {
        setError((err as Error).message)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(delay)
  }, [query, cendisId])

  return { results, loading, error }
}