<template>
  <!-- Sidebar: Position fixe -->
  <LayoutSidebar />
  <!-- TopBar: Position fixe -->
  <LayoutTopBar />
  
  <!-- Contenu principal -->
  <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 min-h-screen bg-white">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Page Title -->
      <div class="mb-12 flex-shrink-0">
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Succes</h1>
        
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="refresh" size="md" class="text-blue-500 mr-2 animate-spin" />
            <span class="text-blue-800">Chargement des succès...</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="check" size="md" class="text-green-500 mr-2" />
            <span class="text-green-800">{{ successMessage }}</span>
          </div>
        </div>
        
        <!-- Message d'erreur -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="exclamation" size="md" class="text-red-500 mr-2" />
            <span class="text-red-800">{{ error }}</span>
            <button @click="refreshData" class="ml-4 text-red-600 hover:text-red-800 underline">Réessayer</button>
          </div>
        </div>
      </div>
      
      <div class="ml-8">
        
        <!-- Stats Section dynamiques -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-12">
            <!-- Total succès -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalSuccesses }}</div>
              <div class="text-base lg:text-lg text-gray-600">Total Succès</div>
            </div>

            <!-- Succès actifs (publiés) -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ activeSuccesses }}</div>
              <div class="text-base lg:text-lg text-gray-600">Publiés</div>
            </div>

            <!-- Succès en brouillon -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalSuccesses - activeSuccesses }}</div>
              <div class="text-base lg:text-lg text-gray-600">Brouillons</div>
            </div>

            <!-- XP Total disponible -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ formatNumber(totalXP) }}</div>
              <div class="text-base lg:text-lg text-gray-600">XP Disponibles</div>
            </div>

            <!-- XP Total distribué -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ formatNumber(totalXPDistributed) }}</div>
              <div class="text-base lg:text-lg text-gray-600">XP Total distribué</div>
            </div>
          </div>
        </div>

        <!-- Formulaire d'ajout -->
        <div class="mb-12 flex-shrink-0">
          <!-- Formulaire Principal avec onglet déroulant -->
          <div class="bg-white mb-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Header cliquable -->
            <div 
              @click="showAddForm = !showAddForm"
              class="bg-gradient-to-r from-blue-500 to-gray-800 px-8 py-6 cursor-pointer hover:from-blue-600 hover:to-gray-900 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                    <svg class="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Ajouter un nouveau succès
                  </h2>
                  <p class="text-blue-100 mt-1">
                    Créez des succès pour motiver vos utilisateurs
                  </p>
                </div>
                <!-- Icône de déroulement -->
                <div class="flex items-center">
                  <svg 
                    :class="{ 'rotate-180': showAddForm }" 
                    class="w-6 h-6 text-blue-200 transform transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Contenu du formulaire (collapsible) -->
            <div 
              v-show="showAddForm" 
              class="p-8 transition-all duration-300 ease-in-out"
              :class="showAddForm ? 'animate-fade-in' : ''"
            >
              <!-- Formulaire complet - Simplifié selon le schéma Strapi -->
              <div class="space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Colonne gauche - Nom du succès -->
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Nom du succès *
                        </span>
                      </label>
                      <input 
                        v-model="newSuccess.name"
                        type="text" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Ex: Premier circuit terminé"
                        required
                      />
                      <p class="text-xs text-gray-500 mt-1">Le nom doit être unique (minimum 3 caractères)</p>
                    </div>
                  </div>
                  
                  <!-- Colonne droite - Expérience -->
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          Points d'expérience *
                        </span>
                      </label>
                      <input 
                        v-model.number="newSuccess.experience"
                        type="number" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="100"
                        min="1"
                        required
                      />
                      <p class="text-xs text-gray-500 mt-1">Points d'expérience gagnés en obtenant ce succès</p>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    @click="clearForm"
                    class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    @click="createSuccess"
                    :disabled="!canCreateSuccess"
                    :class="canCreateSuccess ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                    class="px-8 py-3 rounded-lg transition-colors duration-200 flex items-center"
                  >
                    <UiIcon name="plus" size="md" class="mr-2" />
                    Créer le succès
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Management Table -->
        <div class="mb-12">
          <div class="flex justify-between items-center pb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des succès</h2>
            </div>
            
            <div class="flex justify-between items-center">
              <!-- Filtres avec overlay -->
              <UiFilterOverlay
                page-title="les succès"
                :filters="filters"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateFilters"
                @reset="clearFilters"
              >
                <template #default="{ filters, updateFilter }">
                  <!-- Recherche -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher
                    </label>
                    <input
                      :value="filters.search"
                      @input="updateFilter('search', $event.target.value)"
                      type="text"
                      placeholder="Nom du succès..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <!-- Statut -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select
                      :value="filters.status"
                      @change="updateFilter('status', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="published">Publiés</option>
                      <option value="draft">Brouillons</option>
                    </select>
                  </div>

                  <!-- Expérience -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expérience</label>
                    <select
                      :value="filters.experience"
                      @change="updateFilter('experience', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Toute expérience</option>
                      <option value="low">Faible (< 100 XP)</option>
                      <option value="medium">Moyenne (100-500 XP)</option>
                      <option value="high">Élevée (> 500 XP)</option>
                    </select>
                  </div>
                </template>
              </UiFilterOverlay>

              <!-- Bouton refresh -->
              <UiRefreshButton 
                :loading="loading" 
                @click="refreshData"
                variant="secondary"
                size="sm"
              />
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <!-- Table Header - Amélioré avec plus d'informations -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div class="col-span-4">Nom</div>
                <div class="col-span-2">Expérience</div>
                <div class="col-span-2">Statut</div>
                <div class="col-span-1">Débloquages</div>
                <div class="col-span-2">Modifié</div>
                <div class="col-span-1">Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Message si aucun succès -->
              <div v-if="!loading && filteredAchievements.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p class="mt-4 text-lg text-gray-500">
                  {{ achievements.length === 0 ? 'Aucun succès trouvé' : 'Aucun succès ne correspond aux filtres' }}
                </p>
                <p class="text-sm text-gray-400">
                  {{ achievements.length === 0 ? 'Créez votre premier succès pour motiver vos utilisateurs' : 'Essayez de modifier les critères de filtrage' }}
                </p>
              </div>
              
              <!-- Liste des succès -->
              <div 
                v-for="(success, index) in filteredAchievements" 
                :key="success.id || index"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-12 gap-4 items-center text-sm">
                  <!-- Nom du succès -->
                  <div class="col-span-4 flex items-center space-x-3 min-w-0">
                    <div class="text-2xl flex-shrink-0">🏆</div>
                    <div class="min-w-0 flex-1">
                      <div class="text-gray-900 font-medium truncate">{{ success.name || 'N/A' }}</div>
                    </div>
                  </div>
                  
                  <!-- Expérience -->
                  <div class="col-span-2 text-gray-600 font-mono text-sm">
                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold text-xs whitespace-nowrap">
                      {{ formatNumber(success.experience || 0) }} XP
                    </span>
                  </div>
                  
                  <!-- Statut (interactif) -->
                  <div class="col-span-2 text-gray-600">
                    <button
                      @click="toggleSuccessStatus(success)"
                      :class="success.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
                      class="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 flex items-center space-x-1 w-full justify-center"
                      :title="success.active ? 'Cliquer pour mettre en brouillon' : 'Cliquer pour publier'"
                    >
                      <span>{{ success.active ? '✓ Publié' : '⏳ Brouillon' }}</span>
                    </button>
                  </div>
                  
                                    <!-- Débloquages (simulation) -->
                  <div class="col-span-1 text-gray-600 text-center">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {{ success.unlocks || 0 }}
                    </span>
                  </div>
                  
                  <!-- Date de modification -->
                  <div class="col-span-2 text-gray-500 text-sm min-w-0">
                    <div class="truncate font-medium">{{ formatDate(success.updatedAt) }}</div>
                    <div class="text-xs text-gray-400 truncate">{{ formatTimeAgo(success.updatedAt) }}</div>
                  </div>
                  
                  <!-- Actions -->
                  <div class="col-span-1 flex space-x-1 justify-center">
                    <button
                      @click="editSuccess(success)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="sm" />
                    </button>
                    <button
                      @click="toggleSuccessStatus(success)"
                      :class="success.active ? 'text-orange-600 hover:bg-orange-100' : 'text-green-600 hover:bg-green-100'"
                      class="p-2 rounded-lg transition-colors duration-200"
                      :title="success.active ? 'Mettre en brouillon' : 'Publier'"
                    >
                      <UiIcon v-if="success.active" name="close" size="sm" />
                      <UiIcon v-else name="check-circle" size="sm" />
                    </button>
                    <button
                      @click="deleteSuccess(success)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Supprimer"
                    >
                      <UiIcon name="trash" size="sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal d'édition -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Modifier le succès</h3>
        <button @click="showEditModal = false; editingSuccess = null" class="text-gray-400 hover:text-gray-600">
          <UiIcon name="close" size="lg" />
        </button>
      </div>
      
      <div v-if="editingSuccess" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nom du succès -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nom du succès *</label>
            <input 
              v-model="editingSuccess.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du succès"
              required
            />
            <p class="text-xs text-gray-500 mt-1">Le nom doit être unique (minimum 3 caractères)</p>
          </div>
          
          <!-- Expérience -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Points d'expérience *</label>
            <input 
              v-model.number="editingSuccess.experience"
              type="number" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
              min="1"
              required
            />
            <p class="text-xs text-gray-500 mt-1">Points d'expérience gagnés en obtenant ce succès</p>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="showEditModal = false; editingSuccess = null"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            @click="saveEditSuccess"
            :disabled="!editingSuccess.name || !editingSuccess.experience"
            :class="(editingSuccess.name && editingSuccess.experience) ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAchievements } from '../../composables/useAchievements.js'

// Meta de la page (sauvegarde forcée)
definePageMeta({
  middleware: 'admin',
  title: 'Gestion des succès - Administration'
})

// Head configuration
useHead({
  title: 'Gestion des succès - Administration | Urbex Chronicles',
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

// Utilisation du composable
const {
  achievements,
  loading,
  error,
  stats,
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  toggleAchievementStatus
} = useAchievements()

// État local pour l'interface
const successMessage = ref('')
const showAddForm = ref(false)
const showEditModal = ref(false)
const editingSuccess = ref(null)

// Variables de filtrage
const filters = ref({
  search: '',
  status: '',
  experience: ''
})

// Computed properties pour les stats
const totalSuccesses = computed(() => stats.value.total)
const activeSuccesses = computed(() => stats.value.active)
const todayUnlocked = computed(() => stats.value.todayUnlocked)
const totalXP = computed(() => stats.value.totalXP)
const totalXPDistributed = computed(() => stats.value.totalXPDistributed)

// Computed property pour les achievements filtrés
const filteredAchievements = computed(() => {
  let filtered = [...achievements.value]
  
  // Filtre par nom (recherche)
  if (filters.value.search.trim()) {
    const search = filters.value.search.toLowerCase().trim()
    filtered = filtered.filter(achievement => 
      achievement.name?.toLowerCase().includes(search)
    )
  }
  
  // Filtre par statut
  if (filters.value.status) {
    filtered = filtered.filter(achievement => {
      if (filters.value.status === 'published') {
        return achievement.active === true
      } else if (filters.value.status === 'draft') {
        return achievement.active === false
      }
      return true
    })
  }
  
  // Filtre par expérience
  if (filters.value.experience) {
    filtered = filtered.filter(achievement => {
      const xp = achievement.experience || 0
      if (filters.value.experience === 'low') {
        return xp < 100
      } else if (filters.value.experience === 'medium') {
        return xp >= 100 && xp <= 500
      } else if (filters.value.experience === 'high') {
        return xp > 500
      }
      return true
    })
  }
  
  return filtered
})

// Computed property pour détecter si des filtres sont actifs
const hasActiveFilters = computed(() => {
  return filters.value.search.trim() !== '' || 
         filters.value.status !== '' || 
         filters.value.experience !== ''
})

// Computed property pour compter les filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.search.trim() !== '') count++
  if (filters.value.status !== '') count++
  if (filters.value.experience !== '') count++
  return count
})

// Formulaire pour nouveau succès - Conforme au schéma Strapi
const newSuccess = ref({
  name: '',
  experience: 100
})

// Computed pour validation du formulaire - Champs obligatoires du schéma
const canCreateSuccess = computed(() => {
  return newSuccess.value.name && 
         newSuccess.value.name.length >= 3 && 
         newSuccess.value.experience > 0
})

// Fonctions CRUD - Conformes au schéma Strapi achievements
const createSuccess = async () => {
  if (!canCreateSuccess.value) return
  
  try {
    const achievementData = {
      name: newSuccess.value.name,
      experience: newSuccess.value.experience
    }
    
    await createAchievement(achievementData)
    
    successMessage.value = 'Succès créé avec succès !'
    clearForm()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (err) {
    error.value = 'Erreur lors de la création du succès'
    console.error('Erreur:', err)
  }
}

const editSuccess = (success) => {
  editingSuccess.value = { ...success }
  showEditModal.value = true
}

const saveEditSuccess = async () => {
  if (!editingSuccess.value.name || !editingSuccess.value.experience) return
  
  try {
    const achievementData = {
      name: editingSuccess.value.name,
      experience: editingSuccess.value.experience
    }
    
    await updateAchievement(editingSuccess.value.documentId || editingSuccess.value.id, achievementData)
    
    successMessage.value = 'Succès modifié avec succès !'
    showEditModal.value = false
    editingSuccess.value = null
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (err) {
    error.value = 'Erreur lors de la modification du succès'
    console.error('Erreur:', err)
  }
}

const toggleSuccessStatus = async (success) => {
  try {
    await toggleAchievementStatus(success.documentId || success.id, !success.active)
    successMessage.value = `Succès ${!success.active ? 'publié' : 'mis en brouillon'} !`
    
    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
    
  } catch (err) {
    error.value = 'Erreur lors du changement de statut'
    console.error('Erreur:', err)
  }
}

const deleteSuccess = async (success) => {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le succès "${success.name}" ?`)) return
  
  try {
    await deleteAchievement(success.documentId || success.id)
    
    successMessage.value = 'Succès supprimé avec succès !'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (err) {
    error.value = 'Erreur lors de la suppression du succès'
    console.error('Erreur:', err)
  }
}

const clearForm = () => {
  newSuccess.value = {
    name: '',
    experience: 100
  }
  showAddForm.value = false
}

// Fonctions pour les filtres
const updateFilters = (newFilters) => {
  filters.value = { ...newFilters }
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    experience: ''
  }
}

const resetFilters = () => {
  clearFilters()
}

// Fonction pour formater les nombres correctement
const formatNumber = (num) => {
  if (num === 0 || num === null || num === undefined) return '0'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Fonctions pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    return 'Date invalide'
  }
}

const formatTimeAgo = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'À l\'instant'
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `Il y a ${diffInDays}j`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `Il y a ${diffInMonths}mois`
    
    const diffInYears = Math.floor(diffInMonths / 12)
    return `Il y a ${diffInYears}an${diffInYears > 1 ? 's' : ''}`
  } catch (error) {
    return ''
  }
}

const refreshData = async () => {
  error.value = ''
  await fetchAchievements()
  successMessage.value = 'Données rechargées !'
  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

// Initialisation
onMounted(async () => {
  console.log('🏆 Page Succès initialisée - Chargement des achievements depuis Strapi')
  await fetchAchievements()
})
</script>

<style scoped>
/* Animations pour le formulaire */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition pour la rotation de l'icône */
.rotate-180 {
  transform: rotate(180deg);
}

/* Hover effects pour les boutons */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>