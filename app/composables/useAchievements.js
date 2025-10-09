/**
 * Composable pour la gestion des achievements/succès avec Strapi
 * Récupère les données dynamiques depuis la base de données
 */
import { ref, computed, readonly } from 'vue'

export const useAchievements = () => {
  // États réactifs
  const achievements = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Configuration runtime
  const config = useRuntimeConfig()
  const strapiBaseUrl = config.public.strapi?.url || 'http://localhost:1337/api'

  /**
   * Mapper les données Strapi vers le format de l'application
   * Gère le champ publishedAt pour le statut draft/published
   */
  const mapAchievementData = (item) => {
    console.log('🔍 Mapping achievement:', item)
    console.log('🔍 Champs disponibles:', Object.keys(item))
    console.log('🔍 publishedAt value:', item.publishedAt)
    
    return {
      id: item.id || item.documentId,
      name: item.name || '',
      experience: parseInt(item.experience || 0),
      xpReward: parseInt(item.experience || 0), // Alias pour compatibilité
      // Le statut actif est basé sur publishedAt (draftAndPublish de Strapi)
      active: item.publishedAt !== null && item.publishedAt !== undefined,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }

  // Computed properties pour les statistiques
  const totalAchievements = computed(() => achievements.value.length)
  
  const activeAchievements = computed(() => 
    achievements.value.filter(a => a.active).length
  )
  
  const draftAchievements = computed(() => 
    achievements.value.filter(a => !a.active).length
  )
  
  // Calcul du XP total seulement pour les succès débloqués (publiés/actifs)
  const totalXP = computed(() => 
    achievements.value
      .filter(a => a.active) // Seulement les succès publiés/débloqués
      .reduce((sum, a) => sum + (a.experience || a.xpReward || 0), 0)
  )

  /**
   * Récupérer tous les achievements depuis Strapi
   */
  const fetchAchievements = async () => {
    loading.value = true
    error.value = null

    try {
      // Import dynamique pour éviter les erreurs SSR
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('🔍 Tentative de récupération des achievements depuis Strapi Content Manager API')
      
      // Récupérer les achievements via la route Content Manager de Strapi
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::achievement.achievement?page=1&pageSize=100&sort=createdAt:DESC')
      
      console.log('🔍 Réponse Strapi Content Manager achievements:', response)
      console.log('🔍 Structure de la réponse Strapi:', JSON.stringify(response, null, 2))
      
      // Traiter la réponse selon le format du Content Manager API
      let achievementData = response
      if (response.results) achievementData = response.results // Format Content Manager API
      if (response.data) achievementData = response.data
      
      if (Array.isArray(achievementData)) {
        console.log('🔍 Premier achievement brut:', achievementData[0])
        console.log('🔍 Champs disponibles dans le premier achievement:', achievementData[0] ? Object.keys(achievementData[0]) : [])
        
        achievements.value = achievementData.map(mapAchievementData)
        
        console.log('🔍 Premier achievement après mapping:', achievements.value[0])
      } else {
        console.warn('⚠️ Format de réponse inattendu:', response)
        achievements.value = []
      }
      
      console.log(`✅ ${achievements.value.length} achievements récupérés depuis Strapi`)
      console.log('✅ Achievements actifs (publiés):', activeAchievements.value)
      console.log('✅ Achievements en brouillon:', draftAchievements.value)
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des achievements:', err)
      error.value = `Erreur de connexion à Strapi: ${err.message}`
      
      // Message d'aide pour le développement
      if (err.message.includes('ERR_CONNECTION_REFUSED')) {
        error.value = 'Impossible de se connecter à Strapi. Vérifiez que Strapi est démarré sur localhost:1337'
      } else if (err.message.includes('404')) {
        error.value = 'Route achievements non trouvée. Vérifiez la configuration de Strapi'
      } else if (err.message.includes('403')) {
        error.value = 'Accès refusé. Vous devez être connecté en tant qu\'administrateur Strapi'
      } else if (err.message.includes('401')) {
        error.value = 'Token d\'authentification manquant ou expiré. Reconnectez-vous à l\'administration'
      }
      
      achievements.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un achievement par son ID
   */
  const fetchAchievementById = async (achievementId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      const response = await strapiAdminApi.get(`/content-manager/collection-types/api::achievement.achievement/${achievementId}`)
      
      return mapAchievementData(response.data || response)
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'achievement ${achievementId}:`, err)
      throw new Error(`Impossible de récupérer l'achievement: ${err.message}`)
    }
  }

  /**
   * Créer un nouveau achievement
   */
  const createAchievement = async (achievementData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/api::achievement.achievement', achievementData)
      
      // Ajouter à la liste locale
      const newAchievement = mapAchievementData(response.data || response)
      achievements.value.unshift(newAchievement)
      
      console.log('✅ Nouveau achievement créé avec succès')
      return newAchievement
      
    } catch (err) {
      console.error('❌ Erreur lors de la création de l\'achievement:', err)
      error.value = `Impossible de créer l'achievement: ${err.message}`
      throw err
    }
  }

  /**
   * Mettre à jour un achievement
   */
  const updateAchievement = async (achievementId, achievementData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::achievement.achievement/${achievementId}`, achievementData)
      
      // Mettre à jour dans la liste locale
      const updatedAchievement = mapAchievementData(response.data || response)
      const index = achievements.value.findIndex(a => a.id === achievementId)
      if (index !== -1) {
        achievements.value[index] = updatedAchievement
      }
      
      console.log(`✅ Achievement ${achievementId} mis à jour avec succès`)
      return updatedAchievement
      
    } catch (err) {
      console.error(`❌ Erreur lors de la mise à jour de l'achievement ${achievementId}:`, err)
      error.value = `Impossible de mettre à jour l'achievement: ${err.message}`
      throw err
    }
  }

  /**
   * Supprimer un achievement
   */
  const deleteAchievement = async (achievementId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      await strapiAdminApi.delete(`/content-manager/collection-types/api::achievement.achievement/${achievementId}`)
      
      // Mettre à jour la liste locale
      achievements.value = achievements.value.filter(a => a.id !== achievementId)
      
      console.log(`✅ Achievement ${achievementId} supprimé avec succès`)
      error.value = null
      return true
      
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression de l'achievement ${achievementId}:`, err)
      
      if (err.response?.status === 401) {
        error.value = "Erreur d'authentification : Veuillez vous reconnecter à l'admin Strapi"
      } else if (err.response?.status === 404) {
        error.value = `Achievement ${achievementId} non trouvé ou déjà supprimé`
      } else if (err.response?.status === 403) {
        error.value = "Accès refusé : Permissions insuffisantes pour supprimer cet achievement"
      } else {
        error.value = `Impossible de supprimer l'achievement: ${err.message}`
      }
      
      return false
    }
  }

  /**
   * Publier un achievement (set publishedAt to current date)
   */
  const publishAchievement = async (achievementId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.post(`/content-manager/collection-types/api::achievement.achievement/${achievementId}/actions/publish`)
      
      // Mettre à jour dans la liste locale
      const updatedAchievement = mapAchievementData(response.data || response)
      const index = achievements.value.findIndex(a => a.id === achievementId)
      if (index !== -1) {
        achievements.value[index] = updatedAchievement
      }
      
      console.log(`✅ Achievement ${achievementId} publié avec succès`)
      return updatedAchievement
      
    } catch (err) {
      console.error(`❌ Erreur lors de la publication de l'achievement:`, err)
      throw err
    }
  }

  /**
   * Dépublier un achievement (set publishedAt to null)
   */
  const unpublishAchievement = async (achievementId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.post(`/content-manager/collection-types/api::achievement.achievement/${achievementId}/actions/unpublish`)
      
      // Mettre à jour dans la liste locale
      const updatedAchievement = mapAchievementData(response.data || response)
      const index = achievements.value.findIndex(a => a.id === achievementId)
      if (index !== -1) {
        achievements.value[index] = updatedAchievement
      }
      
      console.log(`✅ Achievement ${achievementId} dépublié avec succès`)
      return updatedAchievement
      
    } catch (err) {
      console.error(`❌ Erreur lors de la dépublication de l'achievement:`, err)
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

  const formatNumber = (num) => {
    if (num === 0 || num === null || num === undefined) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    achievements: readonly(achievements),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed properties
    totalAchievements,
    activeAchievements,
    draftAchievements,
    totalXP,
    
    // Actions
    fetchAchievements,
    fetchAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    publishAchievement,
    unpublishAchievement,
    
    // Utilitaires
    formatDate,
    formatNumber
  }
}

// Export par défaut pour compatibilité
export default useAchievements
