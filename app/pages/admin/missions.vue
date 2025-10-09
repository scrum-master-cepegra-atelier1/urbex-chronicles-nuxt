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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Missions</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Missions totales -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Missions totales</div>
            </div>

            <!-- Missions publiées -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ publishedMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Missions publiées</div>
            </div>

            <!-- Missions en brouillon -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ draftMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Missions brouillon</div>
            </div>
          </div>
        </div>

        <!-- Add Mission Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Header avec gradient -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <h3 class="text-lg font-semibold text-white">Ajouter une nouvelle mission</h3>
              <p class="text-blue-100 mt-1">Créez une mission avec géolocalisation et description</p>
            </div>

            <!-- Onglets -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="setActiveTab(tab.id)"
                  :class="[
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
                  ]"
                >
                  <span>{{ tab.icon }}</span>
                  <span>{{ tab.label }}</span>
                </button>
              </nav>
            </div>

            <!-- Contenu des onglets -->
            <div class="p-6">
              <!-- Onglet Informations -->
              <div v-if="activeTab === 'infos'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Informations générales</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Titre -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Titre <span class="text-red-500">*</span></label>
                    <input 
                      v-model="newMission.title"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Nom de la mission (min. 5 caractères)"
                      required
                    />
                  </div>
                  
                  <!-- Threshold -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Threshold (mètres)</label>
                    <input 
                      v-model="newMission.threshold"
                      type="number" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Seuil requis en mètres"
                    />
                  </div>
                  
                  <!-- Statut -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select 
                      v-model="newMission.published"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option :value="false">Brouillon</option>
                      <option :value="true">Publié</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Onglet Localisation -->
              <div v-if="activeTab === 'location'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Géolocalisation</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Latitude -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input 
                      v-model="newMission.latitude"
                      type="number" 
                      step="any"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="ex: 50.8503"
                    />
                    <p class="mt-1 text-sm text-gray-500">Coordonnée latitude de la mission</p>
                  </div>
                  
                  <!-- Longitude -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input 
                      v-model="newMission.longitude"
                      type="number" 
                      step="any"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="ex: 4.3517"
                    />
                    <p class="mt-1 text-sm text-gray-500">Coordonnée longitude de la mission</p>
                  </div>
                  
                  <!-- Adresse (optionnel) -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Adresse (optionnel)</label>
                    <input 
                      v-model="newMission.address"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Adresse approximative du lieu"
                    />
                  </div>
                </div>
              </div>

              <!-- Onglet Description -->
              <div v-if="activeTab === 'description'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Description détaillée</h4>
                <div class="space-y-4">
                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      v-model="newMission.description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Description détaillée de la mission"
                      rows="4"
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">Décrivez l'objectif et les détails de la mission</p>
                  </div>
                  
                  <!-- Instructions -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                    <textarea 
                      v-model="newMission.instructions"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Instructions spécifiques pour accomplir la mission"
                      rows="3"
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">Instructions détaillées pour les utilisateurs</p>
                  </div>
                  
                  <!-- Type de mission -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type de mission</label>
                    <select 
                      v-model="newMission.type"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="exploration">Exploration</option>
                      <option value="photo">Photo</option>
                      <option value="enquete">Enquête</option>
                      <option value="decouverte">Découverte</option>
                    </select>
                  </div>
                  
                  <!-- Difficulté -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                    <select 
                      v-model="newMission.difficulty"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="facile">Facile</option>
                      <option value="moyen">Moyen</option>
                      <option value="difficile">Difficile</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Actions (toujours visibles) -->
              <div class="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  @click="createMission"
                  :disabled="!canCreateMission || isCreating"
                  :class="canCreateMission && !isCreating ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg v-if="!isCreating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  {{ isCreating ? 'Création...' : 'Créer la mission' }}
                </button>
                <button
                  @click="clearForm"
                  :disabled="isCreating"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Missions Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des missions</h2>
            <div class="flex space-x-3">
              <button
                @click="testStrapi"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Test Strapi
              </button>
              <button
                @click="refreshMissions"
                :disabled="loading"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                {{ loading ? 'Chargement...' : 'Actualiser' }}
              </button>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <strong>Erreur de connexion :</strong>
            </div>
            <p class="mt-1">{{ error }}</p>
            <div class="mt-2 text-sm">
              <p><strong>Solutions possibles :</strong></p>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Vérifiez que Strapi est démarré : <code class="bg-red-200 px-1 rounded">npm run develop</code></li>
                <li>Connectez-vous en tant qu'administrateur dans Strapi : <code class="bg-red-200 px-1 rounded">http://localhost:1337/admin</code></li>
                <li>Vérifiez que votre token admin est valide (reconnectez-vous si nécessaire)</li>
              </ul>
            </div>
          </div>

          <!-- Message si aucune mission -->
          <div v-if="!loading && !error && missions.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <svg class="w-12 h-12 mx-auto text-yellow-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 18.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucune mission trouvée</h3>
              <p class="text-yellow-700">
                Aucune mission n'est enregistrée dans votre base de données Strapi.
                <br>Créez des missions dans l'interface d'administration de Strapi.
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-7 gap-6 text-base font-medium text-gray-700">
                <div>Titre</div>
                <div>Description</div>
                <div>Latitude</div>
                <div>Longitude</div>
                <div>Threshold</div>
                <div>Statut</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Loading skeleton -->
              <div v-if="loading" class="px-6 py-6">
                <div class="animate-pulse space-y-4">
                  <div v-for="n in 3" :key="n" class="grid grid-cols-7 gap-6">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <!-- Missions list -->
              <div 
                v-else
                v-for="mission in missions" 
                :key="mission.id"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-7 gap-6 items-center text-base">
                  <div class="text-gray-900 font-medium">{{ mission.title || 'N/A' }}</div>
                  <div class="text-gray-600 truncate" :title="mission.description">{{ mission.description || 'N/A' }}</div>
                  <div class="text-gray-600 font-mono text-sm">{{ mission.latitude || 'N/A' }}</div>
                  <div class="text-gray-600 font-mono text-sm">{{ mission.longitude || 'N/A' }}</div>
                  <div class="text-gray-900 font-bold">{{ mission.threshold || 'N/A' }}</div>
                  <div class="flex items-center">
                    <span :class="mission.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" 
                          class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ mission.published ? 'Publié' : 'Brouillon' }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editMission(mission)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="handleDeleteMission(mission.documentId || mission.id)"
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
  </main>
  
  <!-- Modal d'édition de mission -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Modifier la mission</h3>
        <button @click="cancelEdit" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Formulaire d'édition -->
      <div v-if="editingMission" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Titre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre <span class="text-red-500">*</span></label>
            <input 
              v-model="editingMission.title"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nom de la mission"
              required
            />
          </div>
          
          <!-- Latitude -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
            <input 
              v-model="editingMission.latitude"
              type="number" 
              step="any"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="ex: 50.8503"
            />
          </div>
          
          <!-- Longitude -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
            <input 
              v-model="editingMission.longitude"
              type="number" 
              step="any"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="ex: 4.3517"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="editingMission.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Description de la mission"
              rows="3"
            ></textarea>
          </div>
          
          <!-- Threshold et Statut -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Threshold (mètres)</label>
              <input 
                v-model="editingMission.threshold"
                type="number" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Seuil requis"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select 
                v-model="editingMission.published"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option :value="false">Brouillon</option>
                <option :value="true">Publié</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="cancelEdit"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            @click="saveEditMission"
            :disabled="!editingMission.title || !editingMission.title.length"
            :class="editingMission.title && editingMission.title.length ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
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
import { ref, computed } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Missions Urbex'
})

// Head configuration
useHead({
  title: 'Missions Urbex',
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

// Utilisation du composable pour la gestion des missions
const { 
  missions, 
  loading, 
  error, 
  totalMissions,
  publishedMissions,
  draftMissions,
  fetchMissions, 
  createMission: createMissionApi,
  updateMission,
  deleteMission,
  testConnection
} = await useMissions()

// Gestion des onglets pour l'ajout de mission
const activeTab = ref('infos')
const tabs = [
  { id: 'infos', label: 'Informations', icon: '📝' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'description', label: 'Description', icon: '📋' }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

// Chargement initial des missions
await fetchMissions()

// États réactifs pour le formulaire d'ajout
const newMission = ref({
  title: '',
  description: '',
  instructions: '',
  latitude: null,
  longitude: null,
  address: '',
  threshold: null,
  type: 'exploration',
  difficulty: 'moyen',
  published: false
})

const isCreating = ref(false)

// États pour la modal d'édition
const showEditModal = ref(false)
const editingMission = ref(null)

// Validation pour la création
const canCreateMission = computed(() => {
  return newMission.value.title && newMission.value.title.length >= 5
})

// Fonctions pour le formulaire
const clearForm = () => {
  newMission.value = {
    title: '',
    description: '',
    instructions: '',
    latitude: null,
    longitude: null,
    address: '',
    threshold: null,
    type: 'exploration',
    difficulty: 'moyen',
    published: false
  }
}

const createMission = async () => {
  if (!canCreateMission.value) return
  
  isCreating.value = true
  
  try {
    // Préparer les données pour Strapi
    const missionData = {
      title: newMission.value.title,
      description: newMission.value.description || '',
      instructions: newMission.value.instructions || '',
      latitude: newMission.value.latitude,
      longitude: newMission.value.longitude,
      address: newMission.value.address || '',
      threshold: newMission.value.threshold,
      type: newMission.value.type || 'exploration',
      difficulty: newMission.value.difficulty || 'moyen',
      published: newMission.value.published
    }
    
    // Créer la mission via l'API Strapi
    await createMissionApi(missionData)
    
    // Afficher une notification de succès
    console.log('Mission créée avec succès dans Strapi')
    
    // Réinitialiser le formulaire
    clearForm()
    
  } catch (err) {
    console.error('Erreur lors de la création de la mission:', err)
    // L'erreur est déjà gérée par le composable
  } finally {
    isCreating.value = false
  }
}

// Fonctions pour les actions sur les missions
const editMission = (mission) => {
  editingMission.value = { 
    ...mission,
    published: mission.publishedAt != null  // Convertir publishedAt en boolean pour l'interface
  }
  showEditModal.value = true
}

const saveEditMission = async () => {
  if (!editingMission.value) return
  
  try {
    // Préparer les données pour Strapi
    const missionData = {
      title: editingMission.value.title,
      description: editingMission.value.description || '',
      latitude: editingMission.value.latitude,
      longitude: editingMission.value.longitude,
      threshold: editingMission.value.threshold,
      publishedAt: editingMission.value.published ? new Date().toISOString() : null
    }
    
    // Mise à jour de la mission via l'API (utiliser documentId)
    await updateMission(editingMission.value.documentId || editingMission.value.id, missionData)
    
    console.log('Mission mise à jour avec succès:', missionData)
    
    // Fermer la modal
    showEditModal.value = false
    editingMission.value = null
    
    // Rafraîchir la liste
    await fetchMissions()
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la mission:', err)
    // Afficher un message d'erreur à l'utilisateur
    alert('Erreur lors de la mise à jour de la mission. Vérifiez vos permissions et réessayez.')
  }
}

const cancelEdit = () => {
  showEditModal.value = false
  editingMission.value = null
}

const handleDeleteMission = async (missionId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
    await deleteMission(missionId)
  }
}

const refreshMissions = async () => {
  await fetchMissions()
}

const testStrapi = async () => {
  await testConnection()
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>