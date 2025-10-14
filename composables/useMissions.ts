import { ref } from 'vue'

// Types
interface Mission {
  id?: number
  documentId?: string
  title?: string
  name?: string
  description?: string
  status?: string
  createdAt?: string
}

// Configuration Strapi
const STRAPI_URL = 'http://localhost:1337'
const API_TOKEN = '' // Laisser vide pour l'instant - modifier selon vos besoins

export const useMissions = () => {
  // États réactifs
  const missions = ref<Mission[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Fonction pour récupérer toutes les missions
  const fetchMissions = async () => {
    try {
      loading.value = true
      error.value = null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/missions`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()

      // Traiter les données selon le format Strapi v5
      missions.value = data.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        ...item.attributes
      }))

      console.log('✅ Missions récupérées:', missions.value)

    } catch (err) {
      console.error('❌ Erreur lors de la récupération des missions:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    // États
    missions,
    loading,
    error,

    // Fonctions
    fetchMissions
  }
}