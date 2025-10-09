/**
 * Composable pour la gestion des missions avec Strapi
 * Gestion directe de la collection missions via l'API Admin Strapi
 */
import { ref, computed, readonly } from 'vue'

export default async function useMissions() {
  // Configuration Nuxt
  const config = useRuntimeConfig()
  const strapiBaseUrl = config.public.strapi?.url || 'http://localhost:1337/api'

  // États réactifs
  const missions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed properties pour les statistiques
  const totalMissions = computed(() => missions.value.length)
  const publishedMissions = computed(() => 
    missions.value.filter(mission => mission.published === true).length
  )
  const draftMissions = computed(() => 
    missions.value.filter(mission => mission.published === false).length
  )

  /**
   * Récupérer toutes les missions depuis Strapi
   */
  const fetchMissions = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('🔄 Récupération des missions depuis Strapi...')
      
      // Récupérer les missions directement depuis la collection mission
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::mission.mission?page=1&pageSize=100')
      
      if (response && response.results) {
        missions.value = response.results.map(mission => ({
          id: mission.id,
          documentId: mission.documentId,
          title: mission.title || mission.name || 'Mission sans titre',
          description: mission.description || '',
          latitude: mission.latitude || null,
          longitude: mission.longitude || null,
          address: mission.address || '',
          type: mission.type || 'exploration',
          difficulty: mission.difficulty || 'moyen',
          instructions: mission.instructions || '',
          published: mission.publishedAt != null,
          publishedAt: mission.publishedAt,
          createdAt: mission.createdAt,
          updatedAt: mission.updatedAt
        }))
        
        console.log(`✅ ${response.results.length} missions récupérées avec succès`)
        console.log('🔍 Structure d\'une mission:', response.results[0])
      } else {
        console.warn('⚠️ Structure de réponse inattendue:', response)
        missions.value = []
      }
      
      error.value = null
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des missions:', err)
      error.value = `Erreur de connexion à Strapi: ${err.message}`
      
      // Message d'aide pour le développement
      if (err.message.includes('ERR_CONNECTION_REFUSED')) {
        error.value = 'Impossible de se connecter à Strapi. Vérifiez que Strapi est démarré sur localhost:1337'
      } else if (err.message.includes('404')) {
        error.value = 'Route missions non trouvée. Vérifiez la configuration de Strapi'
      } else if (err.message.includes('403')) {
        error.value = 'Accès refusé. Vous devez être connecté en tant qu\'administrateur Strapi'
      } else if (err.message.includes('401')) {
        error.value = 'Token d\'authentification manquant ou expiré. Reconnectez-vous à l\'administration'
      }
      
      // Pas de données de fallback - on veut voir l'erreur en développement
      missions.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer une mission par son ID (documentId)
   */
  const fetchMissionById = async (missionId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      // Utiliser documentId pour les opérations individuelles
      const response = await strapiAdminApi.get(`/content-manager/collection-types/api::mission.mission/${missionId}`)
      
      return response.data || response
    } catch (err) {
      console.error(`Erreur lors de la récupération de la mission ${missionId}:`, err)
      throw new Error(`Impossible de récupérer la mission: ${err.message}`)
    }
  }

  /**
   * Créer une nouvelle mission
   */
  /**
   * Créer une nouvelle mission (en créant un nouveau circuit)
   */
  const createMission = async (missionData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('🔄 Création d\'un nouveau circuit avec mission...')
      
      // Créer un circuit avec la mission comme composant
      const circuitData = {
        name: missionData.title || 'Circuit sans nom',
        description: missionData.description || '',
        duration: 60, // Durée par défaut en minutes
        like: 0,
        Missions: [{
          title: missionData.title,
          description: missionData.description,
          latitude: missionData.latitude,
          longitude: missionData.longitude,
          type: missionData.type || 'exploration',
          difficulty: missionData.difficulty || 'moyen',
          instructions: missionData.instructions || ''
        }],
        address: missionData.address ? {
          street: missionData.address,
          latitude: missionData.latitude,
          longitude: missionData.longitude
        } : null
      }
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/api::circuit.circuit', circuitData)
      
      // Recharger toutes les missions pour refléter les changements
      await fetchMissions()
      
      console.log('✅ Nouveau circuit avec mission créé avec succès')
      return response
      
    } catch (err) {
      console.error('❌ Erreur lors de la création du circuit/mission:', err)
      error.value = `Impossible de créer la mission: ${err.message}`
      throw err
    }
  }

  /**
   * Mettre à jour une mission
   */
  const updateMission = async (missionId, missionData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // Utiliser documentId pour les opérations individuelles
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::mission.mission/${missionId}`, missionData)
      
      // Mettre à jour dans la liste locale en utilisant documentId
      const index = missions.value.findIndex(mission => mission.documentId === missionId || mission.id === missionId)
      if (index !== -1) {
        missions.value[index] = response.data || response
      }
      
      console.log(`✅ Mission ${missionId} mise à jour avec succès`)
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la mise à jour de la mission ${missionId}:`, err)
      error.value = `Impossible de mettre à jour la mission: ${err.message}`
      throw err
    }
  }

  /**
   * Supprimer une mission
   */
  const deleteMission = async (missionId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // Utiliser documentId pour les opérations individuelles  
      await strapiAdminApi.delete(`/content-manager/collection-types/api::mission.mission/${missionId}`)
      
      // Mettre à jour la liste locale en utilisant documentId ou id
      missions.value = missions.value.filter(mission => mission.documentId !== missionId && mission.id !== missionId)
      
      console.log(`✅ Mission ${missionId} supprimée avec succès`)
      error.value = null
      return true
      
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression de la mission ${missionId}:`, err)
      
      // Enhanced error handling for authentication and permission issues
      if (err.message.includes('401')) {
        throw new Error('Session expirée. Veuillez vous reconnecter.')
      } else if (err.message.includes('403')) {
        throw new Error('Permissions insuffisantes pour supprimer cette mission.')
      } else if (err.message.includes('404')) {
        throw new Error('Mission non trouvée.')
      } else {
        throw new Error('Erreur lors de la suppression de la mission. Veuillez réessayer.')
      }
    }
  }

  /**
   * Rechercher des missions par titre
   */
  const searchMissions = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return missions.value
    }
    
    return missions.value.filter(mission => 
      mission.title && mission.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  /**
   * Test de connexion à Strapi (à supprimer en production)
   */
  const testConnection = async () => {
    try {
      const response = await fetch(`${strapiBaseUrl}/missions`)
      console.log('🔧 Test de connexion Strapi:', response.status)
      return response.ok
    } catch (err) {
      console.error('🔧 Erreur de connexion Strapi:', err)
      return false
    }
  }

  /**
   * Publier/Dépublier une mission
   */
  const toggleMissionStatus = async (missionId, published) => {
    try {
      // Utiliser publishedAt au lieu de published (structure Strapi)
      const publishedAt = published ? new Date().toISOString() : null
      const updatedMission = await updateMission(missionId, { publishedAt })
      console.log(`✅ Mission ${published ? 'publiée' : 'dépubliée'} avec succès`)
      return updatedMission
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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Date invalide'
    }
  }

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return 'N/A'
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`
  }

  // Helper pour convertir publishedAt en boolean
  const isPublished = (mission) => {
    return mission?.publishedAt != null
  }

  // Helper pour ajouter une propriété published calculée
  const addPublishedProperty = (mission) => {
    return {
      ...mission,
      published: isPublished(mission)
    }
  }

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    missions: readonly(missions),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed properties
    totalMissions,
    publishedMissions,
    draftMissions,
    
    // Actions
    fetchMissions,
    fetchMissionById,
    createMission,
    updateMission,
    deleteMission,
    searchMissions,
    testConnection,
    toggleMissionStatus,
    
    // Utilitaires
    formatDate,
    formatCoordinates,
    isPublished,
    addPublishedProperty
  }
}