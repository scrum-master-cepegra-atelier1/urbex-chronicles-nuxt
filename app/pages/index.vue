<template>
  <!-- Sidebar: Position fixe -->
  <LayoutSidebar />
  <!-- TopBar: Position fixe -->
  <LayoutTopBar />
  
  <!-- Contenu principal -->
  <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 min-h-screen bg-white">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Page Title avec indicateurs dynamiques -->
      <div class="mb-12 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-gray-900 mb-2" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Dashboard</h1>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-3">
            <button 
              @click="handleRefresh" 
              :disabled="refreshing || isLoading"
              class="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
            >
              <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': refreshing || isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ refreshing ? 'Actualisation...' : 'Actualiser' }}
            </button>
            <br>
            <span class="text-xs text-gray-400">• Dernière mise à jour: {{ formatLastUpdated }}</span>

          </div>
        </div>
        
        <!-- Message d'erreur global -->
        <div v-if="globalError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800">{{ globalError }}</span>
            <button @click="handleRefresh" class="ml-4 text-red-600 hover:text-red-800 underline">Réessayer</button>
          </div>
        </div>
        
        <!-- Indicateur de chargement global -->
        <div v-if="isLoading && !refreshing" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-500 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="text-blue-800">Chargement des données depuis Strapi...</span>
          </div>
        </div>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Stats Grid navigables -->
        <div class="grid grid-cols-2 mt-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24 me-32 ml-8 auto-rows-fr">
                
                <!-- Circuits actifs - Navigable -->
                <NuxtLink to="/admin/circuits" class="block">
                  <div class="bg-gray-100 rounded-lg p-6 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer transform hover:scale-105 h-full flex flex-col justify-between">
                    <div>
                      <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                        {{ isLoading ? '...' : stats.activeSpots }}
                      </div>
                      <div class="text-base lg:text-lg text-gray-600 leading-tight">Circuits<br>actifs</div>
                    </div>
                    <div class="text-xs text-blue-600 mt-4 flex items-center">
                      <span>Gérer</span>
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </NuxtLink>

                <!-- Missions publiées - Navigable -->
                <NuxtLink to="/admin/missions" class="block">
                  <div class="bg-gray-100 rounded-lg p-6 hover:bg-green-50 hover:border-green-200 border border-transparent transition-all duration-200 cursor-pointer transform hover:scale-105 h-full flex flex-col justify-between">
                    <div>
                      <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                        {{ isLoading ? '...' : stats.activeMissions }}
                      </div>
                      <div class="text-base lg:text-lg text-gray-600 leading-tight">Missions<br>publiées</div>
                    </div>
                    <div class="text-xs text-green-600 mt-4 flex items-center">
                      <span>Gérer</span>
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </NuxtLink>

                <!-- Notifications actives -->
                <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
                  <div>
                    <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                      {{ isLoading ? '...' : stats.activeNotifications }}
                    </div>
                    <div class="text-base lg:text-lg text-gray-600 leading-tight">Notifications<br>actives</div>
                  </div>
                </div>

                <!-- Utilisateurs - Navigable -->
                <NuxtLink to="/admin/utilisateurs" class="block">
                  <div class="bg-gray-100 rounded-lg p-6 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-200 cursor-pointer transform hover:scale-105 h-full flex flex-col justify-between">
                    <div>
                      <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                        {{ isLoading ? '...' : stats.onlineUsers }}
                      </div>
                      <div class="text-base lg:text-lg text-gray-600 leading-tight">Utilisateurs<br>enregistrés</div>
                    </div>
                    <div class="text-xs text-purple-600 mt-4 flex items-center">
                      <span>Gérer</span>
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </NuxtLink>

                <!-- XP total distribué -->
                <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
                  <div>
                    <div class="text-3xl lg:text-4xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                      {{ isLoading ? '...' : stats.totalXp.toLocaleString('fr-FR') }}
                    </div>
                    <div class="text-base lg:text-lg text-gray-600 leading-tight">XP total<br>distribué</div>
                  </div>
                  <div class="text-xs text-gray-500 mt-4">Basé sur missions</div>
                </div>

                <!-- Tickets -->
                <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
                  <div>
                    <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                      {{ isLoading ? '...' : stats.tickets }}
                    </div>
                    <div class="text-base lg:text-lg text-gray-600 leading-tight">Tickets<br>ouverts</div>
                  </div>
                </div>
                
        </div>

        <!-- Map Section améliorée -->
        <div class="bg-white rounded-lg border border-gray-300 border-dashed p-8 lg:p-12 h-80 flex items-center justify-center mr-8 ml-8">
          <div class="text-center text-gray-500">
            <svg class="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            <div class="text-lg lg:text-xl font-medium mb-2">Carte interactive des circuits</div>
            <div class="text-sm text-gray-400 mb-4">{{ stats.activeSpots }} circuits disponibles pour la visualisation</div>
            <button 
              @click="viewMap" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              Voir la carte
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Dashboard'
})

// Head configuration
useHead({
  title: 'Dashboard - Urbex Chronicles',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect', 
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Freeman&display=swap'
    }
  ]
})

// États réactifs pour le dashboard
const dashboardData = ref(null)
const dashboardLoading = ref(true)
const dashboardError = ref(null)

// Computed properties basées sur les données du dashboard
const stats = computed(() => dashboardData.value?.stats || {
  activeSpots: 0,
  activeMissions: 0,
  activeNotifications: 0,
  onlineUsers: 0,
  totalXp: 0,
  tickets: 0
})

const isLoading = computed(() => 
  dashboardLoading.value || dashboardData.value?.isLoading || false
)

const globalError = computed(() => 
  dashboardError.value || dashboardData.value?.globalError || null
)

const formatLastUpdated = computed(() => 
  dashboardData.value?.formatLastUpdated || 'Jamais mis à jour'
)

// Fonction pour initialiser le dashboard
const initializeDashboard = async () => {
  try {
    dashboardLoading.value = true
    dashboardError.value = null
    
    // Initialiser le composable de manière asynchrone
    const dashboard = await useDashboard()
    dashboardData.value = dashboard
    
    // Charger les données initiales
    await dashboard.fetchDashboardData()
    
  } catch (error) {
    console.error('❌ Erreur d\'initialisation du dashboard:', error)
    dashboardError.value = 'Impossible d\'initialiser le dashboard'
  } finally {
    dashboardLoading.value = false
  }
}

// États locaux
const refreshing = ref(false)

// Fonction pour rafraîchir les données
const handleRefresh = async () => {
  if (dashboardData.value?.refreshAll) {
    refreshing.value = true
    try {
      await dashboardData.value.refreshAll()
    } catch (error) {
      console.error('❌ Erreur lors du refresh:', error)
    } finally {
      refreshing.value = false
    }
  }
}

// Fonction pour voir la carte
const viewMap = () => {
  // Naviguer vers la page circuits avec focus sur la carte
  navigateTo('/admin/circuits?view=map')
}

// Chargement initial des données
onMounted(async () => {
  console.log('🎯 Initialisation du dashboard...')
  await initializeDashboard()
})
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>