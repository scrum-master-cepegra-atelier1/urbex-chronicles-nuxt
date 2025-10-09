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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Success / Achievements</h1>
        
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-500 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="text-blue-800">Chargement des succès depuis Strapi...</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-green-800">{{ successMessage }}</span>
          </div>
        </div>
        
        <!-- Message d'erreur -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800">{{ error }}</span>
            <button @click="refreshData" class="ml-4 text-red-600 hover:text-red-800 underline">Réessayer</button>
          </div>
        </div>
      </div>
      
      <div class="ml-8">
        
        <!-- Stats Section dynamiques -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Total achievements -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalAchievements }}</div>
              <div class="text-base lg:text-lg text-gray-600">Total succès</div>
            </div>

            <!-- Achievements actifs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ activeAchievements }}</div>
              <div class="text-base lg:text-lg text-gray-600">Succès publiés</div>
            </div>

            <!-- XP total débloqués -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ formatNumber(totalXP) }}</div>
              <div class="text-base lg:text-lg text-gray-600">XP Débloqués</div>
            </div>
          </div>
        </div>

        <!-- Add Achievement Section -->
        <div class="mb-12 flex-shrink-0">
          <!-- Formulaire Principal avec onglet déroulant -->
          <div class="bg-white mb-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Header cliquable -->
            <div 
              @click="toggleAddForm"
              class="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6 cursor-pointer hover:from-yellow-600 hover:to-orange-700 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                    <svg class="w-8 h-8 mr-3 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Ajouter un nouveau succès
                  </h2>
                  <p class="text-yellow-100 mt-1">
                    Créez un nouveau succès avec son nom et son expérience
                  </p>
                </div>
                <!-- Icône de déroulement -->
                <div class="flex items-center">
                  <svg 
                    :class="{ 'rotate-180': showAddForm }" 
                    class="w-6 h-6 text-yellow-200 transform transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Formulaire déroulant -->
            <div v-show="showAddForm" class="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <form @submit.prevent="addAchievement">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Nom -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nom du succès *
                      <span class="text-xs text-gray-500">(min. 3 caractères, unique)</span>
                    </label>
                    <input 
                      v-model="newAchievement.name" 
                      type="text" 
                      required
                      minlength="3"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                      placeholder="Ex: Premier circuit terminé"
                    />
                  </div>

                  <!-- Experience -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Expérience (XP) *
                      <span class="text-xs text-gray-500">(doit être > 0)</span>
                    </label>
                    <input 
                      v-model.number="newAchievement.experience" 
                      type="number" 
                      required
                      min="1"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                      placeholder="Ex: 100"
                    />
                  </div>
                </div>

                <!-- Boutons -->
                <div class="flex justify-end space-x-4 mt-6">
                  <button 
                    type="button" 
                    @click="clearForm" 
                    class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    class="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
                  >
                    Ajouter le succès
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Success Management Table -->
        <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <!-- En-tête avec filtres -->
          <div class="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white" style="font-family: 'Do Hyeon', sans-serif;">
                  Gestion des succès
                </h2>
                <p class="text-yellow-100 mt-1">
                  {{ filteredAchievements.length }} succès affichés
                  <span v-if="hasActiveFilters" class="text-yellow-200">
                    sur {{ totalAchievements }} au total
                  </span>
                </p>
              </div>

              <!-- Bouton de filtrage avec icône d'onglet -->
              <div class="flex items-center space-x-4">
                <button 
                  @click="showFilters = !showFilters"
                  class="flex items-center px-4 py-2 rounded-lg transition-all duration-200"
                  :class="showFilters || hasActiveFilters ? 'bg-white text-yellow-600' : 'bg-yellow-600 text-white hover:bg-yellow-700'"
                >
                  <!-- Icône de filtre -->
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                  </svg>
                  Filtres
                  <!-- Badge du nombre de filtres actifs -->
                  <span 
                    v-if="hasActiveFilters" 
                    class="ml-2 px-2 py-0.5 text-xs font-bold rounded-full"
                    :class="showFilters ? 'bg-yellow-600 text-white' : 'bg-white text-yellow-600'"
                  >
                    {{ activeFilterCount }}
                  </span>
                  <!-- Flèche de déroulement -->
                  <svg 
                    :class="{ 'rotate-180': showFilters }" 
                    class="w-4 h-4 ml-2 transform transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Panel de filtres repliable -->
            <div v-show="showFilters" class="mt-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Recherche par nom -->
                <div>
                  <label class="block text-sm font-medium text-white mb-2">Rechercher par nom</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input 
                      v-model="searchTerm" 
                      type="text" 
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent" 
                      placeholder="Rechercher..."
                    />
                  </div>
                </div>

                <!-- Filtre par statut -->
                <div>
                  <label class="block text-sm font-medium text-white mb-2">Statut de publication</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <select 
                      v-model="statusFilter" 
                      class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent appearance-none"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="published">Publiés</option>
                      <option value="draft">Brouillons</option>
                    </select>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>

                <!-- Filtre par expérience -->
                <div>
                  <label class="block text-sm font-medium text-white mb-2">Niveau d'expérience</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <select 
                      v-model="experienceFilter" 
                      class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent appearance-none"
                    >
                      <option value="">Toute expérience</option>
                      <option value="low">Faible (< 100 XP)</option>
                      <option value="medium">Moyenne (100-500 XP)</option>
                      <option value="high">Élevée (> 500 XP)</option>
                    </select>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Badges des filtres actifs et bouton reset -->
              <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-white border-opacity-30">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-medium text-white">Filtres actifs:</span>
                  
                  <!-- Badge recherche -->
                  <span v-if="searchTerm" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500 text-white">
                    Recherche: "{{ searchTerm }}"
                    <button @click="searchTerm = ''" class="ml-2 hover:text-blue-200">❌</button>
                  </span>
                  
                  <!-- Badge statut -->
                  <span v-if="statusFilter" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500 text-white">
                    Statut: {{ statusFilter === 'published' ? 'Publiés' : 'Brouillons' }}
                    <button @click="statusFilter = ''" class="ml-2 hover:text-green-200">❌</button>
                  </span>
                  
                  <!-- Badge XP -->
                  <span v-if="experienceFilter" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-400 text-gray-900">
                    XP: {{ experienceFilter === 'low' ? 'Faible' : experienceFilter === 'medium' ? 'Moyenne' : 'Élevée' }}
                    <button @click="experienceFilter = ''" class="ml-2 hover:text-gray-700">❌</button>
                  </span>
                  
                  <!-- Bouton reset -->
                  <button 
                    @click="resetFilters" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Réinitialiser tous les filtres
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Expérience (XP)</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Débloquages</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="filteredAchievements.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                      </svg>
                      <p class="text-lg font-medium">{{ hasActiveFilters ? 'Aucun succès ne correspond aux filtres' : 'Aucun succès pour le moment' }}</p>
                      <p class="text-sm mt-1">{{ hasActiveFilters ? 'Essayez de modifier vos critères de recherche' : 'Commencez par ajouter votre premier succès' }}</p>
                    </div>
                  </td>
                </tr>
                <tr v-for="achievement in filteredAchievements" :key="achievement.id" class="hover:bg-gray-50 transition-colors">
                  <!-- Nom -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span class="font-medium text-gray-900">{{ achievement.name }}</span>
                    </div>
                  </td>

                  <!-- Experience -->
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      {{ formatNumber(achievement.experience) }} XP
                    </span>
                  </td>

                  <!-- Statut -->
                  <td class="px-6 py-4">
                    <span 
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="achievement.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                    >
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <circle v-if="achievement.active" cx="12" cy="12" r="8"/>
                        <circle v-else cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ achievement.active ? 'Publié' : 'Brouillon' }}
                    </span>
                  </td>

                  <!-- Débloquages (placeholder pour futur) -->
                  <td class="px-6 py-4">
                    <span class="text-gray-500 text-sm">0 joueurs</span>
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4">
                    <div class="flex justify-end space-x-2">
                      <!-- Publier/Dépublier -->
                      <button 
                        @click="togglePublishStatus(achievement)" 
                        :title="achievement.active ? 'Dépublier' : 'Publier'"
                        class="p-2 rounded-lg transition-colors duration-200"
                        :class="achievement.active ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-100 hover:bg-green-200 text-green-700'"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path v-if="achievement.active" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>

                      <!-- Éditer -->
                      <button 
                        @click="handleEditAchievement(achievement)" 
                        class="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                        title="Éditer"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>

                      <!-- Supprimer -->
                      <button 
                        @click="confirmDelete(achievement)" 
                        class="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
                        title="Supprimer"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </main>

  <!-- Modal d'édition -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6 flex items-center justify-between">
        <h3 class="text-2xl font-bold text-white" style="font-family: 'Do Hyeon', sans-serif;">
          Éditer le succès
        </h3>
        <button @click="closeEditModal" class="text-white hover:text-yellow-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="saveEditAchievement" class="p-8">
        <div class="space-y-6">
          <!-- Nom -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nom du succès *
            </label>
            <input 
              v-model="editingAchievement.name" 
              type="text" 
              required
              minlength="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
            />
          </div>

          <!-- Experience -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Expérience (XP) *
            </label>
            <input 
              v-model.number="editingAchievement.experience" 
              type="number" 
              required
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4 mt-8">
          <button 
            type="button" 
            @click="closeEditModal" 
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            class="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de confirmation de suppression -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
      <!-- Header -->
      <div class="bg-gradient-to-r from-red-500 to-red-700 px-8 py-6">
        <h3 class="text-2xl font-bold text-white" style="font-family: 'Do Hyeon', sans-serif;">
          Confirmer la suppression
        </h3>
      </div>

      <!-- Content -->
      <div class="p-8">
        <p class="text-gray-700 mb-6">
          Êtes-vous sûr de vouloir supprimer le succès <strong>"{{ achievementToDelete?.name }}"</strong> ?
          Cette action est irréversible.
        </p>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <button 
            @click="closeDeleteModal" 
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            @click="executeDelete" 
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Composable pour gérer les achievements
const {
  achievements,
  loading,
  error,
  totalAchievements,
  activeAchievements,
  draftAchievements,
  totalXP,
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  publishAchievement,
  unpublishAchievement,
  formatDate,
  formatNumber
} = useAchievements()

// États locaux
const successMessage = ref('')
const showAddForm = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const achievementToDelete = ref(null)

// États pour les filtres
const showFilters = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const experienceFilter = ref('')

// Nouveau achievement
const newAchievement = ref({
  name: '',
  experience: null
})

// Achievement en édition
const editingAchievement = ref({
  id: null,
  name: '',
  experience: null
})

// Computed property pour les achievements filtrés
const filteredAchievements = computed(() => {
  let filtered = [...achievements.value]
  
  // Filtre par recherche de nom
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(search)
    )
  }
  
  // Filtre par statut
  if (statusFilter.value === 'published') {
    filtered = filtered.filter(a => a.active)
  } else if (statusFilter.value === 'draft') {
    filtered = filtered.filter(a => !a.active)
  }
  
  // Filtre par expérience
  if (experienceFilter.value === 'low') {
    filtered = filtered.filter(a => a.experience < 100)
  } else if (experienceFilter.value === 'medium') {
    filtered = filtered.filter(a => a.experience >= 100 && a.experience <= 500)
  } else if (experienceFilter.value === 'high') {
    filtered = filtered.filter(a => a.experience > 500)
  }
  
  return filtered
})

// Computed pour savoir si des filtres sont actifs
const hasActiveFilters = computed(() => {
  return searchTerm.value !== '' || statusFilter.value !== '' || experienceFilter.value !== ''
})

// Computed pour compter le nombre de filtres actifs
const activeFilterCount = computed(() => {
  let count = 0
  if (searchTerm.value) count++
  if (statusFilter.value) count++
  if (experienceFilter.value) count++
  return count
})

// Fonctions
const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  if (!showAddForm.value) {
    clearForm()
  }
}

const clearForm = () => {
  newAchievement.value = {
    name: '',
    experience: null
  }
  showAddForm.value = false
}

const resetFilters = () => {
  searchTerm.value = ''
  statusFilter.value = ''
  experienceFilter.value = ''
}

const addAchievement = async () => {
  try {
    await createAchievement(newAchievement.value)
    successMessage.value = 'Succès ajouté avec succès !'
    clearForm()
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    console.error('Erreur lors de l\'ajout:', err)
  }
}

const handleEditAchievement = (achievement) => {
  editingAchievement.value = {
    id: achievement.id,
    name: achievement.name,
    experience: achievement.experience
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingAchievement.value = {
    id: null,
    name: '',
    experience: null
  }
}

const saveEditAchievement = async () => {
  try {
    await updateAchievement(editingAchievement.value.id, {
      name: editingAchievement.value.name,
      experience: editingAchievement.value.experience
    })
    successMessage.value = 'Succès modifié avec succès !'
    closeEditModal()
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    console.error('Erreur lors de la modification:', err)
  }
}

const confirmDelete = (achievement) => {
  achievementToDelete.value = achievement
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  achievementToDelete.value = null
}

const executeDelete = async () => {
  if (!achievementToDelete.value) return
  
  try {
    await deleteAchievement(achievementToDelete.value.id)
    successMessage.value = 'Succès supprimé avec succès !'
    closeDeleteModal()
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    console.error('Erreur lors de la suppression:', err)
  }
}

const togglePublishStatus = async (achievement) => {
  try {
    if (achievement.active) {
      await unpublishAchievement(achievement.id)
      successMessage.value = 'Succès dépublié avec succès !'
    } else {
      await publishAchievement(achievement.id)
      successMessage.value = 'Succès publié avec succès !'
    }
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    console.error('Erreur lors du changement de statut:', err)
  }
}

const refreshData = async () => {
  await fetchAchievements()
}

// Charger les données au montage
onMounted(() => {
  fetchAchievements()
})

// Configuration de la page
definePageMeta({
  middleware: 'admin',
  title: 'Gestion des Succès - Urbex Chronicles'
})
</script>

<style scoped>
/* Styles additionnels si nécessaire */
</style>
