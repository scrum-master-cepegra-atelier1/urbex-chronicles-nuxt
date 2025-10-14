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
    missions.value.filter(mission => mission.status === 'published').length
  )
  
  const draftMissions = computed(() => 
    missions.value.filter(mission => mission.status === 'draft').length
  )
  
  const modifiedMissions = computed(() => 
    missions.value.filter(mission => mission.status === 'modified').length
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
      // Récupérer les missions directement depuis la collection mission (API admin)
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::mission.mission?page=1&pageSize=100')
      if (response && response.results) {
        console.log('🔍 DEBUG - Réponse Strapi brute (première mission):', response.results[0])
        console.log('🔍 DEBUG - publishedAt:', response.results[0]?.publishedAt)
        console.log('🔍 DEBUG - updatedAt:', response.results[0]?.updatedAt)
        console.log('🔍 DEBUG - publishedAt type:', typeof response.results[0]?.publishedAt)
        missions.value = response.results.map(mission => {
          const hasPublishedAt = mission.publishedAt != null && mission.publishedAt !== ''
          const publishedDate = hasPublishedAt ? new Date(mission.publishedAt) : null
          const updatedDate = mission.updatedAt ? new Date(mission.updatedAt) : null
          const timeDiffSeconds = publishedDate && updatedDate 
            ? (updatedDate.getTime() - publishedDate.getTime()) / 1000 
            : 0
          const isModified = timeDiffSeconds > 1
          console.log(`📋 Mission "${mission.title}":`, {
            publishedAt: mission.publishedAt,
            updatedAt: mission.updatedAt,
            hasPublishedAt,
            publishedDate: publishedDate?.toISOString(),
            updatedDate: updatedDate?.toISOString(),
            timeDiffSeconds: timeDiffSeconds.toFixed(2),
            isModified,
            calculatedStatus: !hasPublishedAt ? 'draft' : (isModified ? 'modified' : 'published')
          })
          return {
            // Identifiants
            id: mission.id,
            documentId: mission.documentId,
            // Champs requis du schema
            title: mission.title || mission.name || 'Mission sans titre',
            description: mission.description || '',
            latitude: mission.latitude || null,
            longitude: mission.longitude || null,
            threshold: mission.threshold || null,
            // Champs optionnels du schema
            hint: mission.hint || null,
            media: mission.media || null,
            achievement: mission.achievement || null,
            circuit: mission.circuit || null,
            // Champs legacy (pour compatibilité)
            address: mission.address || '',
            type: mission.type || 'exploration',
            difficulty: mission.difficulty || 'moyen',
            instructions: mission.instructions || '',
            // Métadonnées
            published: hasPublishedAt,
            publishedAt: mission.publishedAt,
            createdAt: mission.createdAt,
            updatedAt: mission.updatedAt,
            // Calculer le statut Strapi v5 avec tolérance d'1 seconde
            status: !hasPublishedAt ? 'draft' : (isModified ? 'modified' : 'published')
          }
        })
        console.log(`✅ ${missions.value.length} missions récupérées avec succès`)
        console.log('🔍 Structure d\'une mission:', missions.value[0])
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
          threshold: missionData.threshold,
          hint: missionData.hint || null,
          media: missionData.media || null,
          achievement: missionData.achievement || null,
          // Legacy fields
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
      console.log('🔍 useMissions - updateMission appelé avec:', {
        missionId,
        missionData,
        url: `/content-manager/collection-types/api::mission.mission/${missionId}`
      })
      
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // IMPORTANT : Strapi Content Manager API attend les données dans un objet { data: {...} }
      const payload = missionData
      
      console.log('📦 useMissions - Payload envoyé:', payload)
      
      // Utiliser documentId pour les opérations individuelles
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::mission.mission/${missionId}`, payload)
      
      console.log('📡 useMissions - Réponse de Strapi:', response)
      
      // Mettre à jour dans la liste locale en utilisant documentId
      const index = missions.value.findIndex(mission => mission.documentId === missionId || mission.id === missionId)
      console.log('🔎 useMissions - Index trouvé dans la liste locale:', index)
      
      if (index !== -1) {
        // Fusionner les nouvelles données avec l'objet existant pour garder tous les champs
        missions.value[index] = { ...missions.value[index], ...(response.data || response) }
        console.log('✅ useMissions - Mission mise à jour dans la liste locale:', missions.value[index])
      } else {
        console.warn('⚠️ useMissions - Mission non trouvée dans la liste locale')
      }
      
      console.log(`✅ Mission ${missionId} mise à jour avec succès`)
      return response.data || response
      
    } catch (err) {
      console.error(`❌ useMissions - Erreur lors de la mise à jour de la mission ${missionId}:`, {
        message: err.message,
        response: err.response,
        status: err.response?.status,
        data: err.response?.data
      })
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
   * Publier une mission (Strapi v5 Draft & Publish)
   */
  const publishMission = async (missionId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log(`📢 Publication de la mission ${missionId}...`)
      
      // Endpoint Strapi v5 pour publier
      const response = await strapiAdminApi.post(`/content-manager/collection-types/api::mission.mission/${missionId}/actions/publish`, {})
      
      console.log(`✅ Mission ${missionId} publiée avec succès`)
      
      // Mettre à jour dans la liste locale
      const index = missions.value.findIndex(mission => mission.documentId === missionId || mission.id === missionId)
      if (index !== -1) {
        missions.value[index].publishedAt = new Date().toISOString()
        missions.value[index].published = true
      }
      
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la publication de la mission ${missionId}:`, err)
      error.value = `Impossible de publier la mission: ${err.message}`
      throw err
    }
  }

  /**
   * Dépublier une mission (Strapi v5 Draft & Publish)
   */
  const unpublishMission = async (missionId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log(`📝 Dépublication de la mission ${missionId}...`)
      
      // Endpoint Strapi v5 pour dépublier
      const response = await strapiAdminApi.post(`/content-manager/collection-types/api::mission.mission/${missionId}/actions/unpublish`, {})
      
      console.log(`✅ Mission ${missionId} dépubliée avec succès`)
      
      // Mettre à jour dans la liste locale
      const index = missions.value.findIndex(mission => mission.documentId === missionId || mission.id === missionId)
      if (index !== -1) {
        missions.value[index].publishedAt = null
        missions.value[index].published = false
      }
      
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la dépublication de la mission ${missionId}:`, err)
      error.value = `Impossible de dépublier la mission: ${err.message}`
      throw err
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

  // Helper pour déterminer le statut Strapi v5 (draft, published, modified)
  const getMissionStatus = (mission) => {
    if (!mission.publishedAt) {
      return 'draft' // Brouillon
    }
    
    // Comparer les dates pour détecter les modifications
    const publishedDate = new Date(mission.publishedAt)
    const updatedDate = new Date(mission.updatedAt)
    
    // Si updatedAt > publishedAt, il y a des modifications non publiées
    if (updatedDate > publishedDate) {
      return 'modified' // Publié avec modifications
    }
    
    return 'published' // Publié
  }

  // Helper pour ajouter une propriété published calculée
  const addPublishedProperty = (mission) => {
    return {
      ...mission,
      published: isPublished(mission),
      status: getMissionStatus(mission)
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
    modifiedMissions,
    
    // Actions
    fetchMissions,
    fetchMissionById,
    createMission,
    updateMission,
    deleteMission,
    publishMission,
    unpublishMission,
    searchMissions,
    testConnection,
    toggleMissionStatus,
    
    // Utilitaires
    formatDate,
    formatCoordinates,
    isPublished,
    getMissionStatus,
    addPublishedProperty
  }
}