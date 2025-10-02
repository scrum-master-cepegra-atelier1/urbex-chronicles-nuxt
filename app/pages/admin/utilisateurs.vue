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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Utilisateurs</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Total utilisateurs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalUsers }}</div>
              <div class="text-base lg:text-lg text-gray-600">Utilisateurs en ligne</div>
            </div>

            <!-- Nouveaux utilisateurs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ newUsers }}</div>
              <div class="text-base lg:text-lg text-gray-600">Nouveaux utilisateurs</div>
            </div>
          </div>
        </div>

        <!-- Users Management Table -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 pb-6" style="font-family: 'Do Hyeon', sans-serif;">Gestion des utilisateurs</h2>
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-7 gap-6 text-base font-medium text-gray-700">
                <div>Id</div>
                <div>Nom</div>
                <div>Prenom</div>
                <div>Email</div>
                <div>Level</div>
                <div>Xp</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <div 
                v-for="(user, index) in users" 
                :key="index"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-7 gap-6 items-center text-base">
                  <div class="text-gray-900">{{ user.id }}</div>
                  <div class="text-gray-600">{{ user.nom }}</div>
                  <div class="text-gray-600">{{ user.prenom }}</div>
                  <div class="text-gray-600">{{ user.email }}</div>
                  <div class="text-gray-600">{{ user.level }}</div>
                  <div class="text-gray-600">{{ user.xp }}</div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editUser(index)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteUser(index)"
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
  title: 'Utilisateurs'
})

// Head configuration
useHead({
  title: 'Utilisateurs',
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

// États réactifs - Suppression du formulaire d'ajout
// const newUser = ref({}) - Plus nécessaire

// Données mock des utilisateurs
const users = ref([
  {
    id: 'xxx',
    nom: 'Charline',
    prenom: 'Charline',
    email: 'Charline',
    level: '12',
    xp: '1230'
  },
  {
    id: 'xxx',
    nom: 'Declan',
    prenom: 'Huanay',
    email: 'Huanay',
    level: '4',
    xp: '450'
  },
  {
    id: 'xxx',
    nom: 'James',
    prenom: 'Neponucet',
    email: 'Neponucet',
    level: '10',
    xp: '5600'
  },
  {
    id: 'xxx',
    nom: 'Alexis',
    prenom: 'Visa',
    email: 'Visa',
    level: '1000000',
    xp: '100000000'
  },
  {
    id: 'xxx',
    nom: 'Valentin',
    prenom: 'Philippart',
    email: 'Philippart',
    level: '2',
    xp: '280'
  }
])

// Computed properties
const totalUsers = computed(() => 129) // Selon votre maquette
const newUsers = computed(() => 11) // Selon votre maquette

// Fonctions simplifiées pour les utilisateurs
const editUser = (index) => {
  // TODO: Implémenter la modification
  console.log('Modifier l\'utilisateur:', users.value[index])
}

const deleteUser = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    users.value.splice(index, 1)
    console.log('Utilisateur supprimé')
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