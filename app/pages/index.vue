<template>
  <div class="dashboard">
    <!-- Section de bienvenue -->
    <section class="dashboard__welcome">
      <h2 class="dashboard__welcome__title">
        Bienvenue dans le CMS URBEX CHRONICLES
      </h2>
      <p class="dashboard__welcome__description">
        Interface de gestion de contenu pour votre application d'exploration urbaine.
        Gérez vos missions, fragments et contenus depuis cette interface centralisée.
      </p>
    </section>

    <!-- Statistiques rapides -->
    <section class="dashboard__stats">
      <div class="dashboard__stats__grid">
        <div class="dashboard__stats__card">
          <div class="dashboard__stats__card__icon">
            <Icon name="heroicons:target" size="24" />
          </div>
          <div class="dashboard__stats__card__content">
            <span class="dashboard__stats__card__number">{{ stats.missions || 0 }}</span>
            <span class="dashboard__stats__card__label">Missions</span>
          </div>
        </div>

        <div class="dashboard__stats__card">
          <div class="dashboard__stats__card__icon">
            <Icon name="heroicons:puzzle-piece" size="24" />
          </div>
          <div class="dashboard__stats__card__content">
            <span class="dashboard__stats__card__number">{{ stats.fragments || 0 }}</span>
            <span class="dashboard__stats__card__label">Fragments</span>
          </div>
        </div>

        <div class="dashboard__stats__card">
          <div class="dashboard__stats__card__icon">
            <Icon name="heroicons:map-pin" size="24" />
          </div>
          <div class="dashboard__stats__card__content">
            <span class="dashboard__stats__card__number">{{ stats.locations || 0 }}</span>
            <span class="dashboard__stats__card__label">Lieux</span>
          </div>
        </div>

        <div class="dashboard__stats__card">
          <div class="dashboard__stats__card__icon">
            <Icon name="heroicons:users" size="24" />
          </div>
          <div class="dashboard__stats__card__content">
            <span class="dashboard__stats__card__number">{{ stats.users || 0 }}</span>
            <span class="dashboard__stats__card__label">Explorateurs</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid des modules -->
    <section class="dashboard__modules">
      <div class="dashboard__modules__grid">
        
        <!-- Module Missions -->
        <div class="dashboard__module dashboard__module--missions">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:target" size="32" />
            </div>
            <h3 class="dashboard__module__title">Missions</h3>
          </div>
          <p class="dashboard__module__description">
            Créer et gérer les missions d'exploration urbaine
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/missions')">
            <Icon name="heroicons:arrow-right" size="16" />
            Gérer les missions
          </button>
        </div>

        <!-- Module Fragments -->
        <div class="dashboard__module dashboard__module--fragments">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:puzzle-piece" size="32" />
            </div>
            <h3 class="dashboard__module__title">Fragments</h3>
          </div>
          <p class="dashboard__module__description">
            Gérer les fragments d'information et indices
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/fragments')">
            <Icon name="heroicons:arrow-right" size="16" />
            Gérer les fragments
          </button>
        </div>

        <!-- Module Lieux -->
        <div class="dashboard__module dashboard__module--locations">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:map-pin" size="32" />
            </div>
            <h3 class="dashboard__module__title">Lieux</h3>
          </div>
          <p class="dashboard__module__description">
            Cartographier les lieux d'exploration urbaine
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/locations')">
            <Icon name="heroicons:arrow-right" size="16" />
            Gérer les lieux
          </button>
        </div>

        <!-- Module Utilisateurs -->
        <div class="dashboard__module dashboard__module--users">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:users" size="32" />
            </div>
            <h3 class="dashboard__module__title">Utilisateurs</h3>
          </div>
          <p class="dashboard__module__description">
            Gérer les comptes et permissions des explorateurs
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/users')">
            <Icon name="heroicons:arrow-right" size="16" />
            Gérer les utilisateurs
          </button>
        </div>

        <!-- Module Médias -->
        <div class="dashboard__module dashboard__module--media">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:photo" size="32" />
            </div>
            <h3 class="dashboard__module__title">Médias</h3>
          </div>
          <p class="dashboard__module__description">
            Bibliothèque de photos, vidéos et documents
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/media')">
            <Icon name="heroicons:arrow-right" size="16" />
            Gérer les médias
          </button>
        </div>

        <!-- Module Analytics -->
        <div class="dashboard__module dashboard__module--analytics">
          <div class="dashboard__module__header">
            <div class="dashboard__module__icon">
              <Icon name="heroicons:chart-bar" size="32" />
            </div>
            <h3 class="dashboard__module__title">Analytics</h3>
          </div>
          <p class="dashboard__module__description">
            Statistiques d'utilisation et performances
          </p>
          <button class="dashboard__module__button" @click="navigateToModule('admin/analytics')">
            <Icon name="heroicons:arrow-right" size="16" />
            Voir les statistiques
          </button>
        </div>
      </div>
    </section>

    <!-- Activités récentes -->
    <section class="dashboard__recent-activity">
      <div class="dashboard__recent-activity__header">
        <h3 class="dashboard__recent-activity__title">Activités récentes</h3>
        <button class="dashboard__recent-activity__refresh" @click="refreshActivities">
          <Icon name="heroicons:arrow-path" size="16" :class="{ 'animate-spin': isLoadingActivities }" />
        </button>
      </div>
      
      <div class="dashboard__recent-activity__content">
        <div v-if="isLoadingActivities" class="dashboard__recent-activity__loading">
          <Icon name="heroicons:arrow-path" size="20" class="animate-spin" />
          <span>Chargement des activités...</span>
        </div>
        
        <div v-else-if="!recentActivities.length" class="dashboard__recent-activity__empty">
          <Icon name="heroicons:inbox" size="32" />
          <span>Aucune activité récente</span>
        </div>
        
        <div v-else class="dashboard__recent-activity__list">
          <div v-for="activity in recentActivities" :key="activity.id" class="dashboard__recent-activity__item">
            <div class="dashboard__recent-activity__item__icon">
              <Icon :name="getActivityIcon(activity.type)" size="16" />
            </div>
            <div class="dashboard__recent-activity__item__content">
              <p class="dashboard__recent-activity__item__description">
                {{ activity.description }}
              </p>
              <span class="dashboard__recent-activity__item__time">
                {{ formatTime(activity.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { strapiAdminApi } from '../service/ApiService.js'

// Meta de la page
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'Dashboard - CMS URBEX CHRONICLES'
})

// Head configuration
useHead({
  title: 'Dashboard - CMS URBEX CHRONICLES'
})

// Router
const router = useRouter()

// État réactif
const stats = ref({
  missions: 0,
  fragments: 0,
  locations: 0,
  users: 0
})

const recentActivities = ref([])
const isLoadingActivities = ref(false)

// Méthodes
const navigateToModule = (path) => {
  router.push(`/${path}`)
}

const getActivityIcon = (type) => {
  const icons = {
    mission: 'heroicons:target',
    fragment: 'heroicons:puzzle-piece',
    location: 'heroicons:map-pin',
    user: 'heroicons:users',
    media: 'heroicons:photo',
    default: 'heroicons:information-circle'
  }
  return icons[type] || icons.default
}

const formatTime = (timestamp) => {
  const now = new Date()
  const activityTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  }
}

const loadStats = async () => {
  try {
    // Charger les statistiques depuis l'API Strapi
    // Ces endpoints peuvent ne pas exister encore, on met des valeurs par défaut
    const [missions, fragments, locations, users] = await Promise.allSettled([
      strapiAdminApi.get('/admin/content-manager/collection-types/api::mission.mission').catch(() => ({ data: [] })),
      strapiAdminApi.get('/admin/content-manager/collection-types/api::fragment.fragment').catch(() => ({ data: [] })),
      strapiAdminApi.get('/admin/content-manager/collection-types/api::location.location').catch(() => ({ data: [] })),
      strapiAdminApi.get('/admin/users').catch(() => ({ data: { results: [] } }))
    ])

    stats.value = {
      missions: missions.value?.data?.results?.length || missions.value?.data?.length || 0,
      fragments: fragments.value?.data?.results?.length || fragments.value?.data?.length || 0,
      locations: locations.value?.data?.results?.length || locations.value?.data?.length || 0,
      users: users.value?.data?.results?.length || users.value?.data?.length || 0
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}

const loadRecentActivities = async () => {
  isLoadingActivities.value = true
  
  try {
    // Simuler des activités récentes pour l'instant
    // Dans un vrai projet, cela viendrait de l'API Strapi
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simuler un appel API
    
    recentActivities.value = [
      {
        id: 1,
        type: 'mission',
        description: 'Nouvelle mission "Exploration du Métro Abandonné" créée',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // Il y a 2 heures
      },
      {
        id: 2,
        type: 'fragment',
        description: 'Fragment "Histoire de l\'usine" mis à jour',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // Il y a 4 heures
      },
      {
        id: 3,
        type: 'location',
        description: 'Nouveau lieu "Ancienne gare de triage" ajouté',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Il y a 1 jour
      }
    ]
  } catch (error) {
    console.error('Erreur lors du chargement des activités:', error)
  } finally {
    isLoadingActivities.value = false
  }
}

const refreshActivities = () => {
  loadRecentActivities()
}

// Lifecycle
onMounted(() => {
  loadStats()
  loadRecentActivities()
})
</script>

<style lang="scss" scoped>
.dashboard {
  &__welcome {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;

    &__title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
    }

    &__description {
      font-size: 1.125rem;
      opacity: 0.9;
      margin: 0;
      max-width: 600px;
    }
  }

  &__stats {
    margin-bottom: 2rem;

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    &__card {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;

      &__icon {
        background: #eff6ff;
        color: #3b82f6;
        padding: 0.75rem;
        border-radius: 0.5rem;
      }

      &__content {
        flex: 1;
      }

      &__number {
        display: block;
        font-size: 1.875rem;
        font-weight: 700;
        color: #1e293b;
        line-height: 1;
      }

      &__label {
        display: block;
        font-size: 0.875rem;
        color: #64748b;
        margin-top: 0.25rem;
      }
    }
  }

  &__modules {
    margin-bottom: 3rem;

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  }

  &__module {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    &__icon {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem;
      border-radius: 0.75rem;
    }

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    &__description {
      color: #64748b;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transform: translateY(-1px);
      }
    }
  }

  &__recent-activity {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    &__refresh {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: color 0.2s ease;

      &:hover {
        color: #3b82f6;
      }
    }

    &__loading,
    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 2rem;
      color: #64748b;
      flex-direction: column;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 0.5rem;

      &__icon {
        background: white;
        color: #3b82f6;
        padding: 0.5rem;
        border-radius: 0.375rem;
        flex-shrink: 0;
      }

      &__content {
        flex: 1;
      }

      &__description {
        color: #1e293b;
        margin: 0 0 0.25rem 0;
        font-weight: 500;
      }

      &__time {
        color: #64748b;
        font-size: 0.875rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .dashboard {
    &__welcome {
      padding: 2rem 1rem;

      &__title {
        font-size: 1.5rem;
      }

      &__description {
        font-size: 1rem;
      }
    }

    &__stats {
      &__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &__modules {
      &__grid {
        grid-template-columns: 1fr;
      }
    }

    &__module {
      padding: 1.5rem;
    }

    &__recent-activity {
      padding: 1.5rem;
    }
  }
}
</style>
