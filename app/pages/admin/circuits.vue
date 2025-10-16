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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Circuits</h1>
        
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="refresh" size="md" class="text-blue-500 mr-2 animate-spin" />
            <span class="text-blue-800">Chargement des circuits depuis Laravel API...</span>
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
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Total circuits -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.total }}</div>
              <div class="text-base lg:text-lg text-gray-600">Total circuits</div>
            </div>

            <!-- Circuits actifs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.active }}</div>
              <div class="text-base lg:text-lg text-gray-600">Circuits actifs</div>
            </div>

            <!-- Nouveaux circuits suggérés -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.new }}</div>
              <div class="text-base lg:text-lg text-gray-600">Nouveaux (7 jours)</div>
            </div>
          </div>
        </div>

        <!-- Add Circuit Section -->
        <div class="mb-12 flex-shrink-0">

          <!-- Formulaire Principal avec onglet déroulant -->
          <div class="bg-white mb-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Header cliquable -->
            <div 
              @click="toggleAddForm"
              class="bg-gradient-to-r from-blue-500 to-gray-800 px-8 py-6 cursor-pointer hover:from-blue-600 hover:to-gray-900 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                    <svg class="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Ajouter un nouveau circuit
                  </h2>
                  <p class="text-blue-100 mt-1">
                    Créez un nouveau circuit urbex avec ses informations et localisation
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
              <!-- Formulaire complet -->
              <div class="space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Colonne gauche - Informations générales -->
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"/>
                          </svg>
                          Nom du circuit
                        </span>
                      </label>
                      <input 
                        v-model="newCircuit.name"
                        type="text" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Ex: Circuit des châteaux abandonnés..."
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                          </svg>
                          Description
                        </span>
                      </label>
                      <textarea 
                        v-model="newCircuit.description"
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                        placeholder="Décrivez ce circuit urbex, ses points d'intérêt, son niveau de difficulté..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          Durée (minutes)
                        </span>
                      </label>
                      <input 
                        v-model="newCircuit.duration"
                        type="number" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Ex: 120"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                          Likes (nombre initial)
                        </span>
                      </label>
                      <input 
                        v-model="newCircuit.like"
                        type="number" 
                        min="0"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="0"
                      />
                    </div>
                    
                    <!-- Thumbnail (media, single image) -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          Image de couverture (optionnel)
                        </span>
                      </label>
                      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                           @click="openImageOverlay">
                        <div v-if="newCircuit.thumbnail">
                          <img v-if="newCircuit.thumbnail.url" :src="newCircuit.thumbnail.url" :alt="newCircuit.thumbnail.name" 
                               class="mx-auto h-20 w-20 object-cover rounded-lg mb-2">
                          <p class="text-sm text-green-600">✅ {{ newCircuit.thumbnail.name || 'Image sélectionnée' }}</p>
                        </div>
                        <div v-else>
                          <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <p class="text-sm text-gray-600">Cliquez pour ajouter une image</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Section Commentaires -->
                    <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        Commentaires (Component - repeatable)
                      </h3>
                      <p class="text-sm text-gray-600 mb-4">
                        Ajoutez des commentaires pour ce circuit
                      </p>
                      <div class="bg-white rounded-md p-3 border border-green-200">
                        <p class="text-sm text-gray-600 mb-2">
                          <span class="font-medium">{{ (newCircuit.comments || []).length }} commentaire(s)</span>
                        </p>
                        <div v-if="newCircuit.comments && newCircuit.comments.length > 0" class="space-y-2 max-h-32 overflow-y-auto">
                          <div v-for="(comment, index) in newCircuit.comments" :key="index" 
                               class="bg-gray-50 p-2 rounded text-sm flex justify-between items-start">
                            <div>
                              <strong>{{ comment.author || 'Anonyme' }}:</strong>
                              <span class="text-gray-600">{{ comment.content || comment.text || 'Pas de contenu' }}</span>
                            </div>
                            <button @click="removeComment(index)" 
                                    class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50 ml-2">
                              ✕
                            </button>
                          </div>
                        </div>
                        <p v-else class="text-sm text-gray-500 italic">
                          Aucun commentaire pour le moment
                        </p>
                        <button 
                          @click="addComment" 
                          class="mt-2 text-green-600 hover:text-green-800 text-sm underline">
                          + Ajouter un commentaire
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Colonne droite - Adresse et Commentaires -->
                  <div class="space-y-6">
                    <!-- Adresse Component -->
                    <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Adresse du circuit
                      </h3>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Rue</label>
                          <input 
                            v-model="newCircuit.address.street"
                            type="text" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="123 Rue de l'Urbex"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                          <input 
                            v-model="newCircuit.address.city"
                            type="text" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bruxelles"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                          <input 
                            v-model="newCircuit.address.zipCode"
                            type="text" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1000"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                          <input 
                            v-model="newCircuit.address.country"
                            type="text" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Belgique"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Section Missions -->
                    <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Missions associées
                      </h3>
                      <p class="text-sm text-gray-600 mb-4">
                        Sélectionnez les missions à associer à ce circuit (relation many-to-many)
                      </p>
                      <div class="bg-white rounded-md p-3 border border-green-200">
                        <!-- Indicateur de chargement des missions -->
                        <div v-if="missionsLoading" class="text-center py-4">
                          <svg class="mx-auto h-6 w-6 text-green-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                          </svg>
                          <p class="text-sm text-gray-600 mt-2">Chargement des missions...</p>
                        </div>
                        
                        <!-- Liste déroulante avec checkboxes pour une meilleure UX -->
                        <div v-else-if="availableMissions && availableMissions.length > 0">
                          <label class="block text-sm font-medium text-gray-700 mb-3">
                            Missions disponibles ({{ selectedMissionIds.length }} sélectionnée(s))
                          </label>
                          
                          <!-- Affichage sous forme de checkboxes -->
                          <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                            <div 
                              v-for="mission in availableMissions" 
                              :key="mission.id"
                              class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                              @click="toggleMissionSelection(mission.id)"
                            >
                              <input
                                type="checkbox"
                                :checked="selectedMissionIds.includes(mission.id)"
                                @change="toggleMissionSelection(mission.id)"
                                @click.stop
                                class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              />
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900">
                                  {{ mission.title || 'Mission sans titre' }}
                                </p>
                                <p class="text-xs text-gray-500 truncate">
                                  {{ mission.description || 'Pas de description' }}
                                </p>
                                <div class="flex items-center space-x-4 mt-1">
                                  <span v-if="mission.latitude && mission.longitude" class="inline-flex items-center text-xs text-gray-400">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    {{ parseFloat(mission.latitude).toFixed(4) }}, {{ parseFloat(mission.longitude).toFixed(4) }}
                                  </span>
                                  <span v-if="mission.questions && mission.questions.length > 0" class="inline-flex items-center text-xs text-blue-500">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ mission.questions.length }} question(s)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <!-- Actions rapides -->
                          <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                            <div class="text-xs text-gray-500">
                              {{ selectedMissionIds.length }} / {{ availableMissions.length }} missions sélectionnées
                            </div>
                            <div class="flex space-x-2">
                              <button 
                                @click="selectAllMissions"
                                type="button"
                                class="text-xs text-green-600 hover:text-green-800 underline"
                              >
                                Tout sélectionner
                              </button>
                              <button 
                                @click="clearMissionSelection"
                                type="button"
                                class="text-xs text-gray-600 hover:text-gray-800 underline"
                              >
                                Tout désélectionner
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Aucune mission disponible -->
                        <div v-else class="text-center py-8">
                          <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <p class="mt-2 text-sm text-gray-500">Aucune mission disponible</p>
                          <p class="text-xs text-gray-400 mb-3">Créez d'abord des missions dans l'onglet Missions</p>
                          
                          <!-- Boutons d'action -->
                          <div class="flex flex-col items-center space-y-2">
                            <nuxt-link 
                              to="/admin/missions" 
                              class="inline-flex items-center text-sm text-green-600 hover:text-green-800 underline"
                            >
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                              </svg>
                              Aller créer des missions
                            </nuxt-link>
                            
                            <!-- Bouton de rechargement -->
                            <button 
                              @click="reloadMissions"
                              type="button"
                              class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                              <svg class="w-4 h-4 mr-1 animate-spin" v-if="missionsLoading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                              </svg>
                              <svg class="w-4 h-4 mr-1" v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                              </svg>
                              Recharger les missions
                            </button>
                            
                            <!-- Debug info -->
                            <details class="mt-4 text-xs text-gray-400">
                              <summary class="cursor-pointer">Debug Info</summary>
                              <div class="mt-2 text-left bg-gray-100 p-2 rounded">
                                <p>Missions Loading: {{ missionsLoading }}</p>
                                <p>Available Missions: {{ availableMissions?.length || 0 }}</p>
                                <p>FetchMissions Function: {{ typeof fetchMissions }}</p>
                              </div>
                            </details>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Section Accessibilities (relation oneToMany) -->
                    <div class="bg-orange-50 rounded-lg p-6 border border-orange-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Accessibilités (relation oneToMany)
                      </h3>
                      <p class="text-sm text-gray-600 mb-4">
                        Informations d'accessibilité pour ce circuit
                      </p>
                      <div class="bg-white rounded-md p-3 border border-orange-200">
                        <!-- Affichage des accessibilités sélectionnées -->
                        <div v-if="newCircuit.accessibilities && newCircuit.accessibilities.length > 0" class="mb-3">
                          <p class="text-sm text-orange-800 font-medium mb-2">
                            {{ newCircuit.accessibilities.length }} accessibilité(s) configurée(s) :
                          </p>
                          <div class="space-y-2">
                            <div 
                              v-for="accessibility in newCircuit.accessibilities" 
                              :key="accessibility.id"
                              class="flex items-center justify-between bg-orange-100 p-2 rounded-md"
                            >
                              <div>
                                <span class="text-sm font-medium text-orange-900">{{ accessibility.name || accessibility.title }}</span>
                                <p class="text-xs text-orange-600">{{ accessibility.description }}</p>
                              </div>
                              <button 
                                @click="removeAccessibility(accessibility.id)"
                                class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                                title="Retirer cette accessibilité"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <p class="text-sm text-gray-500 italic">
                            0 accessibilité(s) configurée(s)
                          </p>
                        </div>
                        <button type="button" 
                                @click="configureAccessibilities"
                                class="mt-2 text-orange-600 hover:text-orange-800 text-sm underline">
                          + Configurer les accessibilités
                        </button>
                      </div>
                    </div>
                    
                    <!-- Section Achievement (relation oneToOne) -->
                    <div class="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                        Achievement lié (relation oneToOne)
                      </h3>
                      <p class="text-sm text-gray-600 mb-4">
                        Achievement débloqué en terminant ce circuit
                      </p>
                      <div class="bg-white rounded-md p-3 border border-yellow-200">
                        <div v-if="newCircuit.achievement">
                          <p class="text-sm text-yellow-800 font-medium">
                            🏆 {{ newCircuit.achievement.name || 'Achievement sélectionné' }}
                          </p>
                          <button type="button" 
                                  @click="newCircuit.achievement = null"
                                  class="mt-1 text-red-600 hover:text-red-800 text-xs underline">
                            Retirer l'achievement
                          </button>
                        </div>
                        <div v-else>
                          <p class="text-sm text-gray-500 italic">Aucun achievement sélectionné</p>
                          <button type="button" 
                                  @click="selectAchievement"
                                  class="mt-2 text-yellow-600 hover:text-yellow-800 text-sm underline">
                            + Sélectionner un achievement
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  
                  <!-- Actions -->
                  <div class="pt-6 border-t border-gray-100">
                    <div class="flex flex-col sm:flex-row gap-3">
                      <button
                        @click="handleCreateCircuit"
                        :disabled="!canCreateCircuit || loading"
                        :class="canCreateCircuit && !loading ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                        class="flex-1 px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                      >
                        <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        {{ loading ? 'Création...' : 'Créer le circuit' }}
                      </button>
                      <button
                        @click="clearForm"
                        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium flex items-center justify-center"
                      >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Réinitialiser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Circuits Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des circuits</h2>
            <div class="flex items-center space-x-4">
              <UiFilterOverlay
                page-title="les circuits"
                :filters="{ searchTerm, selectedDuration, selectedLikes, selectedThumbnail }"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateCircuitFilters"
                @reset="resetCircuitFilters"
              >
                <template #default="{ filters, updateFilter }">
                  <!-- Recherche -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher
                    </label>
                    <input
                      :value="filters.searchTerm"
                      @input="updateFilter('searchTerm', $event.target.value)"
                      type="text"
                      placeholder="Nom, description..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p class="text-xs text-gray-500 mt-1">Recherche dans nom et description</p>
                  </div>

                  <!-- Durée -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Durée (minutes)
                    </label>
                    <select
                      :value="filters.selectedDuration"
                      @change="updateFilter('selectedDuration', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Toutes les durées</option>
                      <option value="0-60">Courte (0-60 min)</option>
                      <option value="61-120">Moyenne (61-120 min)</option>
                      <option value="121-180">Longue (121-180 min)</option>
                      <option value="181+">Très longue (181+ min)</option>
                    </select>
                  </div>

                  <!-- Likes -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Popularité (likes)
                    </label>
                    <select
                      :value="filters.selectedLikes"
                      @change="updateFilter('selectedLikes', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous les niveaux</option>
                      <option value="0">Pas de likes (0)</option>
                      <option value="1-10">Peu populaire (1-10)</option>
                      <option value="11-50">Populaire (11-50)</option>
                      <option value="51+">Très populaire (51+)</option>
                    </select>
                  </div>

                  <!-- Thumbnail -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Image de couverture
                    </label>
                    <select
                      :value="filters.selectedThumbnail"
                      @change="updateFilter('selectedThumbnail', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous</option>
                      <option value="true">Avec image</option>
                      <option value="false">Sans image</option>
                    </select>
                  </div>
                </template>
              </UiFilterOverlay>
              <UiRefreshButton
                @click="refreshData"
                :loading="loading"
                variant="secondary"
                size="sm"
              />
            </div>
          </div>
          
          <!-- Résultats des filtres (si filtres actifs) -->
          <div v-if="activeFiltersCount > 0" class="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-md">
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-700">
                {{ filteredCircuits.length }} circuit(s) trouvé(s) sur {{ circuits.length }}
              </span>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid gap-4 text-base font-medium text-gray-700" style="grid-template-columns: 2fr 2.5fr 0.8fr 0.8fr 0.8fr 1fr 1fr 1.5fr;">
                <div>Nom</div>
                <div>Description</div>
                <div class="text-center">Durée</div>
                <div class="text-center">Likes</div>
                <div class="text-center">Image</div>
                <div class="text-center">Achieve.</div>
                <div class="text-center">Missions</div>
                <div class="text-center">Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Message si aucun circuit -->
              <div v-if="!loading && filteredCircuits.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <p class="mt-4 text-lg text-gray-500">{{ activeFiltersCount > 0 ? 'Aucun circuit ne correspond aux filtres' : 'Aucun circuit trouvé' }}</p>
                <p class="text-sm text-gray-400">{{ activeFiltersCount > 0 ? 'Essayez de modifier vos critères de recherche' : 'Créez votre premier circuit ou vérifiez votre connexion à l\'API Laravel' }}</p>
              </div>
              
              <!-- Liste des circuits -->
              <div 
                v-for="(circuit, index) in filteredCircuits" 
                :key="circuit.id || index"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid gap-4 items-center text-sm" style="grid-template-columns: 2fr 2.5fr 0.8fr 0.8fr 0.8fr 1fr 1fr 1.5fr;">
                  <!-- Nom (string) -->
                  <div class="text-gray-900 font-medium truncate">
                    {{ circuit.name || 'N/A' }}
                  </div>
                  
                  <!-- Description (text) -->
                  <div class="text-gray-600 truncate" :title="circuit.description">
                    {{ circuit.description ? (circuit.description.length > 80 ? circuit.description.substring(0, 80) + '...' : circuit.description) : 'Aucune description' }}
                  </div>
                  
                  <!-- Duration (biginteger) -->
                  <div class="text-gray-600 text-center text-sm">
                    {{ circuit.duration ? circuit.duration + ' min' : '-' }}
                  </div>
                  
                  <!-- Like (integer) -->
                  <div class="text-center">
                    <span class="text-red-500 font-medium">{{ circuit.like || 0 }}</span>
                  </div>
                  
                  <!-- Thumbnail (media, single image) -->
                  <div class="text-center">
                    <span v-if="circuit.thumbnail && circuit.thumbnail.url" 
                          class="inline-block w-6 h-6 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors"
                          @click="viewThumbnail(circuit.thumbnail)"
                          :title="'Voir l\'image: ' + (circuit.thumbnail.name || 'Image')">
                    </span>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                  
                  <!-- Achievement (relation oneToOne) -->
                  <div class="text-center">
                    <span v-if="circuit.achievement && circuit.achievement.id" 
                          class="bg-yellow-500 text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-yellow-600 transition-colors"
                          @click="viewAchievement(circuit.achievement)"
                          :title="'Achievement: ' + (circuit.achievement.name || 'Achievement')">
                      1
                    </span>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                  
                  <!-- Missions (component repeatable) -->
                  <div class="text-center">
                    <div v-if="circuit.missions && circuit.missions.length > 0" class="relative">
                      <!-- Bouton pour afficher le nombre de missions -->
                      <button
                        @click="toggleMissionsList(circuit.id)"
                        class="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        :class="{ 'bg-purple-200': showMissionsList[circuit.id] }"
                      >
                        <span class="font-medium">{{ circuit.missions.length }}</span>
                        <span>mission{{ circuit.missions.length > 1 ? 's' : '' }}</span>
                        <UiIcon 
                          name="close" 
                          size="md" 
                          class="transform transition-transform duration-200"
                          :class="{ 'rotate-180': showMissionsList[circuit.id] }"
                        />
                      </button>
                      
                      <!-- Liste des missions (dropdown) -->
                      <div 
                        v-if="showMissionsList[circuit.id]" 
                        class="absolute top-full left-0 mt-2 min-w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
                      >
                        <div class="p-2">
                          <div class="text-xs font-medium text-gray-500 mb-2 px-2">Missions associées :</div>
                          <div 
                            v-for="mission in circuit.missions" 
                            :key="mission.id"
                            class="flex items-center justify-between p-2 hover:bg-gray-50 rounded group"
                          >
                            <div class="flex-1">
                              <NuxtLink 
                                :to="'/admin/missions'"
                                class="text-purple-600 hover:text-purple-800 font-medium text-sm"
                                :title="'Voir la mission: ' + (mission.name || mission.title || `Mission ${mission.id}`)"
                                @click="closeMissionsList"
                              >
                                {{ mission.name || mission.title || `Mission ${mission.id}` }}
                              </NuxtLink>
                              <div class="text-xs text-gray-500">ID: {{ mission.id }}</div>
                            </div>
                            <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                @click="handleDetachMission(circuit.id, mission.id, mission.name || mission.title)"
                                class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                                :title="'Détacher la mission: ' + (mission.name || mission.title || `Mission ${mission.id}`)"
                              >
                                <UiIcon name="trash" size="md" />
                              </button>
                              <UiIcon name="eye" size="md" class="text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex items-center justify-center space-x-2">
                    <button
                      @click="handleEditCircuit(circuit)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1.5 rounded hover:bg-blue-50"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="md" />
                    </button>
                    <button
                      @click="handleDeleteCircuit(circuit)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-1.5 rounded hover:bg-red-50"
                      title="Supprimer"
                    >
                      <UiIcon name="trash" size="md" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
        
      </div>
    </div>
  </main>
  
  <!-- Modal de confirmation de suppression -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex items-center mb-4">
        <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
      </div>
      
      <p class="text-gray-600 mb-6">
        Êtes-vous sûr de vouloir supprimer le circuit 
        <span class="font-semibold">"{{ circuitToDelete?.name }}"</span> ? 
        Cette action est irréversible.
      </p>
      
      <div class="flex justify-end space-x-3">
        <button
          @click="showDeleteModal = false; circuitToDelete = null"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
  
  <!-- Modal d'ajout de spot -->
  <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Ajoutez votre spot</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input 
            v-model="modalSpot.nom"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom..."
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Région</label>
          <input 
            v-model="modalSpot.region"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Province, pays, ville..."
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="modalSpot.description"
            rows="3" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description..."
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
          <input 
            v-model="modalSpot.url"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Lien..."
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="mt-2 text-sm text-gray-600">Votre image</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            v-model="modalSpot.actif"
            type="checkbox" 
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label class="ml-2 block text-sm text-gray-900">Actif</label>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          @click="saveSpotFromModal"
          class="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay pour la sélection d'image -->
  <div v-if="showImageOverlay" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Sélectionner une image</h3>
        <button @click="closeImageOverlay" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <!-- Zone de drop pour upload -->
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <svg class="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="mt-4 text-lg text-gray-600">Glissez votre image ici</p>
          <p class="text-sm text-gray-500">ou</p>
          <button 
            @click="triggerFileUpload"
            class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Parcourir les fichiers
          </button>
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            @change="handleFileUpload" 
            class="hidden"
          />
        </div>
        
        <!-- Images récentes ou galerie -->
        <div>
          <h4 class="text-lg font-medium text-gray-900 mb-3">Images récentes</h4>
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="i in 8" 
              :key="i"
              @click="selectImage('image_' + i + '.jpg')"
              class="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeImageOverlay"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay pour la configuration d'URL -->
  <div v-if="showUrlOverlay" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Configurer l'URL</h3>
        <button @click="closeUrlOverlay" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL du spot</label>
          <input 
            v-model="tempUrl"
            type="url" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemple.com/spot"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Type de lien</label>
          <select 
            v-model="urlType"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="website">Site web</option>
            <option value="maps">Google Maps</option>
            <option value="video">Vidéo</option>
            <option value="article">Article</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description du lien</label>
          <input 
            v-model="urlDescription"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description optionnelle"
          />
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeUrlOverlay"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          @click="saveUrl(tempUrl)"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay pour afficher les commentaires d'un circuit -->
  <div v-if="showCommentsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900 flex items-center">
          <svg class="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Commentaires pour "{{ selectedCircuit?.name }}"
        </h3>
        <button @click="closeCommentsOverlay" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Comments Content -->
      <div class="p-6 overflow-y-auto max-h-96">
        <!-- S'il y a des commentaires -->
        <div v-if="selectedCircuit?.comments && selectedCircuit.comments.length > 0" class="space-y-4">
          <div 
            v-for="(comment, index) in selectedCircuit.comments" 
            :key="index"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">{{ comment.author.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">{{ comment.author }}</h4>
                  <p class="text-xs text-gray-500">Il y a quelques heures</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="editComment(selectedCircuit, index)"
                  class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                  title="Modifier le commentaire"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteComment(selectedCircuit, index)"
                  class="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                  title="Supprimer le commentaire"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed">{{ comment.content }}</p>
          </div>
        </div>

        <!-- S'il n'y a pas de commentaires -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <p class="mt-4 text-lg text-gray-500">Aucun commentaire</p>
          <p class="text-sm text-gray-400">Ce circuit n'a pas encore reçu de commentaires.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div class="text-sm text-gray-500">
          {{ selectedCircuit?.comments?.length || 0 }} commentaire(s) au total
        </div>
        <button
          @click="closeCommentsOverlay"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
  
  <!-- Modal d'édition de commentaire -->
  <div v-if="showEditCommentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-900">Modifier le commentaire</h3>
        <button @click="cancelEditComment" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Formulaire -->
      <div v-if="editingComment" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
          <input 
            v-model="editingComment.author"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom de l'auteur"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
          <textarea 
            v-model="editingComment.content"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contenu du commentaire"
          ></textarea>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="cancelEditComment"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="saveEditComment"
          :disabled="!editingComment?.content || !editingComment?.author"
          :class="editingComment?.content && editingComment?.author ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  </div>
  
  <!-- Modal d'édition de circuit -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Modifier le circuit</h3>
        <button @click="showEditModal = false; editingCircuit = null" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Formulaire d'édition -->
      <div v-if="editingCircuit" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Colonne gauche - Informations générales -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  Nom du circuit *
                </span>
              </label>
              <input 
                v-model="editingCircuit.name"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Ex: Circuit du Château abandonné"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                  </svg>
                  Description
                </span>
              </label>
              <textarea 
                v-model="editingCircuit.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                placeholder="Décrivez ce circuit urbex, ses points d'intérêt, son niveau de difficulté..."
              ></textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Durée (min)
                  </span>
                </label>
                <input 
                  v-model.number="editingCircuit.duration"
                  type="number" 
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="120"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    Likes
                  </span>
                </label>
                <input 
                  v-model.number="editingCircuit.like"
                  type="number" 
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="0"
                />
              </div>
            </div>
            
            
          </div>
          
          <!-- Colonne droite - Composants -->
          <div class="space-y-4">
            <!-- Component Address -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Adresse (Component)
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rue</label>
                  <input 
                    v-model="editingCircuit.address.street"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="123 Rue de l'Urbex"
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input 
                      v-model="editingCircuit.address.city"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Bruxelles"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <input 
                      v-model="editingCircuit.address.zipCode"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="1000"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <input 
                    v-model="editingCircuit.address.country"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Belgique"
                  />
                </div>
              </div>
            </div>
            
            <!-- Component Missions (repeatable) -->
            <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Missions associées
              </h4>
              <div class="bg-white rounded-md p-3 border border-purple-200">
                <!-- Indicateur de chargement des missions -->
                <div v-if="missionsLoading" class="text-center py-4">
                  <svg class="mx-auto h-6 w-6 text-purple-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <p class="text-sm text-gray-600 mt-2">Chargement des missions...</p>
                </div>
                
                <!-- Liste avec checkboxes pour l'édition -->
                <div v-else-if="availableMissions && availableMissions.length > 0">
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    Missions disponibles ({{ editingCircuitMissionIds.length }} sélectionnée(s))
                  </label>
                  
                  <!-- Affichage sous forme de checkboxes -->
                  <div class="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-3">
                    <div 
                      v-for="mission in availableMissions" 
                      :key="mission.id"
                      class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      @click="toggleEditingMissionSelection(mission.id)"
                    >
                      <input
                        type="checkbox"
                        :checked="editingCircuitMissionIds.includes(mission.id)"
                        @change="toggleEditingMissionSelection(mission.id)"
                        @click.stop
                        class="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">
                          {{ mission.title || 'Mission sans titre' }}
                        </p>
                        <p class="text-xs text-gray-500 truncate">
                          {{ mission.description || 'Pas de description' }}
                        </p>
                        <div class="flex items-center space-x-4 mt-1">
                          <span v-if="mission.latitude && mission.longitude" class="inline-flex items-center text-xs text-gray-400">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {{ parseFloat(mission.latitude).toFixed(4) }}, {{ parseFloat(mission.longitude).toFixed(4) }}
                          </span>
                          <span v-if="mission.questions && mission.questions.length > 0" class="inline-flex items-center text-xs text-blue-500">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {{ mission.questions.length }} question(s)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Actions rapides pour l'édition -->
                  <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <div class="text-xs text-gray-500">
                      {{ editingCircuitMissionIds.length }} / {{ availableMissions.length }} missions sélectionnées
                    </div>
                    <div class="flex space-x-2">
                      <button 
                        @click="selectAllEditingMissions"
                        type="button"
                        class="text-xs text-purple-600 hover:text-purple-800 underline"
                      >
                        Tout sélectionner
                      </button>
                      <button 
                        @click="clearEditingMissionSelection"
                        type="button"
                        class="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Tout désélectionner
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Aucune mission disponible -->
                <div v-else class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Aucune mission disponible</p>
                  <p class="text-xs text-gray-400 mb-3">Créez d'abord des missions dans l'onglet Missions</p>
                  <nuxt-link 
                    to="/admin/missions" 
                    class="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 underline"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Aller créer des missions
                  </nuxt-link>
                </div>
              </div>
            </div>
            
            <!-- Component Comments (repeatable) -->
            <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Commentaires (Component - repeatable)
              </h4>
              <div class="bg-white rounded-md p-3 border border-yellow-200">
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">{{ (editingCircuit.comments || []).length }} commentaire(s)</span>
                </p>
                <div v-if="editingCircuit.comments && editingCircuit.comments.length > 0" class="space-y-2 max-h-32 overflow-y-auto">
                  <div v-for="(comment, index) in editingCircuit.comments" :key="index" 
                       class="bg-gray-50 p-2 rounded text-sm flex justify-between items-start">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2 mb-1">
                        <strong class="text-gray-900">{{ comment.author || 'Anonyme' }}:</strong>
                        <button 
                          @click="editComment(editingCircuit, index)"
                          class="text-blue-600 hover:text-blue-800 text-xs underline">
                          Modifier
                        </button>
                        <button 
                          @click="deleteComment(editingCircuit, index)"
                          class="text-red-600 hover:text-red-800 text-xs underline">
                          Supprimer
                        </button>
                      </div>
                      <span class="text-gray-600">{{ comment.content || comment.text || 'Pas de contenu' }}</span>
                    </div>
                  </div>
                </div>
                <p v-else class="text-sm text-gray-500 italic">
                  Aucun commentaire pour le moment
                </p>
                <button 
                  @click="addCommentToEditingCircuit" 
                  class="mt-2 text-yellow-600 hover:text-yellow-800 text-sm underline">
                  + Ajouter un commentaire
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="showEditModal = false; editingCircuit = null"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            @click="saveEditCircuit"
            :disabled="!editingCircuit.name"
            :class="editingCircuit.name ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
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
  
  <!-- Modal de sélection d'achievement -->
  <div v-if="showAchievementModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-yellow-50 px-6 py-4 border-b border-yellow-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900 flex items-center">
          <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
          Sélectionner un achievement
        </h3>
        <button @click="closeAchievementModal" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Contenu de la modal -->
      <div class="p-6 overflow-y-auto max-h-96">
        <!-- Indicateur de chargement des achievements -->
        <div v-if="achievementsLoading" class="text-center py-8">
          <svg class="mx-auto h-8 w-8 text-yellow-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <p class="text-sm text-gray-600 mt-2">Chargement des achievements...</p>
        </div>
        
        <!-- Liste des achievements disponibles -->
        <div v-else-if="availableAchievements && availableAchievements.length > 0" class="space-y-3">
          <div 
            v-for="achievement in availableAchievements" 
            :key="achievement.id"
            @click="selectAchievementFromModal(achievement)"
            class="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer transition-all duration-200"
            :class="{ 'border-yellow-300 bg-yellow-50': selectedAchievementId === achievement.id }"
          >
            <div class="flex items-start space-x-3">
              <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-lg">🏆</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-semibold text-gray-900">
                  {{ achievement.name || achievement.title || 'Achievement sans nom' }}
                </h4>
                <p class="text-sm text-gray-600 mt-1">
                  {{ achievement.description || 'Pas de description disponible' }}
                </p>
                <div class="flex items-center space-x-4 mt-2">
                  <span class="inline-flex items-center text-sm text-yellow-600">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    {{ achievement.experience || achievement.xpReward || 0 }} XP
                  </span>
                  <span v-if="achievement.active !== false" class="inline-flex items-center text-xs text-green-600">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Actif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Aucun achievement disponible -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
          <p class="mt-4 text-lg text-gray-500">Aucun achievement disponible</p>
          <p class="text-sm text-gray-400 mb-4">Créez d'abord des achievements dans l'onglet Succès</p>
          
          <!-- Boutons d'action -->
          <div class="flex flex-col items-center space-y-2">
            <nuxt-link 
              to="/admin/success" 
              class="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-800 underline"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Aller créer des achievements
            </nuxt-link>
            
            <!-- Bouton de rechargement -->
            <button 
              @click="reloadAchievements"
              type="button"
              class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
            >
              <svg class="w-4 h-4 mr-1" :class="{ 'animate-spin': achievementsLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Recharger les achievements
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div class="text-sm text-gray-500">
          Sélectionnez l'achievement qui sera débloqué en terminant ce circuit
        </div>
        <button
          @click="closeAchievementModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
  
  <!-- Modal de configuration des accessibilités -->
  <div v-if="showAccessibilityModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-orange-50 px-6 py-4 border-b border-orange-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900 flex items-center">
          <svg class="w-6 h-6 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          Configurer les accessibilités
        </h3>
        <button @click="closeAccessibilityModal" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Contenu de la modal -->
      <div class="p-6 overflow-y-auto max-h-96">
        <!-- Indicateur de chargement des accessibilités -->
        <div v-if="accessibilitiesLoading" class="text-center py-8">
          <svg class="mx-auto h-8 w-8 text-orange-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <p class="text-sm text-gray-600 mt-2">Chargement des accessibilités...</p>
        </div>
        
        <!-- Liste des accessibilités disponibles avec checkboxes -->
        <div v-else-if="availableAccessibilities && availableAccessibilities.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-4">
            Accessibilités disponibles ({{ selectedAccessibilityIds.length }} sélectionnée(s))
          </label>
          
          <!-- Affichage sous forme de checkboxes -->
          <div class="space-y-3">
            <div 
              v-for="accessibility in availableAccessibilities" 
              :key="accessibility.id"
              class="flex items-start space-x-3 p-3 hover:bg-orange-50 rounded-md cursor-pointer border border-gray-200"
              @click="toggleAccessibilitySelection(accessibility.id)"
            >
              <input
                type="checkbox"
                :checked="selectedAccessibilityIds.includes(accessibility.id)"
                @change="toggleAccessibilitySelection(accessibility.id)"
                @click.stop
                class="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-sm">♿</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ accessibility.name || accessibility.title || 'Accessibilité sans nom' }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ accessibility.description || 'Pas de description' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions rapides -->
          <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div class="text-xs text-gray-500">
              {{ selectedAccessibilityIds.length }} / {{ availableAccessibilities.length }} accessibilités sélectionnées
            </div>
            <div class="flex space-x-2">
              <button 
                @click="selectAllAccessibilities"
                type="button"
                class="text-xs text-orange-600 hover:text-orange-800 underline"
              >
                Tout sélectionner
              </button>
              <button 
                @click="clearAccessibilitySelection"
                type="button"
                class="text-xs text-gray-600 hover:text-gray-800 underline"
              >
                Tout désélectionner
              </button>
            </div>
          </div>
        </div>
        
        <!-- Aucune accessibilité disponible -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <p class="mt-4 text-lg text-gray-500">Aucune accessibilité disponible</p>
          <p class="text-sm text-gray-400 mb-4">Les accessibilités doivent être créées via l'API Laravel</p>
          
          <!-- Bouton de rechargement -->
          <button 
            @click="reloadAccessibilities"
            type="button"
            class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
          >
            <svg class="w-4 h-4 mr-1" :class="{ 'animate-spin': accessibilitiesLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Recharger les accessibilités
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div class="text-sm text-gray-500">
          {{ selectedAccessibilityIds.length }} accessibilité(s) sélectionnée(s)
        </div>
        <div class="flex space-x-3">
          <button
            @click="closeAccessibilityModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="saveAccessibilityConfiguration"
            class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Circuits Urbex'
})

// Head configuration
useHead({
  title: 'Circuits Urbex',
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

// Composable pour les circuits dynamiques avec Strapi
const {
  circuits,
  loading,
  error,
  totalCircuits,
  activeCircuits,
  newCircuitsSuggested,
  fetchCircuits,
  createCircuit,
  updateCircuit,
  deleteCircuit,
  formatDate,
  formatDuration,
  getCircuitAddress,
  testConnection
} = useCircuits()

// Composable pour les missions (pour la sélection) - Importation explicite
let availableMissions = ref([])
let missionsLoading = ref(false)
let fetchMissions = null

// Composable pour les achievements (pour la sélection) - Importation explicite
let availableAchievements = ref([])
let achievementsLoading = ref(false)
let fetchAchievements = null

// Composable pour les accessibilités (pour la sélection) - Importation explicite
let availableAccessibilities = ref([])
let accessibilitiesLoading = ref(false)
let fetchAccessibilities = null

// Initialiser les composables de manière asynchrone
onMounted(async () => {
  // Initialiser le composable missions
  try {
    console.log('🔄 Initialisation du composable missions...')
    const missionsComposable = await useMissions()
    
    // Assigner les fonctions et variables
    availableMissions = missionsComposable.missions
    missionsLoading = missionsComposable.loading
    fetchMissions = missionsComposable.fetchMissions
    
    console.log('✅ Composable missions initialisé')
    
    // Charger les missions immédiatement
    if (fetchMissions) {
      console.log('🚀 Chargement des missions...')
      await fetchMissions()
      console.log('✅ Missions chargées:', availableMissions.value?.length || 0)
      console.log('📋 Missions disponibles:', availableMissions.value)
    }
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation des missions:', err)
    // Fallback: créer des missions de test pour le développement
    availableMissions.value = [
      {
        id: 1,
        title: 'Mission Test 1',
        description: 'Description de la mission test 1',
        latitude: 50.4930,
        longitude: 4.4680,
        questions: [{ id: 1, title: 'Question test' }]
      },
      {
        id: 2,
        title: 'Mission Test 2',
        description: 'Description de la mission test 2',
        latitude: 50.4925,
        longitude: 4.4678,
        questions: [{ id: 2, title: 'Question test 2' }]
      }
    ]
    console.log('⚠️ Utilisation des missions de test')
  }

  // Initialiser le composable achievements
  try {
    console.log('🔄 Initialisation du composable achievements...')
    const achievementsComposable = await useAchievements()
    
    // Assigner les fonctions et variables
    availableAchievements = achievementsComposable.achievements
    achievementsLoading = achievementsComposable.loading
    fetchAchievements = achievementsComposable.fetchAchievements
    
    console.log('✅ Composable achievements initialisé')
    
    // Charger les achievements immédiatement
    if (fetchAchievements) {
      console.log('🚀 Chargement des achievements...')
      await fetchAchievements()
      console.log('✅ Achievements chargés:', availableAchievements.value?.length || 0)
      console.log('🏆 Achievements disponibles:', availableAchievements.value)
    }
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation des achievements:', err)
    // Fallback: créer des achievements de test pour le développement
    availableAchievements.value = [
      {
        id: 1,
        name: 'Premier Circuit',
        title: 'Premier Circuit',
        experience: 100,
        description: 'Terminer votre premier circuit urbex'
      },
      {
        id: 2,
        name: 'Explorateur Confirmé',
        title: 'Explorateur Confirmé',
        experience: 250,
        description: 'Terminer 5 circuits urbex'
      }
    ]
    console.log('⚠️ Utilisation des achievements de test')
  }

  // Initialiser le composable accessibilités
  try {
    console.log('🔄 Initialisation du composable accessibilités...')
    const accessibilitiesComposable = await useAccessibilities()
    
    // Assigner les fonctions et variables
    availableAccessibilities = accessibilitiesComposable.accessibilities
    accessibilitiesLoading = accessibilitiesComposable.loading
    fetchAccessibilities = accessibilitiesComposable.fetchAccessibilities
    
    console.log('✅ Composable accessibilités initialisé')
    
    // Charger les accessibilités immédiatement
    if (fetchAccessibilities) {
      console.log('🚀 Chargement des accessibilités...')
      await fetchAccessibilities()
      console.log('✅ Accessibilités chargées:', availableAccessibilities.value?.length || 0)
      console.log('♿ Accessibilités disponibles:', availableAccessibilities.value)
    }
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation des accessibilités:', err)
    // Fallback: créer des accessibilités de test pour le développement
    availableAccessibilities.value = [
      {
        id: 1,
        name: 'Accès facile',
        title: 'Accès facile',
        description: 'Accessible aux débutants'
      },
      {
        id: 2,
        name: 'Accès modéré',
        title: 'Accès modéré',
        description: 'Nécessite une bonne condition physique'
      },
      {
        id: 3,
        name: 'Accès difficile',
        title: 'Accès difficile',
        description: 'Réservé aux explorateurs expérimentés'
      }
    ]
    console.log('⚠️ Utilisation des accessibilités de test')
  }
  
  // Charger les circuits
  console.log('🚀 Chargement des circuits...')
  try {
    await fetchCircuits()
    console.log('✅ Circuits chargés:', circuits.value?.length || 0)
  } catch (err) {
    console.warn('Erreur lors de fetchCircuits:', err)
  }
  
  // Ajouter l'événement pour fermer les listes quand on clique ailleurs
  document.addEventListener('click', handleClickOutside)
})

// Nettoyage lors de la destruction du composant
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// États locaux pour l'interface
const showAddForm = ref(false)
const selectedCircuit = ref(null)
const showDeleteModal = ref(false)
const circuitToDelete = ref(null)
const editingCircuit = ref(null)
const showEditModal = ref(false)
const successMessage = ref('')
const refreshing = ref(false)

// État pour gérer l'affichage des listes de missions
const showMissionsList = ref({})

// Variables de filtrage pour circuits
const searchTerm = ref('')
const selectedDuration = ref('')
const selectedLikes = ref('')
const selectedThumbnail = ref('')

// État pour la dernière mise à jour
const lastUpdated = ref(new Date())

// États réactifs pour le formulaire selon le schema.json exact
const newCircuit = ref({
  // Champs de base du schema
  name: '',                    // string
  description: '',             // text
  duration: 60,                // biginteger
  like: 0,                     // integer (min: 0)
  
  // Media fields
  thumbnail: null,             // media, single image, non required
  
  // Relations
  missions: [],                // relation oneToMany vers api::mission.mission
  accessibilities: [],         // relation oneToMany vers api::accessibility.accessibility
  achievement: null,           // relation oneToOne vers api::achievement.achievement
  
  // Components
  comments: [],                // component comment.comment (repeatable)
  
  // Legacy fields (to keep compatibility)
  address: {
    street: '',
    city: '',
    zipCode: '',
    country: 'Belgique'
  },
  Missions: []                 // Kept for backward compatibility
})

// États pour les modals
const showAddModal = ref(false)
const showImageOverlay = ref(false)
const showUrlOverlay = ref(false)
const showCommentsModal = ref(false)
const showEditCommentModal = ref(false)
const tempUrl = ref('')
const urlType = ref('website')
const urlDescription = ref('')
const modalSpot = ref({
  nom: '',
  region: '',
  description: '',
  url: ''
})

// États pour l'édition de commentaires
const editingComment = ref(null)
const editingCommentIndex = ref(-1)
const editingCommentCircuit = ref(null)

// États pour la sélection des missions
const selectedMissionIds = ref([])

// États pour la sélection des achievements
const showAchievementModal = ref(false)
const selectedAchievementId = ref(null)

// États pour la configuration des accessibilités
const showAccessibilityModal = ref(false)
const selectedAccessibilityIds = ref([])

// États pour l'édition de circuit avec missions
const editingCircuitMissionIds = ref([])

// États pour l'édition de circuit avec achievements
const editingCircuitAchievementId = ref(null)

// États pour l'édition de circuit avec accessibilités
const editingCircuitAccessibilityIds = ref([])

// Fonctions de gestion des missions
const toggleMissionSelection = (missionId) => {
  const index = selectedMissionIds.value.indexOf(missionId)
  if (index > -1) {
    selectedMissionIds.value.splice(index, 1)
  } else {
    selectedMissionIds.value.push(missionId)
  }
}

const selectAllMissions = () => {
  selectedMissionIds.value = availableMissions.value?.map(mission => mission.id) || []
}

const clearMissionSelection = () => {
  selectedMissionIds.value = []
}

// Fonctions pour la gestion des missions dans l'édition
const toggleEditingMissionSelection = (missionId) => {
  const index = editingCircuitMissionIds.value.indexOf(missionId)
  if (index > -1) {
    editingCircuitMissionIds.value.splice(index, 1)
  } else {
    editingCircuitMissionIds.value.push(missionId)
  }
}

const selectAllEditingMissions = () => {
  editingCircuitMissionIds.value = availableMissions.value?.map(mission => mission.id) || []
}

const clearEditingMissionSelection = () => {
  editingCircuitMissionIds.value = []
}

// Fonction pour recharger les missions manuellement
const reloadMissions = async () => {
  console.log('🔄 Rechargement manuel des missions...')
  missionsLoading.value = true
  
  try {
    if (fetchMissions) {
      await fetchMissions()
      console.log('✅ Missions rechargées:', availableMissions.value?.length || 0)
      console.log('📋 Données missions:', availableMissions.value)
    } else {
      console.warn('⚠️ fetchMissions non disponible - Test direct de l\'API')
      await testDirectApiCall()
    }
  } catch (err) {
    console.error('❌ Erreur lors du rechargement:', err)
    console.log('🔄 Tentative d\'appel direct à l\'API...')
    await testDirectApiCall()
  } finally {
    missionsLoading.value = false
  }
}

// Fonction pour tester directement l'API
const testDirectApiCall = async () => {
  try {
    console.log('🧪 Test direct de l\'API Laravel...')
    
    // Test avec fetch simple
    const baseUrl = 'http://127.0.0.1:8000' // URL de l'API Laravel
    const response = await fetch(`${baseUrl}/api/missions`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    console.log('📡 Statut de la réponse:', response.status)
    console.log('📡 Headers:', Object.fromEntries(response.headers.entries()))
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Données reçues:', data)
      
      // Extraire les missions selon la structure Laravel
      const missions = data.missions || data.data || data
      if (Array.isArray(missions)) {
        availableMissions.value = missions
        console.log(`✅ ${missions.length} missions chargées directement`)
        showSuccessMessage(`${missions.length} missions chargées avec succès !`)
      } else {
        console.warn('⚠️ Format de données inattendu:', data)
      }
    } else {
      const errorText = await response.text()
      console.error('❌ Erreur API:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
  } catch (error) {
    console.error('❌ Erreur lors du test direct:', error)
    showErrorMessage('Impossible de charger les missions: ' + error.message)
    
    // Fallback avec des données de test
    console.log('🔧 Utilisation de données de test...')
    availableMissions.value = [
      {
        id: 1,
        title: 'Mission de Test 1',
        description: 'Mission de développement pour tester l\'interface',
        latitude: 50.4930,
        longitude: 4.4680,
        threshold: 100,
        hint: 'Ceci est une mission de test',
        questions: [
          { id: 1, title: 'Question test 1', type: 'qcm' }
        ]
      },
      {
        id: 2,
        title: 'Mission de Test 2', 
        description: 'Deuxième mission de test',
        latitude: 50.4925,
        longitude: 4.4678,
        threshold: 50,
        hint: 'Autre mission de test',
        questions: [
          { id: 2, title: 'Question test 2', type: 'enigme' }
        ]
      }
    ]
    showSuccessMessage('Missions de test chargées (mode développement)')
  }
}

// Référence pour l'input file
const fileInput = ref(null)

// Fonction pour basculer l'affichage du formulaire
const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  if (showAddForm.value) {
    resetForm()
  }
}

// Réinitialiser le formulaire selon le schema.json
const resetForm = () => {
  newCircuit.value = {
    // Champs de base du schema
    name: '',                    // string
    description: '',             // text
    duration: 60,                // biginteger
    like: 0,                     // integer (min: 0)
    
    // Media fields
    thumbnail: null,             // media, single image, non required
    
    // Relations
    missions: [],                // relation oneToMany vers api::mission.mission
    accessibilities: [],         // relation oneToMany vers api::accessibility.accessibility
    achievement: null,           // relation oneToOne vers api::achievement.achievement
    
    // Components
    comments: [],                // component comment.comment (repeatable)
    
    // Legacy fields (to keep compatibility)
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: 'Belgique'
    },
    Missions: []                 // Kept for backward compatibility
  }
  
  // Réinitialiser la sélection des missions
  selectedMissionIds.value = []
}

// Validation simple pour la création
const canCreateCircuit = computed(() => {
  return newCircuit.value.name && newCircuit.value.description && newCircuit.value.address.city
})

// Circuits filtrés selon les critères de recherche
const filteredCircuits = computed(() => {
  // Guard: circuits may be undefined during SSR or before composable initialization
  const base = Array.isArray(circuits?.value) ? circuits.value : []
  let filtered = base.slice()

  // Filtre de recherche (nom, description)
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(circuit => 
      circuit.name?.toLowerCase().includes(search) ||
      circuit.description?.toLowerCase().includes(search)
    )
  }

  // Filtre par durée
  if (selectedDuration.value) {
    const durationValue = selectedDuration.value
    filtered = filtered.filter(circuit => {
      const duration = parseInt(circuit.duration) || 0
      switch (durationValue) {
        case '0-60': return duration >= 0 && duration <= 60
        case '61-120': return duration >= 61 && duration <= 120
        case '121-180': return duration >= 121 && duration <= 180
        case '181+': return duration >= 181
        default: return true
      }
    })
  }

  // Filtre par likes
  if (selectedLikes.value) {
    const likesValue = selectedLikes.value
    filtered = filtered.filter(circuit => {
      const likes = parseInt(circuit.like) || 0
      switch (likesValue) {
        case '0': return likes === 0
        case '1-10': return likes >= 1 && likes <= 10
        case '11-50': return likes >= 11 && likes <= 50
        case '51+': return likes >= 51
        default: return true
      }
    })
  }

  // Filtre par présence de thumbnail
  if (selectedThumbnail.value !== '') {
    const hasThumbnail = selectedThumbnail.value === 'true'
    if (hasThumbnail) {
      filtered = filtered.filter(circuit => circuit.thumbnail && circuit.thumbnail.url)
    } else {
      filtered = filtered.filter(circuit => !circuit.thumbnail || !circuit.thumbnail.url)
    }
  }

  return filtered
})

// Nombre de filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (searchTerm.value) count++
  if (selectedDuration.value) count++
  if (selectedLikes.value) count++
  if (selectedThumbnail.value) count++
  return count
})

// Fonctions pour la gestion dynamique des circuits
const handleCreateCircuit = async () => {
  try {
    // Préparer les données du circuit avec les missions sélectionnées
    const circuitData = {
      name: newCircuit.value.name,
      description: newCircuit.value.description,
      duration: newCircuit.value.duration,
      like: newCircuit.value.like || 0,
      thumbnail: newCircuit.value.thumbnail,
      // Utiliser mission_ids pour Laravel (Many-to-Many)
      mission_ids: selectedMissionIds.value,
      // Autres relations possibles
      achievement_id: newCircuit.value.achievement?.id || null,
      accessibility_ids: (newCircuit.value.accessibilities || []).map(a => a.id)
    }
    
    console.log('🚀 Création circuit avec données:', circuitData)
    
    await createCircuit(circuitData)
    showSuccessMessage('Circuit créé avec succès !')
    resetForm()
    showAddForm.value = false
    // Rafraîchir la liste
    await fetchCircuits()
  } catch (err) {
    console.error('Erreur lors de la création:', err)
    showSuccessMessage(err.message || 'Erreur lors de la création du circuit', 'error')
  }
}

const handleDeleteCircuit = async (circuit) => {
  circuitToDelete.value = circuit
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (circuitToDelete.value) {
    // Utiliser l'id pour Laravel
    const success = await deleteCircuit(circuitToDelete.value.id)
    if (success) {
      showSuccessMessage('Circuit supprimé avec succès !')
    } else if (error.value) {
      // Afficher l'erreur comme message d'erreur
      showSuccessMessage(error.value, 'error')
      // Réinitialiser l'erreur après 5 secondes
      setTimeout(() => {
        error.value = null
      }, 5000)
    }
    showDeleteModal.value = false
    circuitToDelete.value = null
  }
}

const handleEditCircuit = (circuit) => {
  // Cloner le circuit avec initialisation des objets manquants selon le schéma Strapi
  editingCircuit.value = { 
    ...circuit,
    // S'assurer que l'adresse existe (component address)
    address: circuit.address || {
      street: '',
      city: '',
      zipCode: '',
      country: 'Belgique'
    },
    // S'assurer que les missions existent (component mission repeatable)
    Missions: circuit.missions || [],
    // S'assurer que les commentaires existent (component comment repeatable)
    comments: circuit.comments || [],
    
    // S'assurer que les champs obligatoires sont présents
    name: circuit.name || '',
    description: circuit.description || '',
    duration: circuit.duration || null,
    like: circuit.like || 0
  }
  
  // Initialiser les missions sélectionnées pour l'édition
  editingCircuitMissionIds.value = (circuit.missions || []).map(mission => mission.id).filter(Boolean)
  
  showEditModal.value = true
}

// Fonction pour supprimer une mission (component repeatable)
const removeMission = (index) => {
  if (editingCircuit.value.Missions && editingCircuit.value.Missions.length > index) {
    editingCircuit.value.Missions.splice(index, 1)
  }
}

// Fonction pour ajouter une mission (component repeatable)
const addMission = () => {
  if (!editingCircuit.value.Missions) {
    editingCircuit.value.Missions = []
  }
  // Ajouter une mission vide selon le schema du component mission
  editingCircuit.value.Missions.push({
    name: '',
    description: '',
    type: '',
    difficulty: '',
    points: 0
  })
}

const saveEditCircuit = async () => {
  try {
    if (!editingCircuit.value.name) {
      showErrorMessage('Le nom du circuit est obligatoire')
      return
    }

    loading.value = true
    
    // Préparer les données selon le schéma Laravel
    const updateData = {
      name: editingCircuit.value.name,
      description: editingCircuit.value.description || '',
      duration: editingCircuit.value.duration ? parseInt(editingCircuit.value.duration) : null,
      like: editingCircuit.value.like ? parseInt(editingCircuit.value.like) : 0,
      thumbnail: editingCircuit.value.thumbnail || null,
      // Utiliser mission_ids pour Laravel (Many-to-Many)
      mission_ids: editingCircuitMissionIds.value,
      // Autres relations possibles
      achievement_id: editingCircuit.value.achievement?.id || null,
      accessibility_ids: (editingCircuit.value.accessibilities || []).map(a => a.id)
    }

    console.log('💾 Sauvegarde des données circuit selon schéma Laravel:', updateData)
    
    // Utiliser l'id pour Laravel
    await updateCircuit(editingCircuit.value.id, updateData)
    
    showSuccessMessage('✅ Circuit mis à jour avec succès !')
    showEditModal.value = false
    editingCircuit.value = null
    
    // Réinitialiser les missions sélectionnées pour l'édition
    editingCircuitMissionIds.value = []
    
    // Recharger la liste des circuits
    await fetchCircuits()
    
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour:', err)
    showErrorMessage(`Erreur lors de la mise à jour: ${err.message}`)
  } finally {
    loading.value = false
  }
}

// Fonction pour afficher un message de succès
const showSuccessMessage = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// Fonction pour afficher un message d'erreur
const showErrorMessage = (message) => {
  error.value = message
  setTimeout(() => {
    error.value = ''
  }, 5000)
}

// Fonction pour rafraîchir les données
const refreshData = async () => {
  refreshing.value = true
  await fetchCircuits()
  lastUpdated.value = new Date()
  refreshing.value = false
  showSuccessMessage('Données rafraîchies !')
}

// Statistiques calculées (defensive: fall back to computing from circuits if composable values are not ready)
const stats = computed(() => {
  const base = Array.isArray(circuits?.value) ? circuits.value : []

  const total = (typeof totalCircuits !== 'undefined' && totalCircuits && typeof totalCircuits.value !== 'undefined')
    ? totalCircuits.value
    : base.length

  const active = (typeof activeCircuits !== 'undefined' && activeCircuits && typeof activeCircuits.value !== 'undefined')
    ? activeCircuits.value
    : base.length // Pour l'instant, tous les circuits sont considérés comme actifs

  // Utiliser directement newCircuitsSuggested du composable qui calcule les circuits des 7 derniers jours
  const nw = (typeof newCircuitsSuggested !== 'undefined' && newCircuitsSuggested && typeof newCircuitsSuggested.value !== 'undefined')
    ? newCircuitsSuggested.value
    : (() => {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return base.filter(c => {
        // Laravel utilise 'created_at' au format ISO
        if (!c.created_at) return false
        const circuitDate = new Date(c.created_at)
        return circuitDate >= sevenDaysAgo
      }).length
    })()

  return { total, active, new: nw }
})

// Fonctions anciennes pour compatibilité (modifiées)
const addCircuit = () => {
  showAddModal.value = true
}

const clearForm = () => {
  resetForm()
}

// Fonction wrapper pour createCircuit
const createCircuitOld = () => {
  if (canCreateCircuit.value) {
    handleCreateCircuit()
  }
}

// Fonction wrapper pour deleteCircuit
const deleteCircuitOld = (index) => {
  if (index < circuits.value.length) {
    const circuit = circuits.value[index]
    handleDeleteCircuit(circuit)
  }
}

// Fonction wrapper pour editCircuit
const editCircuitOld = (index) => {
  if (index < circuits.value.length) {
    const circuit = circuits.value[index]
    handleEditCircuit(circuit)
  }
}

// Fonctions pour les commentaires
const addComment = () => {
  newCircuit.value.comments = newCircuit.value.comments || []
  newCircuit.value.comments.push({
    author: '',
    content: ''
  })
}

const addCommentToEditingCircuit = () => {
  editingCircuit.value.comments = editingCircuit.value.comments || []
  editingCircuit.value.comments.push({
    author: '',
    content: ''
  })
}

const removeComment = (index) => {
  if (newCircuit.value.comments) {
    newCircuit.value.comments.splice(index, 1)
  }
}

// Fonctions pour la modal
const closeModal = () => {
  showAddModal.value = false
  modalSpot.value = {
    nom: '',
    region: '',
    description: '',
    url: '',
    image: '',
    actif: true
  }
}

const saveSpotFromModal = () => {
  if (modalSpot.value.nom && modalSpot.value.region) {
    // Utiliser la fonction Strapi pour créer le circuit
    const circuitData = {
      name: modalSpot.value.nom,
      description: modalSpot.value.description,
      duration: 60,
      address: {
        street: '',
        city: modalSpot.value.region,
        zipCode: '',
        country: 'Belgique'
      },
      published: modalSpot.value.actif || false
    }
    
    handleCreateCircuit(circuitData)
    closeModal()
  } else {
    alert('Veuillez remplir au moins le nom et la région')
  }
}

// Fonctions pour les overlays
const openImageOverlay = () => {
  showImageOverlay.value = true
}

const closeImageOverlay = () => {
  showImageOverlay.value = false
}

const openUrlOverlay = () => {
  showUrlOverlay.value = true
}

const closeUrlOverlay = () => {
  showUrlOverlay.value = false
  tempUrl.value = ''
  urlType.value = 'website'
  urlDescription.value = ''
}

const selectImage = (imageFile) => {
  newCircuit.value.image = imageFile
  closeImageOverlay()
  showSuccessMessage('Image sélectionnée : ' + imageFile)
}

const saveUrl = (url) => {
  if (url) {
    newCircuit.value.url = url
    showSuccessMessage('URL sauvegardée')
  }
  closeUrlOverlay()
}

// Fonctions pour le téléchargement de fichiers
const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Ici on pourrait traiter le fichier (upload vers un serveur, prévisualisation, etc.)
    console.log('Fichier sélectionné:', file.name)
    newCircuit.value.image = file.name
    closeImageOverlay()
    showSuccessMessage('Image téléchargée : ' + file.name)
  }
}

// Fonctions pour l'overlay des commentaires
const showCommentsOverlay = (circuit) => {
  selectedCircuit.value = circuit
  showCommentsModal.value = true
}

const closeCommentsOverlay = () => {
  showCommentsModal.value = false
  selectedCircuit.value = null
}

// Fonctions pour gérer l'affichage des missions
const toggleMissionsList = (circuitId) => {
  // Fermer toutes les autres listes ouvertes
  Object.keys(showMissionsList.value).forEach(id => {
    if (id !== circuitId.toString()) {
      showMissionsList.value[id] = false
    }
  })
  
  // Toggle la liste pour ce circuit
  showMissionsList.value[circuitId] = !showMissionsList.value[circuitId]
}

const closeMissionsList = () => {
  Object.keys(showMissionsList.value).forEach(id => {
    showMissionsList.value[id] = false
  })
}

// Fonction pour détacher une mission d'un circuit
const handleDetachMission = async (circuitId, missionId, missionName) => {
  if (!confirm(`Êtes-vous sûr de vouloir détacher la mission "${missionName || `Mission ${missionId}`}" de ce circuit ?`)) {
    return
  }
  
  try {
    // TODO: Implémenter la logique de détachement via l'API
    console.log(`Détachement de la mission ${missionId} du circuit ${circuitId}`)
    
    // Simuler le détachement en retirant la mission de la liste
    const circuit = circuits.value.find(c => c.id === circuitId)
    if (circuit && circuit.missions) {
      circuit.missions = circuit.missions.filter(m => m.id !== missionId)
    }
    
    successMessage.value = `Mission "${missionName || `Mission ${missionId}`}" détachée avec succès !`
    
    // Fermer la liste après détachement
    closeMissionsList()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (err) {
    console.error('Erreur lors du détachement de la mission:', err)
    error.value = 'Erreur lors du détachement de la mission'
  }
}

// Fermer les listes quand on clique ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeMissionsList()
  }
}

const editComment = (circuit, commentIndex) => {
  editingComment.value = { ...circuit.comments[commentIndex] }
  editingCommentIndex.value = commentIndex
  editingCommentCircuit.value = circuit
  showEditCommentModal.value = true
}

const saveEditComment = async () => {
  if (!editingComment.value || !editingCommentCircuit.value) return
  
  try {
    // Mettre à jour le commentaire dans le circuit
    editingCommentCircuit.value.comments[editingCommentIndex.value] = {
      ...editingComment.value
    }
    
    console.log('Commentaire modifié pour le circuit:', editingCommentCircuit.value.name)
    
    // Fermer la modal
    cancelEditComment()
    
    // TODO: Ici on pourrait faire un appel API pour sauvegarder les changements
    // await updateCircuit(editingCommentCircuit.value.id, editingCommentCircuit.value)
    
  } catch (err) {
    console.error('Erreur lors de la modification du commentaire:', err)
  }
}

const cancelEditComment = () => {
  showEditCommentModal.value = false
  editingComment.value = null
  editingCommentIndex.value = -1
  editingCommentCircuit.value = null
}

const deleteComment = async (circuit, commentIndex) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    try {
      // Supprimer le commentaire du tableau
      circuit.comments.splice(commentIndex, 1)
      
      console.log('Commentaire supprimé du circuit:', circuit.name)
      
      // TODO: Ici on pourrait faire un appel API pour sauvegarder les changements
      // await updateCircuit(circuit.id, circuit)
      
    } catch (err) {
      console.error('Erreur lors de la suppression du commentaire:', err)
    }
  }
}

// Fonctions de gestion des filtres
const updateCircuitFilters = (newFilters) => {
  searchTerm.value = newFilters.searchTerm || ''
  selectedDuration.value = newFilters.selectedDuration || ''
  selectedLikes.value = newFilters.selectedLikes || ''
  selectedThumbnail.value = newFilters.selectedThumbnail || ''
}

const resetCircuitFilters = () => {
  searchTerm.value = ''
  selectedDuration.value = ''
  selectedLikes.value = ''
  selectedThumbnail.value = ''
}

// Nouvelles fonctions pour gérer les champs du schema.json
const viewThumbnail = (thumbnail) => {
  if (thumbnail && thumbnail.url) {
    console.log('🖼️ Affichage du thumbnail:', thumbnail)
    // TODO: Ouvrir une modal pour afficher l'image en grand
    window.open(thumbnail.url, '_blank')
  }
}

const viewAccessibilities = (circuit) => {
  console.log('♿ Accessibilités du circuit:', circuit.name, circuit.accessibilities)
  // TODO: Créer une modal pour afficher/gérer les accessibilités
  if (circuit.accessibilities && circuit.accessibilities.length > 0) {
    alert(`Accessibilités du circuit "${circuit.name}":\n` + 
          circuit.accessibilities.map(acc => `- ${acc.name || acc.type || 'Accessibilité'}`).join('\n'))
  } else {
    alert('Ce circuit n\'a pas d\'accessibilités configurées.')
  }
}

const viewAchievement = (achievement) => {
  console.log('🏆 Achievement:', achievement)
  // TODO: Créer une modal pour afficher les détails de l'achievement
  if (achievement && achievement.name) {
    alert(`Achievement: "${achievement.name}"\n${achievement.description || 'Pas de description disponible'}`)
  }
}

const viewCircuitComments = (circuit) => {
  console.log('💬 Commentaires du circuit:', circuit.name, circuit.comments)
  // TODO: Créer une modal pour afficher/gérer les commentaires
  if (circuit.comments && circuit.comments.length > 0) {
    const commentsText = circuit.comments.map((comment, index) => 
      `${index + 1}. ${comment.content || comment.text || 'Commentaire'} (${comment.author || 'Anonyme'})`
    ).join('\n')
    alert(`Commentaires du circuit "${circuit.name}":\n\n${commentsText}`)
  } else {
    alert('Ce circuit n\'a pas de commentaires.')
  }
}

// Fonctions pour les boutons du formulaire d'ajout
const selectAchievement = () => {
  // Ouvrir la modal pour sélectionner un achievement
  showAchievementModal.value = true
}

const configureAccessibilities = () => {
  // Ouvrir la modal pour configurer les accessibilités
  showAccessibilityModal.value = true
}

// Fonctions pour gérer la sélection des achievements
const closeAchievementModal = () => {
  showAchievementModal.value = false
}

const selectAchievementFromModal = (achievement) => {
  newCircuit.value.achievement = achievement
  selectedAchievementId.value = achievement.id
  showAchievementModal.value = false
}

const removeSelectedAchievement = () => {
  newCircuit.value.achievement = null
  selectedAchievementId.value = null
}

// Fonctions pour gérer la configuration des accessibilités
const closeAccessibilityModal = () => {
  showAccessibilityModal.value = false
}

const toggleAccessibilitySelection = (accessibilityId) => {
  const index = selectedAccessibilityIds.value.indexOf(accessibilityId)
  if (index > -1) {
    selectedAccessibilityIds.value.splice(index, 1)
  } else {
    selectedAccessibilityIds.value.push(accessibilityId)
  }
}

const selectAllAccessibilities = () => {
  selectedAccessibilityIds.value = availableAccessibilities.value?.map(acc => acc.id) || []
}

const clearAccessibilitySelection = () => {
  selectedAccessibilityIds.value = []
}

const saveAccessibilityConfiguration = () => {
  // Mettre à jour le circuit avec les accessibilités sélectionnées
  const selectedAccessibilities = availableAccessibilities.value?.filter(acc => 
    selectedAccessibilityIds.value.includes(acc.id)
  ) || []
  
  newCircuit.value.accessibilities = selectedAccessibilities
  showAccessibilityModal.value = false
}

// Fonction pour retirer une accessibilité du circuit
const removeAccessibility = (accessibilityId) => {
  if (newCircuit.value.accessibilities) {
    newCircuit.value.accessibilities = newCircuit.value.accessibilities.filter(
      acc => acc.id !== accessibilityId
    )
  }
  // Retirer aussi de la sélection
  const index = selectedAccessibilityIds.value.indexOf(accessibilityId)
  if (index > -1) {
    selectedAccessibilityIds.value.splice(index, 1)
  }
}

// Fonction pour recharger les achievements
const reloadAchievements = async () => {
  if (fetchAchievements) {
    try {
      await fetchAchievements()
      console.log('✅ Achievements rechargés')
    } catch (err) {
      console.error('Erreur lors du rechargement des achievements:', err)
    }
  }
}

// Fonction pour recharger les accessibilités
const reloadAccessibilities = async () => {
  if (fetchAccessibilities) {
    try {
      await fetchAccessibilities()
      console.log('✅ Accessibilités rechargées')
    } catch (err) {
      console.error('Erreur lors du rechargement des accessibilités:', err)
    }
  }
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
  /* Suppression de height: 100vh pour permettre le scroll naturel */
}

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

/* Hover effects pour les boutons de mode */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Styles pour les étapes du formulaire */
.step-indicator {
  transition: background-color 0.3s ease;
}

/* Amélioration des inputs */
input:focus, textarea:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Cards avec hover effect */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>