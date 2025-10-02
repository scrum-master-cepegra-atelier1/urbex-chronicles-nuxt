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
            <!-- Header -->
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Ajouter une nouvelle mission</h3>
              <p class="text-sm text-gray-600 mt-1">Créez une mission avec géolocalisation et succès</p>
            </div>

            <!-- Formulaire -->
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    v-model="newMission.description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Description de la mission"
                    rows="3"
                  ></textarea>
                </div>
                
                <!-- Threshold et Statut -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
                    <input 
                      v-model="newMission.threshold"
                      type="number" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Seuil requis"
                    />
                  </div>
                  
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
              
              <!-- Actions -->
              <div class="flex gap-3 pt-4">
                <button
                  @click="createMission"
                  :disabled="!canCreateMission"
                  :class="canCreateMission ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Créer la mission
                </button>
                <button
                  @click="clearForm"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Missions Management Table -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 pb-6" style="font-family: 'Do Hyeon', sans-serif;">Gestion des missions</h2>
          
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
              <div 
                v-for="(mission, index) in missions" 
                :key="index"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-7 gap-6 items-center text-base">
                  <div class="text-gray-900">{{ mission.title }}</div>
                  <div class="text-gray-600">{{ mission.description }}</div>
                  <div class="text-gray-600">{{ mission.latitude || 'N/A' }}</div>
                  <div class="text-gray-600">{{ mission.longitude || 'N/A' }}</div>
                  <div class="text-gray-600">{{ mission.threshold || 'N/A' }}</div>
                  <div class="text-gray-600">{{ mission.published ? 'Publié' : 'Brouillon' }}</div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editMission(index)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteMission(index)"
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

// États réactifs pour le formulaire d'ajout
const newMission = ref({
  title: '',
  description: '',
  latitude: null,
  longitude: null,
  threshold: null,
  published: false
})

// Données mock des missions selon le vrai schéma
const missions = ref([
  {
    title: 'Mission Charleroi Centre',
    description: 'Explorer le centre historique de Charleroi',
    latitude: 50.4108,
    longitude: 4.4446,
    threshold: 100,
    published: true
  },
  {
    title: 'Mission Friche Industrielle',
    description: 'Découvrir les friches industrielles',
    latitude: 50.4500,
    longitude: 4.5000,
    threshold: 150,
    published: true
  },
  {
    title: 'Mission Liège Urbex',
    description: 'Exploration urbaine à Liège',
    latitude: 50.6326,
    longitude: 5.5797,
    threshold: 200,
    published: false
  },
  {
    title: 'Mission Dinant Castle',
    description: 'Explorer les environs du château de Dinant',
    latitude: 50.2607,
    longitude: 4.9123,
    threshold: 75,
    published: true
  },
  {
    title: 'Mission Namur Historic',
    description: 'Centre historique de Namur',
    latitude: 50.4674,
    longitude: 4.8720,
    threshold: 120,
    published: false
  }
])

// Computed properties
const totalMissions = computed(() => missions.value.length)
const publishedMissions = computed(() => missions.value.filter(m => m.published).length)
const draftMissions = computed(() => missions.value.filter(m => !m.published).length)

// Validation pour la création
const canCreateMission = computed(() => {
  return newMission.value.title && newMission.value.title.length >= 5
})

// Fonctions pour le formulaire
const clearForm = () => {
  newMission.value = {
    title: '',
    description: '',
    latitude: null,
    longitude: null,
    threshold: null,
    published: false
  }
}

const createMission = () => {
  if (canCreateMission.value) {
    // Ajouter la nouvelle mission à la liste
    const newMissionData = {
      title: newMission.value.title,
      description: newMission.value.description || '',
      latitude: newMission.value.latitude,
      longitude: newMission.value.longitude,
      threshold: newMission.value.threshold,
      published: newMission.value.published
    }
    
    missions.value.push(newMissionData)
    
    // Afficher une notification de succès
    console.log('Mission créée avec succès:', newMissionData)
    
    // Réinitialiser le formulaire
    clearForm()
  }
}

// Fonctions simplifiées pour les missions (comme dans utilisateurs.vue)
const editMission = (index) => {
  // TODO: Implémenter la modification
  console.log('Modifier la mission:', missions.value[index])
}

const deleteMission = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
    missions.value.splice(index, 1)
    console.log('Mission supprimée')
  }
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>