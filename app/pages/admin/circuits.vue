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
            <span class="text-blue-800">Chargement des circuits depuis Strapi...</span>
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
                        Missions associées (relation oneToMany)
                      </h3>
                      <p class="text-sm text-gray-600 mb-4">
                        Sélectionnez les missions à associer à ce circuit
                      </p>
                      <div class="bg-white rounded-md p-3 border border-green-200">
                        <!-- Indicateur de chargement des missions -->
                        <div v-if="missionsLoading" class="text-center py-4">
                          <svg class="mx-auto h-6 w-6 text-green-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                          </svg>
                          <p class="text-sm text-gray-600 mt-2">Chargement des missions...</p>
                        </div>
                        
                        <!-- Liste des missions disponibles -->
                        <div v-else-if="availableMissions && availableMissions.length > 0" class="space-y-2 max-h-48 overflow-y-auto">
                          <div 
                            v-for="mission in availableMissions" 
                            :key="mission.id || mission.documentId"
                            class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                          >
                            <input 
                              :id="'mission-' + (mission.id || mission.documentId)"
                              type="checkbox" 
                              :value="mission.id || mission.documentId"
                              v-model="selectedMissionIds"
                              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label 
                              :for="'mission-' + (mission.id || mission.documentId)"
                              class="flex-1 text-sm cursor-pointer"
                            >
                              <div class="font-medium text-gray-900">{{ mission.title || mission.name || 'Mission sans titre' }}</div>
                              <div class="text-gray-500 text-xs">{{ mission.description ? (mission.description.length > 60 ? mission.description.substring(0, 60) + '...' : mission.description) : 'Aucune description' }}</div>
                            </label>
                            <span 
                              :class="mission.status === 'published' ? 'bg-green-100 text-green-800' : mission.status === 'modified' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'"
                              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {{ mission.status === 'published' ? 'Publié' : mission.status === 'modified' ? 'Modifié' : 'Brouillon' }}
                            </span>
                          </div>
                        </div>
                        
                        <!-- Aucune mission disponible -->
                        <div v-else class="text-center py-8">
                          <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <p class="mt-2 text-sm text-gray-500">Aucune mission disponible</p>
                          <p class="text-xs text-gray-400">Créez d'abord des missions dans l'onglet Missions</p>
                        </div>
                        
                        <!-- Missions sélectionnées -->
                        <div v-if="selectedMissions.length > 0" class="mt-4 pt-3 border-t border-green-200">
                          <p class="text-sm font-medium text-gray-900 mb-2">
                            Missions sélectionnées ({{ selectedMissions.length }})
                          </p>
                          <div class="space-y-1">
                            <div 
                              v-for="mission in selectedMissions" 
                              :key="mission.id || mission.documentId"
                              class="flex items-center justify-between bg-green-50 p-2 rounded text-sm"
                            >
                              <span class="text-green-800">{{ mission.title || mission.name || 'Mission sans titre' }}</span>
                              <button 
                                @click="removeSelectedMission(mission.id || mission.documentId)"
                                class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                              >
                                ✕
                              </button>
                            </div>
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
                        <p class="text-sm text-gray-500 italic">
                          {{ newCircuit.accessibilities ? newCircuit.accessibilities.length : 0 }} accessibilité(s) configurée(s)
                        </p>
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
                <p class="text-sm text-gray-400">{{ activeFiltersCount > 0 ? 'Essayez de modifier vos critères de recherche' : 'Créez votre premier circuit ou vérifiez votre connexion Strapi' }}</p>
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
                          class="inline-block w-6 h-6 bg-yellow-500 rounded cursor-pointer hover:bg-yellow-600 transition-colors"
                          @click="viewAchievement(circuit.achievement)"
                          :title="'Achievement: ' + (circuit.achievement.name || 'Achievement')">
                    </span>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                  
                  <!-- Missions (component repeatable) -->
                  <div class="text-center">
                    <span v-if="circuit.missions && circuit.missions.length > 0" 
                          class="bg-purple-500 text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-purple-600 transition-colors"
                          @click="viewCircuitMissions(circuit)"
                          :title="circuit.missions.length + ' mission(s)'">
                      {{ circuit.missions.length }}
                    </span>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex items-center justify-center space-x-2">
                    <!-- Bouton Archiver/Désarchiver -->
                    <button
                      @click="handleToggleStatus(circuit)"
                      :class="circuit.published ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'"
                      class="transition-colors duration-200 p-2"
                      :title="circuit.published ? 'Archiver' : 'Désarchiver'"
                    >
                      <!-- Icône d'archivage (pour circuits publiés) -->
                      <svg v-if="circuit.published" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h14l-1 7H6L5 4z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4V2a1 1 0 011-1h12a1 1 0 011 1v2"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9h4"/>
                      </svg>
                      <!-- Icône de désarchivage (pour circuits archivés) -->
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h14l-1 7H6L5 4z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4V2a1 1 0 011-1h12a1 1 0 011 1v2"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9l2-2m0 0l2 2m-2-2v6"/>
                      </svg>
                    </button>
                    
                    <button
                      @click="handleEditCircuit(circuit)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1.5 rounded hover:bg-blue-50"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="sm" />
                    </button>
                    <button
                      @click="handleDeleteCircuit(circuit)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-1.5 rounded hover:bg-red-50"
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
            
            <!-- Section Statut de publication (draftAndPublish) -->
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  État de publication
                </span>
              </label>
              <select 
                v-model="editingCircuit.publishedAt"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option :value="null">📝 Brouillon (non publié)</option>
                <option :value="new Date().toISOString()">🌍 Publié (visible par tous)</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                Les brouillons ne sont visibles que par les administrateurs
              </p>
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
                Missions (Component - repeatable)
              </h4>
              <div class="bg-white rounded-md p-3 border border-purple-200">
                <!-- Indicateur de chargement des missions -->
                <div v-if="missionsLoading" class="text-center py-4">
                  <svg class="mx-auto h-6 w-6 text-purple-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <p class="text-sm text-gray-600 mt-2">Chargement des missions...</p>
                </div>
                
                <!-- Liste des missions disponibles -->
                <div v-else-if="availableMissions && availableMissions.length > 0" class="space-y-2 max-h-48 overflow-y-auto">
                  <div 
                    v-for="mission in availableMissions" 
                    :key="mission.id || mission.documentId"
                    class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                  >
                    <input 
                      :id="'edit-mission-' + (mission.id || mission.documentId)"
                      type="checkbox" 
                      :value="mission.id || mission.documentId"
                      v-model="editingCircuitMissionIds"
                      class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label 
                      :for="'edit-mission-' + (mission.id || mission.documentId)"
                      class="flex-1 text-sm cursor-pointer"
                    >
                      <div class="font-medium text-gray-900">{{ mission.title || mission.name || 'Mission sans titre' }}</div>
                      <div class="text-gray-500 text-xs">{{ mission.description ? (mission.description.length > 60 ? mission.description.substring(0, 60) + '...' : mission.description) : 'Aucune description' }}</div>
                    </label>
                    <span 
                      :class="mission.status === 'published' ? 'bg-green-100 text-green-800' : mission.status === 'modified' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ mission.status === 'published' ? 'Publié' : mission.status === 'modified' ? 'Modifié' : 'Brouillon' }}
                    </span>
                  </div>
                </div>
                
                <!-- Aucune mission disponible -->
                <div v-else class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Aucune mission disponible</p>
                  <p class="text-xs text-gray-400">Créez d'abord des missions dans l'onglet Missions</p>
                </div>
                
                <!-- Missions sélectionnées -->
                <div v-if="editingCircuitSelectedMissions.length > 0" class="mt-4 pt-3 border-t border-purple-200">
                  <p class="text-sm font-medium text-gray-900 mb-2">
                    Missions sélectionnées ({{ editingCircuitSelectedMissions.length }})
                  </p>
                  <div class="space-y-1">
                    <div 
                      v-for="mission in editingCircuitSelectedMissions" 
                      :key="mission.id || mission.documentId"
                      class="flex items-center justify-between bg-purple-50 p-2 rounded text-sm"
                    >
                      <span class="text-purple-800">{{ mission.title || mission.name || 'Mission sans titre' }}</span>
                      <button 
                        @click="removeEditingCircuitMission(mission.id || mission.documentId)"
                        class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

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
  toggleCircuitStatus,
  formatDate,
  formatDuration,
  getCircuitAddress,
  testConnection
} = useCircuits()

// Composable pour les missions (pour la sélection)
const {
  missions: availableMissions,
  loading: missionsLoading,
  fetchMissions
} = useMissions()

// États locaux pour l'interface
const showAddForm = ref(false)
const selectedCircuit = ref(null)
const showDeleteModal = ref(false)
const circuitToDelete = ref(null)
const editingCircuit = ref(null)
const showEditModal = ref(false)
const successMessage = ref('')
const refreshing = ref(false)

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

// États pour l'édition de circuit avec missions
const editingCircuitMissionIds = ref([])
const editingCircuitSelectedMissions = computed(() => {
  const missionsBase = Array.isArray(availableMissions?.value) ? availableMissions.value : []
  const ids = Array.isArray(editingCircuitMissionIds?.value) ? editingCircuitMissionIds.value : []
  if (missionsBase.length === 0 || ids.length === 0) return []
  return missionsBase.filter(mission => ids.includes(mission.id || mission.documentId))
})

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

// Missions sélectionnées
const selectedMissions = computed(() => {
  const missionsBase = Array.isArray(availableMissions?.value) ? availableMissions.value : []
  const ids = Array.isArray(selectedMissionIds?.value) ? selectedMissionIds.value : []
  if (missionsBase.length === 0 || ids.length === 0) return []
  return missionsBase.filter(mission => ids.includes(mission.id || mission.documentId))
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
      ...newCircuit.value,
      // Inclure les missions sélectionnées dans le champ missions (relation oneToMany)
      missions: selectedMissionIds.value.map(id => ({ id })),
      // Garder la compatibilité avec le champ legacy
      Missions: selectedMissions.value
    }
    
    await createCircuit(circuitData)
    showSuccessMessage('Circuit créé avec succès !')
    resetForm()
    showAddForm.value = false
    // Rafraîchir la liste
    await fetchCircuits()
  } catch (err) {
    console.error('Erreur lors de la création:', err)
  }
}

const handleDeleteCircuit = async (circuit) => {
  circuitToDelete.value = circuit
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (circuitToDelete.value) {
    // Utiliser documentId pour Strapi v5, fallback sur id
    const idToUse = circuitToDelete.value.documentId || circuitToDelete.value.id
    const success = await deleteCircuit(idToUse)
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
    // Gérer le statut de publication (draftAndPublish)
    publishedAt: circuit.publishedAt || null,
    // S'assurer que les champs obligatoires sont présents
    name: circuit.name || '',
    description: circuit.description || '',
    duration: circuit.duration || null,
    like: circuit.like || 0
  }
  
  // Initialiser les missions sélectionnées pour l'édition
  editingCircuitMissionIds.value = (circuit.missions || []).map(mission => mission.id || mission.documentId).filter(Boolean)
  
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
    
    // Préparer les données selon le schéma Strapi exact
    const updateData = {
      // Champ string
      name: editingCircuit.value.name,
      // Champ text
      description: editingCircuit.value.description || '',
      // Champ biginteger
      duration: editingCircuit.value.duration ? parseInt(editingCircuit.value.duration) : null,
      // Champ integer
      like: editingCircuit.value.like ? parseInt(editingCircuit.value.like) : 0,
      // Component address (non repeatable)
      address: editingCircuit.value.address || null,
      // Component mission (repeatable) - utiliser les missions sélectionnées
      missions: editingCircuitMissionIds.value.map(id => ({ id })),
      // Component comment (repeatable)
      comments: editingCircuit.value.comments || []
    }

    console.log('💾 Sauvegarde des données circuit selon schéma Strapi:', updateData)
    
    // Utiliser documentId pour Strapi v5, fallback sur id
    const idToUse = editingCircuit.value.documentId || editingCircuit.value.id
    
    await updateCircuit(idToUse, updateData)
    
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

const handleToggleStatus = async (circuit) => {
  try {
    // Utiliser documentId pour Strapi v5, fallback sur id
    const idToUse = circuit.documentId || circuit.id
    await toggleCircuitStatus(idToUse, !circuit.published)
    showSuccessMessage(`Circuit ${circuit.published ? 'archivé' : 'désarchivé'} avec succès !`)
    await fetchCircuits()
  } catch (err) {
    console.error('Erreur lors du changement de statut:', err)
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
    : base.filter(c => c.publishedAt !== null && c.publishedAt !== undefined).length

  const nw = (typeof newCircuitsSuggested !== 'undefined' && newCircuitsSuggested && typeof newCircuitsSuggested.value !== 'undefined')
    ? newCircuitsSuggested.value
    : (() => {
      const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return base.filter(c => c.createdAt && new Date(c.createdAt) >= sevenDaysAgo).length
    })()

  return { total, active, new: nw }
})

// Chargement initial des données
onMounted(async () => {
  console.log('🚀 Chargement des circuits...')
  try {
    await fetchCircuits()
  } catch (err) {
    console.warn('Erreur lors de fetchCircuits:', err)
  }

  console.log('🚀 Chargement des missions...')
  // Guard: fetchMissions may be undefined if the composable wasn't auto-imported or not available
  if (typeof fetchMissions === 'function') {
    try {
      await fetchMissions()
    } catch (err) {
      console.warn('Erreur lors de fetchMissions:', err)
    }
  } else {
    console.warn('fetchMissions non disponible, saut de l\'appel')
  }
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

// Fonction pour afficher les missions d'un circuit
const viewCircuitMissions = (circuit) => {
  console.log('Missions du circuit:', circuit.name, circuit.missions)
  // TODO: Créer une modal pour afficher/gérer les missions
  if (circuit.missions && circuit.missions.length > 0) {
    alert(`Ce circuit a ${circuit.missions.length} mission(s):\n` + 
          circuit.missions.map(m => `- ${m.name || m.title || 'Mission sans nom'}`).join('\n'))
  } else {
    alert('Ce circuit n\'a pas encore de missions associées.')
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

// Fonction pour retirer une mission sélectionnée
const removeSelectedMission = (missionId) => {
  selectedMissionIds.value = selectedMissionIds.value.filter(id => id !== missionId)
}

// Fonction pour retirer une mission sélectionnée dans l'édition
const removeEditingCircuitMission = (missionId) => {
  editingCircuitMissionIds.value = editingCircuitMissionIds.value.filter(id => id !== missionId)
}

// Fonctions pour les boutons du formulaire d'ajout
const selectAchievement = () => {
  // TODO: Ouvrir une modal pour sélectionner un achievement
  alert('Fonctionnalité de sélection d\'achievement à implémenter')
}

const configureAccessibilities = () => {
  // TODO: Ouvrir une modal pour configurer les accessibilités
  alert('Fonctionnalité de configuration des accessibilités à implémenter')
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