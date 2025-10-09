/**
 * Composable pour la gestion des utilisateurs avec Strapi
 * Récupère les données dynamiques depuis la base de données
 */
import { ref, computed, readonly } from 'vue'

export const useUsers = () => {
  // États réactifs
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Configuration runtime
  const config = useRuntimeConfig()
  const strapiBaseUrl = config.public.strapi?.url || 'http://localhost:1337/api'

  // Computed properties pour les statistiques
  const totalUsers = computed(() => users.value.length)
  const newUsers = computed(() => {
    // Calculer les nouveaux utilisateurs des 30 derniers jours
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return users.value.filter(user => {
      if (!user.createdAt) return false
      const userDate = new Date(user.createdAt)
      return userDate >= thirtyDaysAgo
    }).length
  })

  /**
   * Récupérer tous les utilisateurs depuis Strapi
   */
  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      // Import dynamique pour éviter les erreurs SSR
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log('Tentative de récupération des utilisateurs depuis:', 'http://localhost:1337/content-manager/collection-types/plugin::users-permissions.user')
      
      // Récupérer les utilisateurs via la vraie route Content Manager de Strapi
      const response = await strapiAdminApi.get('/content-manager/collection-types/plugin::users-permissions.user?page=1&pageSize=100&sort=username:ASC')
      
      console.log('Réponse Strapi Content Manager users:', response)
      
      // Traiter la réponse selon le format du Content Manager API
      let userData = response
      if (response.results) userData = response.results // Format Content Manager API
      if (response.data) userData = response.data
      
      if (Array.isArray(userData)) {
        users.value = userData
      } else {
        console.warn('Format de réponse inattendu:', response)
        users.value = []
      }
      
      console.log(`✅ ${users.value.length} utilisateurs récupérés depuis Strapi Content Manager API`)
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des utilisateurs:', err)
      error.value = `Erreur de connexion à Strapi: ${err.message}`
      
      // Message d'aide pour le développement
      if (err.message.includes('ERR_CONNECTION_REFUSED')) {
        error.value = 'Impossible de se connecter à Strapi. Vérifiez que Strapi est démarré sur localhost:1337'
      } else if (err.message.includes('404')) {
        error.value = 'Route Content Manager non trouvée. Vérifiez la configuration de Strapi'
      } else if (err.message.includes('403')) {
        error.value = 'Accès refusé. Vous devez être connecté en tant qu\'administrateur Strapi'
      } else if (err.message.includes('401')) {
        error.value = 'Token d\'authentification manquant ou expiré. Reconnectez-vous à l\'administration'
      }
      
      // Pas de données de fallback - on veut voir l'erreur en développement
      users.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un utilisateur par son ID
   */
  const fetchUserById = async (userId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      const response = await strapiAdminApi.get(`/content-manager/collection-types/plugin::users-permissions.user/${userId}`)
      
      return response.data || response
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${userId}:`, err)
      throw new Error(`Impossible de récupérer l'utilisateur: ${err.message}`)
    }
  }

  /**
   * Supprimer un utilisateur
   */
  const deleteUser = async (userId) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // Utiliser documentId pour Strapi v5
      await strapiAdminApi.delete(`/content-manager/collection-types/plugin::users-permissions.user/${userId}`)
      
      // Mettre à jour la liste locale
      users.value = users.value.filter(user => 
        user.documentId !== userId && user.id !== userId
      )
      
      console.log(`✅ Utilisateur ${userId} supprimé avec succès`)
      error.value = null
      return true
      
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression de l'utilisateur ${userId}:`, err)
      
      // Gestion détaillée des erreurs
      if (err.response?.status === 401) {
        error.value = "Erreur d'authentification : Veuillez vous reconnecter à l'admin Strapi"
      } else if (err.response?.status === 404) {
        error.value = `Utilisateur ${userId} non trouvé ou déjà supprimé`
      } else if (err.response?.status === 403) {
        error.value = "Accès refusé : Permissions insuffisantes pour supprimer cet utilisateur"
      } else {
        error.value = `Impossible de supprimer l'utilisateur: ${err.message}`
      }
      
      return false
    }
  }  /**
   * Mettre à jour un utilisateur
   */
  const updateUser = async (userId, userData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      console.log(`🔄 Mise à jour utilisateur ${userId} avec:`, userData)
      
      // Valider les champs selon le schéma Strapi
      const validUserData = {
        username: userData.username,
        email: userData.email,
        experience: userData.experience ? parseInt(userData.experience) : null,
        confirmed: userData.confirmed !== undefined ? userData.confirmed : true,
        blocked: userData.blocked !== undefined ? userData.blocked : false
      }
      
      // Supprimer les champs null/undefined
      Object.keys(validUserData).forEach(key => {
        if (validUserData[key] === null || validUserData[key] === undefined) {
          delete validUserData[key]
        }
      })
      
      console.log('📋 Données validées pour Strapi:', validUserData)
      
      // Utiliser documentId pour Strapi v5
      const response = await strapiAdminApi.put(`/content-manager/collection-types/plugin::users-permissions.user/${userId}`, validUserData)
      
      console.log('✅ Réponse de mise à jour:', response)
      
      // Mettre à jour dans la liste locale
      const index = users.value.findIndex(user => 
        user.documentId === userId || user.id === userId
      )
      if (index !== -1) {
        // Fusionner les nouvelles données avec les anciennes
        users.value[index] = {
          ...users.value[index],
          ...(response.data || response),
          // S'assurer que les champs modifiés sont bien mis à jour
          ...validUserData
        }
        console.log(`✅ Utilisateur ${userId} mis à jour localement:`, users.value[index])
      } else {
        console.warn(`⚠️ Utilisateur ${userId} non trouvé dans la liste locale`)
      }
      
      error.value = null
      return response.data || response
      
    } catch (err) {
      console.error(`❌ Erreur lors de la mise à jour de l'utilisateur ${userId}:`, err)
      error.value = `Impossible de mettre à jour l'utilisateur: ${err.message}`
      throw err
    }
  }

  /**
   * Créer un nouvel utilisateur
   */
  const createUser = async (userData) => {
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      const response = await strapiAdminApi.post('/content-manager/collection-types/plugin::users-permissions.user', userData)
      
      // Ajouter à la liste locale
      const newUser = response.data || response
      users.value.push(newUser)
      
      console.log('✅ Nouvel utilisateur créé avec succès')
      return newUser
      
    } catch (err) {
      console.error('❌ Erreur lors de la création de l\'utilisateur:', err)
      error.value = `Impossible de créer l'utilisateur: ${err.message}`
      throw err
    }
  }

  /**
   * Chercher des utilisateurs
   */
  const searchUsers = async (query) => {
    loading.value = true
    error.value = null
    
    try {
      const { strapiAdminApi } = await import('../service/ApiService.js')
      
      // Utiliser les filtres Strapi pour la recherche
      const response = await strapiAdminApi.get(`/content-manager/collection-types/plugin::users-permissions.user?filters[username][$containsi]=${query}`)
      
      return response.data || response || []
    } catch (err) {
      error.value = `Erreur lors de la recherche: ${err.message}`
      console.error('❌ Erreur searchUsers:', err)
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
      
      console.log('🔗 Test de connexion à:', 'http://localhost:1337/content-manager/collection-types/plugin::users-permissions.user')
      
      const response = await strapiAdminApi.get('/content-manager/collection-types/plugin::users-permissions.user?page=1&pageSize=1')
      
      console.log('✅ Test de connexion Strapi Content Manager API réussi:', response)
      return true
      
    } catch (err) {
      console.error('❌ Test de connexion Strapi Content Manager API échoué:', err)
      return false
    }
  }

  // Méthodes utilitaires pour l'affichage selon le schéma Strapi réel
  const getUserRole = (user) => {
    if (user.role) {
      return user.role.name || user.role.type || 'Utilisateur'
    }
    return 'Utilisateur'
  }

  const getUserStatus = (user) => {
    if (user.blocked) return 'Bloqué'
    if (!user.confirmed) return 'Non confirmé'
    return 'Actif'
  }

  const getUserExperience = (user) => {
    return user.experience ? parseInt(user.experience) : 0
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

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed properties
    totalUsers,
    newUsers,
    
    // Actions
    fetchUsers,
    fetchUserById,
    deleteUser,
    updateUser,
    createUser,
    searchUsers,
    testConnection,
    
    // Utilitaires
    getUserRole,
    getUserStatus,
    getUserExperience,
    formatDate
  }
}

// Export par défaut pour compatibilité
export default useUsers