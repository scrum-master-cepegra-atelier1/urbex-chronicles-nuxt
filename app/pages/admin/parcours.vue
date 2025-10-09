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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Parcours</h1>
      </div>
      
      <div class="ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Parcours actifs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalParcours }}</div>
              <div class="text-base lg:text-lg text-gray-600">Parcours actifs</div>
            </div>

            <!-- Nouveaux parcours suggérés -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ newParcoursSuggested }}</div>
              <div class="text-base lg:text-lg text-gray-600">Nouveaux parcours suggérés</div>
            </div>
          </div>
        </div>

        <!-- Add Circuit Section -->
        <div class="mb-12 flex-shrink-0">

          <!-- Formulaire Principal -->
          <div class="bg-white mb-12 rounded-2xl border-gray-300 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-500 to-gray-800 px-8 py-6">
              <div>
                <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                  <svg class="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Ajouter un nouveau circuit
                </h2>
                <p class="text-blue-100 mt-1">
                  Créez un nouveau spot urbex avec ses informations et localisation
                </p>
              </div>
            </div>

            <!-- Contenu du formulaire -->
            <div class="p-8">
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
                    
                  
                  <!-- Actions -->
                  <div class="pt-6 border-t border-gray-100">
                    <div class="flex flex-col sm:flex-row gap-3">
                      <button
                        @click="createSpot"
                        :disabled="!canCreateSpot"
                        :class="canCreateSpot ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                        class="flex-1 px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                      >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Créer le circuit
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
          <h2 class="text-2xl font-bold text-gray-900 pb-6" style="font-family: 'Do Hyeon', sans-serif;">Gestion des circuits</h2>
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-7 gap-6 text-base font-medium text-gray-700">
                <div>Nom</div>
                <div>Description</div>
                <div>Durée</div>
                <div>Ville</div>
                <div>Likes</div>
                <div>Commentaires</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <div 
                v-for="(circuit, index) in circuits" 
                :key="index"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-7 gap-6 items-center text-base">
                  <div class="text-gray-900 font-medium">{{ circuit.name }}</div>
                  <div class="text-gray-600 truncate">{{ circuit.description }}</div>
                  <div class="text-gray-600">{{ circuit.duration }}min</div>
                  <div class="text-gray-600">{{ circuit.address.city }}</div>
                  <div class="text-gray-600 flex items-center">
                    <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    {{ circuit.like }}
                  </div>
                  
                  <div class="text-gray-600">
                    <span 
                      @click="showCommentsOverlay(circuit)" 
                      class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-green-200 transition-colors duration-200"
                    >
                      {{ circuit.comments.length }} commentaires
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editCircuit(index)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteCircuit(index)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-2"
                      title="Supprimer"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
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
  </main>  <!-- Modal d'ajout de spot -->
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
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Parcourir les fichiers
          </button>
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
</template>

<script setup>
import { ref, computed } from 'vue'

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

// États réactifs
const newCircuit = ref({
  name: '',
  description: '',
  duration: null,
  address: {
    street: '',
    city: '',
    zipCode: '',
    country: 'Belgique'
  },
  comments: []
})

const showAddModal = ref(false)
const showImageOverlay = ref(false)
const showUrlOverlay = ref(false)
const showCommentsModal = ref(false)
const selectedCircuit = ref(null)
const tempUrl = ref('')
const urlType = ref('website')
const urlDescription = ref('')
const modalSpot = ref({
  nom: '',
  region: '',
  description: '',
  url: ''
})

// Données mock des circuits urbex
const circuits = ref([
  {
    name: 'Circuit Château de Charleroi',
    description: 'Exploration des ruines industrielles de Charleroi',
    duration: 120,
    like: 15,
    address: {
      street: 'Rue des Abandonnés 123',
      city: 'Charleroi',
      zipCode: '6000',
      country: 'Belgique'
    },
    missions: [
      { title: 'Explorer la tour principale', description: 'Montez jusqu\'au sommet de la tour' },
      { title: 'Photographier les machines', description: 'Capturez les anciens équipements' }
    ],
    comments: [
      { author: 'Explorer1', content: 'Circuit magnifique avec de superbes vues ! La montée vers la tour principale est un peu difficile mais ça vaut vraiment le coup.' },
      { author: 'UrbanPhotographer', content: 'Parfait pour les photos, surtout au coucher du soleil. Attention aux gravats par contre.' },
      { author: 'AdventureSeeker', content: 'J\'ai adoré ce circuit ! L\'atmosphère est incroyable et on sent vraiment l\'histoire des lieux.' }
    ]
  },
  {
    name: 'Circuit Urbain Liège',
    description: 'Parcours dans les anciens quartiers industriels de Liège',
    duration: 90,
    like: 8,
    address: {
      street: 'Avenue du Patrimoine 45',
      city: 'Liège',
      zipCode: '4000',
      country: 'Belgique'
    },
    missions: [
      { title: 'Photographier les graffitis', description: 'Capturez l\'art urbain unique' }
    ],
    comments: [
      { author: 'CityExplorer', content: 'Circuit urbain vraiment sympa, les graffitis sont magnifiques !' },
      { author: 'LocalGuide', content: 'Je recommande ce parcours, accessible et plein de découvertes.' }
    ]
  }
])

// Computed properties
const totalParcours = computed(() => 23) // Selon votre maquette
const newParcoursSuggested = computed(() => 5) // Selon votre maquette

// Validation simple pour la création
const canCreateSpot = computed(() => {
  return newCircuit.value.name && newCircuit.value.description && newCircuit.value.address.city
})

// Fonctions pour les circuits
const addCircuit = () => {
  showAddModal.value = true
}

const clearForm = () => {
  newCircuit.value = {
    name: '',
    description: '',
    duration: null,
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: 'Belgique'
    },
    comments: []
  }
}

const createSpot = () => {
  if (canCreateSpot.value) {
    // Ajouter le nouveau spot à la liste
    const newSpot = {
      name: newCircuit.value.name,
      description: newCircuit.value.description,
      duration: newCircuit.value.duration || 60,
      like: 0,
      address: { ...newCircuit.value.address },
      missions: [],
      comments: []
    }
    
    circuits.value.push(newSpot)
    
    // Afficher une notification de succès
    console.log('Spot créé avec succès:', newSpot)
    
    // Réinitialiser le formulaire
    clearForm()
  }
}

// Fonctions pour les commentaires
const addComment = () => {
  newCircuit.value.comments.push({
    author: '',
    content: ''
  })
}

const removeComment = (index) => {
  newCircuit.value.comments.splice(index, 1)
}

const editCircuit = (index) => {
  // TODO: Implémenter la modification
  console.log('Modifier le circuit:', circuits.value[index])
}

const deleteCircuit = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce circuit ?')) {
    circuits.value.splice(index, 1)
    console.log('Circuit supprimé')
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
    parcours.value.push({
      nom: modalSpot.value.nom,
      region: modalSpot.value.region,
      description: modalSpot.value.description,
      types: 'urbex',
      images: modalSpot.value.image || 'xxx',
      urls: modalSpot.value.url || 'xxx',
      status: modalSpot.value.actif ? 'active' : 'inactive'
    })
    closeModal()
    console.log('Spot ajouté avec succès')
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
  newSpot.value.image = imageFile
  closeImageOverlay()
}

const saveUrl = (url) => {
  if (url) {
    newSpot.value.url = url
  }
  closeUrlOverlay()
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

const editComment = (circuit, commentIndex) => {
  // TODO: Implémenter la modification de commentaire
  console.log('Modifier le commentaire:', circuit.comments[commentIndex])
}

const deleteComment = (circuit, commentIndex) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    circuit.comments.splice(commentIndex, 1)
    console.log('Commentaire supprimé')
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
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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