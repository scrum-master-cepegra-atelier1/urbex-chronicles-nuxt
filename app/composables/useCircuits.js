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
  const strapiBaseUrl = 'http://localhost:1337/api'

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
      
      console.log('🔄 Création d\'un nouveau circuit avec:', circuitData)
      
      // Valider les données selon le schéma Strapi réel
      const validCircuitData = {
        name: circuitData.name,
        description: circuitData.description || '',
        duration: circuitData.duration ? parseInt(circuitData.duration) : null,
        like: circuitData.like ? parseInt(circuitData.like) : 0,
        address: circuitData.address || null,
        Missions: circuitData.Missions || [],
        comments: circuitData.comments || []
      }
      
      // Supprimer les champs null/undefined
      Object.keys(validCircuitData).forEach(key => {
        if (validCircuitData[key] === null || validCircuitData[key] === undefined) {
          delete validCircuitData[key]
        }
      })
      
      console.log('📋 Données validées pour création:', validCircuitData)
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/api::circuit.circuit', validCircuitData)
      
      // Ajouter à la liste locale
      const newCircuit = response.data || response
      circuits.value.unshift(newCircuit) // Ajouter au début de la liste
      
      console.log('✅ Nouveau circuit créé avec succès:', newCircuit)
      error.value = null
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
      
      console.log(`🔄 Mise à jour circuit ${circuitId} avec:`, circuitData)
      
      // Valider les champs selon le schéma Strapi réel
      const validCircuitData = {
        name: circuitData.name,
        description: circuitData.description,
        duration: circuitData.duration ? parseInt(circuitData.duration) : null,
        like: circuitData.like ? parseInt(circuitData.like) : null,
        address: circuitData.address || null,
        Missions: circuitData.Missions || null,
        comments: circuitData.comments || null
      }
      
      // Supprimer les champs null/undefined
      Object.keys(validCircuitData).forEach(key => {
        if (validCircuitData[key] === null || validCircuitData[key] === undefined) {
          delete validCircuitData[key]
        }
      })
      
      console.log('📋 Données validées pour Strapi:', validCircuitData)
      
      // Utiliser le documentId pour Strapi v5
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::circuit.circuit/${circuitId}`, validCircuitData)
      
      console.log('✅ Réponse de mise à jour:', response)
      
      // Mettre à jour dans la liste locale
      const index = circuits.value.findIndex(circuit => 
        circuit.documentId === circuitId || circuit.id === circuitId
      )
      if (index !== -1) {
        // Fusionner les nouvelles données avec les anciennes
        circuits.value[index] = {
          ...circuits.value[index],
          ...(response.data || response),
          // S'assurer que les champs modifiés sont bien mis à jour
          ...validCircuitData
        }
        console.log(`✅ Circuit ${circuitId} mis à jour localement:`, circuits.value[index])
      } else {
        console.warn(`⚠️ Circuit ${circuitId} non trouvé dans la liste locale`)
      }
      
      error.value = null
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
      
      console.log(`🗑️ Suppression circuit ${circuitId}`)
      
      // Utiliser le documentId pour Strapi v5
      const response = await strapiAdminApi.delete(`/content-manager/collection-types/api::circuit.circuit/${circuitId}`)
      
      console.log('✅ Réponse de suppression:', response)
      
      // Supprimer de la liste locale en utilisant documentId ou id
      const index = circuits.value.findIndex(circuit => 
        circuit.documentId === circuitId || circuit.id === circuitId
      )
      if (index !== -1) {
        const deletedCircuit = circuits.value.splice(index, 1)[0]
        console.log(`✅ Circuit supprimé localement:`, deletedCircuit)
      } else {
        console.warn(`⚠️ Circuit ${circuitId} non trouvé dans la liste locale pour suppression`)
      }
      
      error.value = null
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression du circuit ${circuitId}:`, err)
      error.value = `Impossible de supprimer le circuit: ${err.message}`
      throw err
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

  // Méthodes utilitaires pour l'affichage selon le schéma Circuit
  const getCircuitStatus = (circuit) => {
    if (circuit.published) return 'Publié'
    return 'Brouillon'
  }

  const getCircuitDuration = (circuit) => {
    return circuit.duration ? parseInt(circuit.duration) : 0
  }

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
    getCircuitAddress,
    getCircuitStatus,
    getCircuitDuration
  }
}

// Export par défaut pour compatibilité
export default useCircuits