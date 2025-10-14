/**
 * Composable pour le dashboard principal
 * Agrège les données des différentes collections Strapi
 */
import { ref, computed, readonly } from 'vue'

export default async function useDashboard() {
  // États réactifs
  const loading = ref(true)
  const error = ref(null)
  const lastUpdated = ref(null)

  // Initialiser les composables (fonctions normales et asynchrones)
  const users = useUsers()
  const circuits = useCircuits()
  const missions = await useMissions()

  // Statistiques calculées dynamiquement avec vérifications de sécurité
  const stats = computed(() => {
    const circuitsValue = circuits?.totalCircuits?.value || 0
    const activeCircuitsValue = circuits?.activeCircuits?.value || 0
    const missionsValue = missions?.publishedMissions?.value || 0
    const usersValue = users?.totalUsers?.value || 0
    const totalMissionsValue = missions?.totalMissions?.value || 0
    
    // Calculer l'XP total depuis l'expérience de tous les utilisateurs
    const totalXpValue = users?.users?.value?.reduce((total, user) => total + (Number(user.experience) || 0), 0) || 0

    return {
      // Circuits actifs (publiés) - priorité aux circuits actifs si disponible
      totalCircuits: circuitsValue,
      activeCircuits: activeCircuitsValue,
      
      // Missions en cours (publiées)
      publishedMissions: missionsValue,
      totalMissions: totalMissionsValue,
      
      // Nouvelles notifications (missions récentes + circuits récents)
      activeNotifications: Math.min(totalMissionsValue + circuitsValue, 10), // Limité à 10
      
      // Utilisateurs total
      totalUsers: usersValue,
      
      // XP total (calculé depuis l'expérience cumulée de tous les utilisateurs)
      totalXp: totalXpValue,
      
      // Tickets ouverts (simulé - peut être remplacé par une vraie collection)
      openTickets: Math.floor(Math.random() * 8) + 2 // Entre 2-9 tickets
    }
  })

  /**
   * Charger toutes les données du dashboard
   */
  const fetchDashboardData = async () => {
    loading.value = true
    error.value = null
    
    try {
      console.log('🎯 Chargement des données du dashboard...')
      
      // Charger toutes les données en parallèle avec vérifications
      const promises = []
      
      if (users?.fetchUsers) {
        promises.push(users.fetchUsers())
      }
      
      if (missions?.fetchMissions) {
        promises.push(missions.fetchMissions())
      }
      
      if (circuits?.fetchCircuits) {
        promises.push(circuits.fetchCircuits())
      }
      
      await Promise.all(promises)
      
      lastUpdated.value = new Date()
      console.log('✅ Toutes les données du dashboard chargées avec succès')
      
    } catch (err) {
      console.error('❌ Erreur lors du chargement du dashboard:', err)
      error.value = 'Impossible de charger les données du dashboard'
    } finally {
      loading.value = false
    }
  }

  /**
   * Rafraîchir toutes les données
   */
  const refreshAll = async () => {
    await fetchDashboardData()
  }

  /**
   * Obtenir le statut du système
   */
  const getSystemStatus = computed(() => {
    // Calculer le statut global basé sur les données disponibles
    const totalItems = (missions?.totalMissions?.value || 0) + 
                     (circuits?.totalCircuits?.value || 0) + 
                     (users?.totalUsers?.value || 0)
    
    if (totalItems === 0) {
      return {
        status: 'warning',
        message: 'Aucune donnée disponible',
        description: 'Connectez-vous à Strapi et ajoutez du contenu'
      }
    }
    
    if (totalItems < 10) {
      return {
        status: 'info',
        message: 'Données limitées',
        description: `${totalItems} éléments au total`
      }
    }
    
    return {
      status: 'success',
      message: 'Système opérationnel',
      description: `${totalItems} éléments chargés`
    }
  })

  /**
   * Formater la dernière mise à jour
   */
  const formatLastUpdated = computed(() => {
    if (!lastUpdated.value) return 'Jamais mis à jour'
    
    const now = new Date()
    const diff = now - lastUpdated.value
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
    
    return lastUpdated.value.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  })

  // État de chargement global
  const isLoading = computed(() => 
    loading.value || users?.loading?.value || missions?.loading?.value || circuits?.loading?.value
  )

  // Erreurs globales
  const globalError = computed(() => 
    error.value || users?.error?.value || missions?.error?.value || circuits?.error?.value
  )

  // Message de statut du système simplifié
  const getSystemStatusMessage = computed(() => {
    const status = getSystemStatus.value
    return `${status.message}: ${status.description}`
  })

  // Retourner l'API publique
  return {
    // États
    loading: readonly(loading),
    error: readonly(error),
    isLoading,
    globalError,
    lastUpdated: readonly(lastUpdated),
    
    // Données calculées
    stats,
    getSystemStatus,
    getSystemStatusMessage,
    formatLastUpdated,
    
    // Actions
    fetchDashboardData,
    refreshAll,
    
    // Composables sous-jacents (pour accès direct si nécessaire)
    users,
    missions,
    circuits
  }
}
