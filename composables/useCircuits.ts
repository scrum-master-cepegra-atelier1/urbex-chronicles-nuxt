import { ref, computed } from 'vue'

// Configuration Strapi
const STRAPI_URL = 'http://localhost:1337'
const API_TOKEN = '' // Laisser vide pour l'instant - modifier selon vos besoins

// Types
interface Circuit {
  id: number
  documentId: string
  name: string
  description?: string
  duration?: number
  address?: {
    street?: string
    city?: string
    zipCode?: string
    country?: string
  }
  missions?: any[]
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export const useCircuits = () => {
  // États réactifs
  const circuits = ref<Circuit[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Statistiques calculées
  const totalCircuits = computed(() => circuits.value.length)
  const activeCircuits = computed(() =>
    circuits.value.filter(circuit => circuit.publishedAt).length
  )
  const newCircuitsSuggested = computed(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return circuits.value.filter(circuit =>
      new Date(circuit.createdAt) > sevenDaysAgo
    ).length
  })

  // Fonction pour récupérer tous les circuits avec leurs missions peuplées
  const fetchCircuits = async () => {
    try {
      loading.value = true
      error.value = null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/circuits?populate=*`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()

      // Traiter les données selon le format Strapi v5
      circuits.value = data.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        ...item.attributes,
        // S'assurer que les missions sont correctement formatées
        missions: item.attributes.missions?.data?.map((mission: any) => ({
          id: mission.id,
          documentId: mission.documentId,
          ...mission.attributes
        })) || []
      }))

      console.log('✅ Circuits récupérés avec missions:', circuits.value)

    } catch (err) {
      console.error('❌ Erreur lors de la récupération des circuits:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  // Fonction pour créer un circuit
  const createCircuit = async (circuitData: any) => {
    try {
      loading.value = true
      error.value = null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/circuits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data: circuitData
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Circuit créé:', result)

      // Recharger la liste après création
      await fetchCircuits()

      return result.data

    } catch (err) {
      console.error('❌ Erreur lors de la création du circuit:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fonction pour mettre à jour un circuit
  const updateCircuit = async (documentId: string, updateData: any) => {
    try {
      loading.value = true
      error.value = null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/circuits/${documentId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          data: updateData
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Circuit mis à jour:', result)

      // Recharger la liste après mise à jour
      await fetchCircuits()

      return result.data

    } catch (err) {
      console.error('❌ Erreur lors de la mise à jour du circuit:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fonction pour supprimer un circuit
  const deleteCircuit = async (documentId: string) => {
    try {
      loading.value = true
      error.value = null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/circuits/${documentId}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      console.log('✅ Circuit supprimé')

      // Recharger la liste après suppression
      await fetchCircuits()

      return true

    } catch (err) {
      console.error('❌ Erreur lors de la suppression du circuit:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      return false
    } finally {
      loading.value = false
    }
  }

  // Fonction pour changer le statut de publication d'un circuit
  const toggleCircuitStatus = async (documentId: string, published: boolean) => {
    try {
      const updateData = {
        publishedAt: published ? new Date().toISOString() : null
      }

      await updateCircuit(documentId, updateData)
      return true

    } catch (err) {
      console.error('❌ Erreur lors du changement de statut:', err)
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      return false
    }
  }

  // Fonctions utilitaires
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const formatDuration = (duration: number | undefined) => {
    if (!duration) return 'N/A'
    return `${duration} min`
  }

  const getCircuitAddress = (circuit: Circuit) => {
    if (!circuit.address) return 'Adresse non spécifiée'
    const { street, city, zipCode, country } = circuit.address
    return [street, city, zipCode, country].filter(Boolean).join(', ')
  }

  // Fonction de test de connexion
  const testConnection = async () => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
      }

      const response = await fetch(`${STRAPI_URL}/api/circuits?pagination[limit]=1`, {
        method: 'GET',
        headers
      })

      return response.ok
    } catch (err) {
      console.error('❌ Erreur de connexion à Strapi:', err)
      return false
    }
  }

  return {
    // États
    circuits,
    loading,
    error,
    totalCircuits,
    activeCircuits,
    newCircuitsSuggested,

    // Fonctions
    fetchCircuits,
    createCircuit,
    updateCircuit,
    deleteCircuit,
    toggleCircuitStatus,
    formatDate,
    formatDuration,
    getCircuitAddress,
    testConnection
  }
}