/**
 * Composable pour gérer les achievements (succès) avec Strapi
 */

import { ref, computed } from 'vue'
import { strapiAdminApi } from '../service/ApiService.js'

export const useAchievements = () => {
  // État réactif
  const achievements = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fonctions utilitaires pour mapper les données selon le schéma Strapi exact
  const mapFromStrapi = (achievement) => {
    const isPublished = achievement.status === 'published'
    
    return {
      id: achievement.id,
      documentId: achievement.documentId,
      // Champs du schéma Strapi exact
      name: achievement.name || 'Sans titre',
      experience: parseInt(achievement.experience) || 0,
      // Champs UI dérivés pour compatibilité avec l'interface
      title: achievement.name || 'Sans titre', // UI compatibility
      xpReward: parseInt(achievement.experience) || 0, // UI compatibility
      description: `Succès: ${achievement.name}`, // Description générée
      icon: '🏆', // Icône par défaut
      type: 'achievement', // Type par défaut
      rarity: 'common', // Rareté par défaut
      active: isPublished, // Basé sur le champ status au lieu de publishedAt
      conditions: `Obtenir ${achievement.experience} points d'expérience`, // Conditions générées
      unlocks: 0, // Simulation
      createdAt: achievement.createdAt,
      updatedAt: achievement.updatedAt,
      publishedAt: achievement.publishedAt,
      status: achievement.status // Ajout du champ status
    }
  }

  const mapToStrapi = (uiData) => ({
    // Seulement les champs qui existent dans le schéma Strapi
    name: uiData.title || uiData.name || 'Sans titre',
    experience: parseInt(uiData.xpReward || uiData.experience || 0)
  })

  // Stats calculées
  const stats = computed(() => {
    const total = achievements.value.length
    const active = achievements.value.filter(a => a.active).length
    const todayUnlocked = Math.floor(Math.random() * 20) + 5 // Simulation
    // Calcul du XP total seulement pour les succès débloqués (publiés/actifs)
    const totalXP = achievements.value
      .filter(a => a.active) // Seulement les succès publiés/débloqués
      .reduce((sum, a) => sum + (a.experience || a.xpReward || 0), 0)
    
    // Calcul du total d'XP distribué (XP * nombre de débloquages)
    const totalXPDistributed = achievements.value
      .filter(a => a.active) // Seulement les succès publiés/débloqués
      .reduce((sum, a) => {
        const xp = a.experience || a.xpReward || 0
        const unlocks = a.unlocks || 0
        return sum + (xp * unlocks)
      }, 0)

    return {
      total,
      active,
      todayUnlocked,
      totalXP,
      totalXPDistributed
    }
  })

  /**
   * Récupérer tous les achievements depuis Strapi
   */
  const fetchAchievements = async () => {
    try {
      loading.value = true
      error.value = null
      
      console.log('🏆 Récupération des achievements depuis Strapi...')
      
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::achievement.achievement?page=1&pageSize=100')
      
      if (response && response.results) {
        console.log(`✅ ${response.results.length} achievements récupérés avec succès`)
        
        achievements.value = response.results.map(mapFromStrapi)
      } else {
        console.warn('⚠️ Structure de réponse inattendue:', response)
        achievements.value = []
      }
      
      error.value = null
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des achievements:', err)
      error.value = `Erreur de connexion à Strapi: ${err.message}`
      
      // Message d'aide pour le développement
      if (err.message.includes('ERR_CONNECTION_REFUSED')) {
        error.value += ' - Vérifiez que Strapi est démarré sur le port 1337'
      }
      
      achievements.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un achievement spécifique par ID
   */
  const getAchievementById = async (achievementId) => {
    try {
      const response = await strapiAdminApi.get(`/content-manager/collection-types/api::achievement.achievement/${achievementId}`)
      return response
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'achievement ${achievementId}:`, err)
      throw err
    }
  }

  /**
   * Créer un nouvel achievement
   */
  const createAchievement = async (achievementData) => {
    try {
      loading.value = true
      
      // Mapper les données UI vers Strapi
      const strapiData = mapToStrapi(achievementData)
      console.log('📤 Données envoyées à Strapi:', strapiData)
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/api::achievement.achievement', strapiData)
      
      if (response) {
        // Ajouter le nouvel achievement à la liste en utilisant les données de réponse
        const newAchievement = mapFromStrapi({
          ...response,
          status: 'draft', // Par défaut, les nouveaux achievements sont en draft
          unlocks: 0
        })
        achievements.value.unshift(newAchievement)
        console.log('✅ Nouvel achievement créé avec succès')
        return response
      }
      
    } catch (err) {
      console.error('❌ Erreur lors de la création de l\'achievement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Mettre à jour un achievement existant
   */
  const updateAchievement = async (documentId, achievementData) => {
    try {
      loading.value = true
      
      console.log(`🔄 Mise à jour de l'achievement avec documentId: ${documentId}`)
      
      // Mapper les données UI vers Strapi
      const strapiData = mapToStrapi(achievementData)
      console.log('📤 Données de mise à jour envoyées à Strapi:', strapiData)
      
      const response = await strapiAdminApi.put(`/content-manager/collection-types/api::achievement.achievement/${documentId}`, strapiData)
      
      if (response) {
        // Mettre à jour l'achievement dans la liste en utilisant documentId
        const index = achievements.value.findIndex(a => a.documentId === documentId)
        if (index !== -1) {
          achievements.value[index] = mapFromStrapi({
            ...response,
            status: response.status || 'draft', // Inclure le status dans la mise à jour
            unlocks: achievements.value[index].unlocks // Conserver les unlocks existants
          })
        }
        console.log(`✅ Achievement ${documentId} mis à jour avec succès`)
        return response
      }
      
    } catch (err) {
      console.error(`❌ Erreur lors de la mise à jour de l'achievement ${achievementId}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Supprimer un achievement
   */
  const deleteAchievement = async (documentId) => {
    try {
      loading.value = true
      
      console.log(`🗑️ Suppression de l'achievement avec documentId: ${documentId}`)
      
      const response = await strapiAdminApi.delete(`/content-manager/collection-types/api::achievement.achievement/${documentId}`)
      
      // Supprimer l'achievement de la liste en utilisant documentId
      achievements.value = achievements.value.filter(a => a.documentId !== documentId)
      
      console.log(`✅ Achievement ${documentId} supprimé avec succès`)
      return response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression de l'achievement ${documentId}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Changer le statut actif/inactif d'un achievement (publié/brouillon)
   */
  const toggleAchievementStatus = async (documentId, shouldPublish) => {
    try {
      console.log(`🔄 Toggle publish status: documentId=${documentId}, publier=${shouldPublish}`)
      
      let response
      if (shouldPublish) {
        // Publier l'achievement
        response = await strapiAdminApi.post(`/content-manager/collection-types/api::achievement.achievement/${documentId}/actions/publish`)
      } else {
        // Mettre en brouillon l'achievement
        response = await strapiAdminApi.post(`/content-manager/collection-types/api::achievement.achievement/${documentId}/actions/unpublish`)
      }
      
      // Mettre à jour la liste locale
      const index = achievements.value.findIndex(a => a.documentId === documentId)
      if (index !== -1) {
        achievements.value[index].active = shouldPublish
        achievements.value[index].status = shouldPublish ? 'published' : 'draft'
        achievements.value[index].publishedAt = shouldPublish ? new Date().toISOString() : null
      }
      
      console.log(`✅ Achievement ${shouldPublish ? 'publié' : 'mis en brouillon'} avec succès`)
      return response
    } catch (err) {
      console.error('❌ Erreur lors du changement de statut de publication:', err)
      throw err
    }
  }

  /**
   * Test de connexion à Strapi
   */
  const testConnection = async () => {
    try {
      const response = await strapiAdminApi.get('/content-manager/collection-types/api::achievement.achievement?page=1&pageSize=1')
      console.log('🔧 Test de connexion Strapi achievements:', response.status || 'OK')
      return true
    } catch (err) {
      console.error('🔧 Erreur de connexion Strapi achievements:', err)
      return false
    }
  }

  /**
   * Rechercher des achievements
   */
  const searchAchievements = async (searchTerm) => {
    try {
      if (!searchTerm) {
        await fetchAchievements()
        return
      }

      const filtered = achievements.value.filter(achievement => 
        achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      achievements.value = filtered
    } catch (err) {
      console.error('❌ Erreur searchAchievements:', err)
      throw err
    }
  }

  // Retourner les fonctions et données réactives
  return {
    // État
    achievements,
    loading,
    error,
    stats,
    
    // Actions
    fetchAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    toggleAchievementStatus,
    searchAchievements,
    testConnection
  }
}