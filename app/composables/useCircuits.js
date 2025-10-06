/**
 * Composable pour la gestion des circuits avec Strapi
 * Récupère les données dynamiques depuis la base de données
 */
import { ref, computed, readonly } from 'vue'

export const useCircuits = () => {
  // États réactifs
  const circuits = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Configuration runtime
  const config = useRuntimeConfig()
  const strapiBaseUrl = config.public.strapi?.url || 'http://localhost:1337/api'

  // Computed properties pour les statistiques
  const totalCircuits = computed(() => circuits.value.length)
  const activeCircuits = computed(() => 
    circuits.value.filter(circuit => circuit.published === true || circuit.actif === true).length
  )
  const newCircuitsSuggested = computed(() => {
    // Calculer les nouveaux circuits des 7 derniers jours
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    return circuits.value.filter(circuit => {
      if (!circuit.createdAt) return false
      const circuitDate = new Date(circuit.createdAt)
      return circuitDate >= sevenDaysAgo
    }).length
  })

  /**
   * Récupérer tous les circuits depuis Strapi
   */
  const fetchCircuits = async () => {
    loading.value = true
    error.value = null

    try {
      // Import dynamique pour éviter les erreurs SSR
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('Tentative de récupération des circuits depuis:', 'http://localhost:1337/content-manager/collection-types/api::circuit.circuit')
      
      // Récupérer les circuits via la route Content Manager de Strapi
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::circuit.circuit?page=1&pageSize=100&sort=createdAt:DESC')
      
      console.log('Réponse Strapi Content Manager circuits:', response)
      
      // Traiter la réponse selon le format du Content Manager API
      let circuitData = response
      if (response.results) circuitData = response.results // Format Content Manager API
      if (response.data) circuitData = response.data
      
      if (Array.isArray(circuitData)) {
        circuits.value = circuitData
      } else {
        console.warn('Format de réponse inattendu:', response)
        circuits.value = []
      }
      
      console.log(`✅ ${circuits.value.length} circuits récupérés depuis Strapi Content Manager API`)
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des circuits:', err)
      error.value = `Erreur de connexion à Strapi: ${err.message}`
      
      // Message d'aide pour le développement
      if (err.message.includes('ERR_CONNECTION_REFUSED')) {
        error.value = 'Impossible de se connecter à Strapi. Vérifiez que Strapi est démarré sur localhost:1337'
      } else if (err.message.includes('404')) {
        error.value = 'Route circuits non trouvée. Vérifiez la configuration de Strapi'
      } else if (err.message.includes('403')) {
        error.value = 'Accès refusé. Vous devez être connecté en tant qu\'administrateur Strapi'
      } else if (err.message.includes('401')) {
        error.value = 'Token d\'authentification manquant ou expiré. Reconnectez-vous à l\'administration'
      }
      
      // Pas de données de fallback - on veut voir l'erreur en développement
      circuits.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un circuit par son ID
   */
  const fetchCircuitById = async (circuitId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      const response = await strapiAdminApi.get(`/content-manager/collection-types/api::circuit.circuit/${circuitId}`)
      
      return response.data || response
    } catch (err) {
      console.error(`Erreur lors de la récupération du circuit ${circuitId}:`, err)
      throw new Error(`Impossible de récupérer le circuit: ${err.message}`)
    }
  }

  /**
   * Créer un nouveau circuit
   */
  const createCircuit = async (circuitData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/api::circuit.circuit', circuitData)
      
      // Ajouter à la liste locale
      const newCircuit = response.data || response
      circuits.value.unshift(newCircuit) // Ajouter au début de la liste
      
      console.log('✅ Nouveau circuit créé avec succès')
      return newCircuit
      
    } catch (err) {
      console.error('❌ Erreur lors de la création du circuit:', err)
      error.value = `Impossible de créer le circuit: ${err.message}`
      throw err
    }
  }

  /**
   * Mettre à jour un circuit
   */
  const updateCircuit = async (circuitId, circuitData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::circuit.circuit/${circuitId}`, circuitData)
      
      // Mettre à jour dans la liste locale
      const index = circuits.value.findIndex(circuit => circuit.id === circuitId)
      if (index !== -1) {
        circuits.value[index] = response.data || response
      }
      
      console.log(`✅ Circuit ${circuitId} mis à jour avec succès`)
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la mise à jour du circuit ${circuitId}:`, err)
      error.value = `Impossible de mettre à jour le circuit: ${err.message}`
      throw err
    }
  }

  /**
   * Supprimer un circuit
   */
  const deleteCircuit = async (circuitId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      await strapiAdminApi.delete(`/content-manager/collection-types/api::circuit.circuit/${circuitId}`)
      
      // Mettre à jour la liste locale
      circuits.value = circuits.value.filter(circuit => circuit.id !== circuitId)
      
      console.log(`\u2705 Circuit ${circuitId} supprimé avec succès`)
      error.value = null
      return true
      
    } catch (err) {
      console.error(`\u274c Erreur lors de la suppression du circuit ${circuitId}:`, err)
      
      // Gestion détaillée des erreurs
      if (err.response?.status === 401) {
        error.value = "Erreur d'authentification : Veuillez vous reconnecter \u00e0 l'admin Strapi"
      } else if (err.response?.status === 404) {
        error.value = `Circuit ${circuitId} non trouvé ou déjà supprimé`
      } else if (err.response?.status === 403) {
        error.value = "Accès refusé : Permissions insuffisantes pour supprimer ce circuit"
      } else {
        error.value = `Impossible de supprimer le circuit: ${err.message}`
      }
      
      return false
    }
  }

  /**
   * Chercher des circuits
   */
  const searchCircuits = async (query) => {
    loading.value = true
    error.value = null
    
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // Utiliser les filtres Strapi pour la recherche sur le nom
      const response = await strapiAdminApi.get(`/content-manager/collection-types/api::circuit.circuit?filters[name][$containsi]=${query}`)
      
      return response.data || response || []
    } catch (err) {
      error.value = `Erreur lors de la recherche: ${err.message}`
      console.error('❌ Erreur searchCircuits:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Teste la connexion avec Strapi
   */
  const testConnection = async () => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('🔗 Test de connexion à:', 'http://localhost:1337/content-manager/collection-types/api::circuit.circuit')
      
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::circuit.circuit?page=1&pageSize=1')
      
      console.log('✅ Test de connexion Strapi circuits réussi:', response)
      return true
      
    } catch (err) {
      console.error('❌ Test de connexion Strapi circuits échoué:', err)
      return false
    }
  }

  /**
   * Publier/Dépublier un circuit
   */
  const toggleCircuitStatus = async (circuitId, published) => {
    try {
      const updatedCircuit = await updateCircuit(circuitId, { published })
      console.log(`✅ Circuit ${published ? 'publié' : 'dépublié'} avec succès`)
      return updatedCircuit
    } catch (err) {
      console.error('❌ Erreur lors du changement de statut:', err)
      throw err
    }
  }

  // Méthodes utilitaires pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return 'N/A'
    }
  }

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`
    }
    return `${mins}min`
  }

  const getCircuitAddress = (circuit) => {
    if (!circuit.address) return 'N/A'
    
    const parts = []
    if (circuit.address.street) parts.push(circuit.address.street)
    if (circuit.address.city) parts.push(circuit.address.city)
    if (circuit.address.zipCode) parts.push(circuit.address.zipCode)
    
    return parts.length > 0 ? parts.join(', ') : 'N/A'
  }

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    circuits: readonly(circuits),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed properties
    totalCircuits,
    activeCircuits,
    newCircuitsSuggested,
    
    // Actions
    fetchCircuits,
    fetchCircuitById,
    createCircuit,
    updateCircuit,
    deleteCircuit,
    searchCircuits,
    testConnection,
    toggleCircuitStatus,
    
    // Utilitaires
    formatDate,
    formatDuration,
    getCircuitAddress
  }
}

// Export par défaut pour compatibilité
export default useCircuits